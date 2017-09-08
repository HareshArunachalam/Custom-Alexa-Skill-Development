"use strict";
var Alexa = require("alexa-sdk");
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event,context);
    alexa.appId = "amzn1.ask.skill.119e42e4-c2b6-4b38-9d9c-f8a91af525c8";
    alexa.registerHandlers(Handler);
    alexa.execute();
};

var Handler = {
    'LaunchRequest' : function(){
        this.emit(':askWithCard','You can ask Maker to welcome','You can ask Maker to welcome','Welcome Skill','You can ask Maker to welcome');
    },
    'WelcomeIntent' : function(){
        this.emit(':tellWithCard','Welcome to the course, hope you enjoy learning and making with us','Welcome Skill','Welcome to the course, hope you enjoy learning and making with us');
    },
    'AMAZON.CancelIntent' : function(){
        this.emit(':tell','Thank you, See you again');
    }
};