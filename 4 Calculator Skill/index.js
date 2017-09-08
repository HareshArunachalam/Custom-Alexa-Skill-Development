"use strict";
var Alexa = require("alexa-sdk");
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event,context);
    alexa.appId = "amzn1.ask.skill.1229f1f7-9e24-4548-bf38-d67e4b50da85";
    alexa.registerHandlers(Handler);
    alexa.execute();
};

var Handler = {
    'LaunchRequest' : function(){
        this.emit(':askWithCard','Welcome to the calculator, you can ask me to add, subtract, multiply or divide','You can ask me to add, subtract, multiply or divide','Basic Calculator','You can ask me to add, subtract, multiply or divide');
    },
    'AddIntent': function () {
           var num1 = Number(this.event.request.intent.slots.NumA.value);
           var num2 = Number(this.event.request.intent.slots.NumB.value);
           if((num1)&&(num2)){
               this.emit(':tell','The sum of ' + num1 + ' and ' + num2 + ' is ' + (num1+num2));
           }else {
               this.emit(':tell','Please tell two valid numbers');
           }
    },
    'SubIntent': function () {
           var num1 = Number(this.event.request.intent.slots.NumA.value);
           var num2 = Number(this.event.request.intent.slots.NumB.value);
           if((num1)&&(num2)){
               this.emit(':tell','The difference between ' + num1 + ' and ' + num2 + ' is ' + (num1-num2));
           }else {
               this.emit(':tell','Please tell two valid numbers');
           }
    },
    'MulIntent': function () {
           var num1 = Number(this.event.request.intent.slots.NumA.value);
           var num2 = Number(this.event.request.intent.slots.NumB.value);
           if((num1)&&(num2)){
               this.emit(':tell','The product of ' + num1 + ' and ' + num2 + ' is ' + (num1*num2));
           }else {
               this.emit(':tell','Please tell two valid numbers');
           }
    },
    'DivIntent': function () {
           var num1 = Number(this.event.request.intent.slots.NumA.value);
           var num2 = Number(this.event.request.intent.slots.NumB.value);
           if((num1)&&(num2)){
               this.emit(':tell', num1 + ' divided by ' + num2 + ' is ' + (num1/num2));
           }else {
               this.emit(':tell','Please tell two valid numbers');
           }
    },
    'PowerIntent': function () {
           var num1 = Number(this.event.request.intent.slots.NumA.value);
           var num2 = Number(this.event.request.intent.slots.NumB.value);
           var num3 = Number(this.event.request.intent.slots.NumC.value);
           if(num3){
               var num4 = num2/num3;
               var num5 = Math.pow(num1,num4);
               this.emit(':tell',num1 + ' to the power of ' + num2 + ' by '  + num3 + ' is '  + num5);
           } else if((num1)&&(num2)){
               var num6 = Math.pow(num1,num2);
               this.emit(':tell',num1 + ' to the power ' + num2 + ' is ' + num6);
           }else {
               this.emit(':tell','Please tell valid numbers');
           }
    }
};