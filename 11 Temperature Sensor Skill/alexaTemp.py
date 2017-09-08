from flask import Flask
from flask_ask import Ask, question, statement
import logging

app = Flask(__name__)

ask = Ask(app, '/')

logging.getLogger("flask_ask").setLevel(logging.DEBUG)

tempadd = "/sys/bus/w1/devices/28-0314667ef0ff/w1_slave"

@ask.launch
def Launch():
	speech = "Welcome to temperature sensor Skill, you can ask me what is the temperature in c or f or k, where c is Celcius, f is fahrenheit and k is kelvin"
	return question(speech).simple_card("Temperature Sensor Skill",speech).reprompt(speech)

@ask.intent('TemperatureIntent', mapping = {'Unit':'Unit'})
def temp(Unit):
                tempfile = open(tempadd, "r")
                tempdata = tempfile.read()
                tempfile.close()
                (first, second, third) = tempdata.partition("t=")
                temp = float(third)/1000
		unit = Unit.lower()
                if unit == "c" or unit == "c."  :
                        return statement( " The temperature is " + str(temp) + " degree celcius ")
                elif unit == "k" or unit == "k.":
                        tempK = temp + 273.15
                        return statement( " The temperature is " + str(tempK) + " degree kelvin ")
                elif unit == "f" or unit == "f.":
                        tempF = temp*1.8 + 32
                        return statement( " The temperature is " + str(tempF) + " fahreneit ")
               
@ask.intent('AMAZON.StopIntent')
def stop():
	return statement('Thank You')

app.run(debug=True)

