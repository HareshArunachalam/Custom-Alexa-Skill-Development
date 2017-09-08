from flask import Flask
from flask_ask import Ask, question, statement
import logging
import RPi.GPIO as GPIO
import time

app = Flask(__name__)

ask = Ask(app, '/')

logging.getLogger("flask_ask").setLevel(logging.DEBUG)

GPIO.setmode(GPIO.BOARD)

@ask.launch
def LaunchRequest():
        speech = "Welcome to Servo Control, you can ask servo to rotate to your angle in degrees"
        return question(speech).simple_card("Servo Control SKill",speech).reprompt(speech)

@ask.intent('ServoIntent',mapping = {'Angle':'Angle'})
def servo(Angle):
                GPIO.setup(12,GPIO.OUT)
                pwm = GPIO.PWM(12, 100)
                pwm.start(5)
                duty = float(Angle)/10 + 2.5
                pwm.ChangeDutyCycle(duty)
                time.sleep(0.5)
                return question("Servo is at {} degrees".format(Angle)).reprompt("You can ask servo to rotate to your angle in degrees or tell stop to exit ")

@ask.intent('AMAZON.StopIntent')
def stop():
        return statement("Thank you")



app.run(debug=True)
GPIO.cleanup()

