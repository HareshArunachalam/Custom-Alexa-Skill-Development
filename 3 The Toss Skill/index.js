"use strict";
var Alexa = require("alexa-sdk");
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event,context);
    alexa.appId = "amzn1.ask.skill.b822d1ef-34ee-4591-b856-4611ec4a7921";
    alexa.registerHandlers(Handler);
    alexa.execute();
};

var Handler = {
    'LaunchRequest' : function(){
        this.emit(':askWithCard','You can ask me to toss a coin','You can ask me to toss a coin','Toss Skill','You can ask me to toss a coin');
    },
    'TossIntent' : function(){
        var arr = ['Heads','Tails'];
        var randomNum = Math.floor(Math.random()*2);
        this.emit(':tell','Call Heads or Tails <break time="2s"/> <audio src="https://s3.amazonaws.com/tossaudiofile/coinflip.mp3" /> <break time="1s"/> It is ' + arr[randomNum]);
    },
    'AMAZON.StopIntent' : function(){
        this.emit(':tell',"Thank you");
    }
};