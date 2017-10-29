from flask import Flask
from flask_ask import Ask, statement, convert_errors, question
import logging

app = Flask(__name__)

ask = Ask(app, '/')

logging.getLogger("flask_ask").setLevel(logging.DEBUG)

@ask.launch
def LaunchRequest():
        speech_text = "You can ask Maker to welcome"
        card_title = "Welcome Skill"
        return question(speech_text).simple_card(card_title, speech_text).reprompt(speech_text)       

@ask.intent('WelcomeIntent')
def welcomeIntent():
        return statement("Welcome to the course, hope you enjoy learning and making with us").simple_card("Welcome Skill","Welcome to the course, hope you enjoy learning and making with us")

if __name__ == '__main__':

    app.run(debug=True)
