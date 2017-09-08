from flask import Flask
from flask_ask import Ask, statement, question
import logging
import RPi.GPIO as GPIO

app = Flask(__name__)
ask = Ask(app, '/')
logging.getLogger("flask_ask").setLevel(logging.DEBUG)
GPIO.setmode(GPIO.BOARD)

@ask.launch
def LaunchRequest():
        return question('Welcome to LED control, you can ask raspberry to turn on or off pin followed by your pin number').simple_card("LED Control Skill","You can ask raspberry to turn on or off the pin connected to your LED").reprompt("Try saying turn on pin twelve")

@ask.intent('ControlIntent', mapping={"Options":"Options","Pin":"Pin"})
def Control(Options, Pin):
        pin = int(Pin)
        GPIO.setup(pin, GPIO.OUT)
        if Options == 'on':
                GPIO.output(pin, GPIO.HIGH)
		elif Options == 'off':
                GPIO.output(pin, GPIO.LOW)

        return question("LED at pin {} is {}".format(Pin, Options)).reprompt("You can say turn on or off, if you wish to exit say stop")


@ask.intent('AMAZON.StopIntent')
def exit():
        return statement("Thank you ")

app.run(debug=True)
GPIO.cleanup()

