from flask import Flask
from flask_ask import Ask, question, statement
import logging
import os
from subprocess import call

app = Flask(__name__)

ask = Ask(app, '/')

logging.getLogger("flask_ask").setLevel(logging.DEBUG)

@ask.launch

def LaunchRequest():
        speech = 'Welcome to Webcam control skill, you can ask cam to take a picture'
        return question(speech).simple_card('Webcam Control Skill',speech).reprompt(speech)

@ask.intent('WebCamIntent')
def webcam():
        for i in range(100):
                if(os.path.exists("/home/pi/test" + str(i) + ".jpg") == True):
                        i = i + 1
                else:
                        break
        call(["fswebcam","test" + str(i) + ".jpg"])
		return question(" A picture was taken ").reprompt("If you want to take more pictures say take $

@ask.intent('AMAZON.StopIntent')
def stop():
        return statement('Thank You')


app.run(debug=True)


