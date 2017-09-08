"use strict";
var Alexa = require("alexa-sdk");
exports.handler = function(event,context,callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.dynamoDBTableName = "Thing";
    alexa.appId = "amzn1.ask.skill.10cc6f5e-0b24-4c9d-a199-58298f4a7512";
    alexa.registerHandlers(Handler);
    alexa.execute();
};

var Handler = {
    "LaunchRequest" : function(){
        this.emit(":askWithCard","Hi Iam Buddy, you can ask me to remember your thing and place","Hi Iam Buddy, you can ask me to remember your thing and place","Remember Skill", "Hi Iam Buddy, you can ask me to remember your thing and place");
    },
    "AddThingsIntent" : function(){
        var ThingName = this.event.request.intent.slots.ThingName.value;
        var PlaceName = this.event.request.intent.slots.PlaceName.value;
        if(this.attributes.Place === undefined){
            this.attributes.Place = {};
        }
        this.attributes.Place[ThingName] = PlaceName;
        this.emit(':tell',"I will remember that your " + ThingName + " is in your " + PlaceName );
    },
    "TellIntent" : function(){
        var ThingName = this.event.request.intent.slots.ThingName.value;
        if(this.attributes.Place[ThingName]){
            this.emit(':tell', " Your " + ThingName + " is in " + this.attributes.Place[ThingName] );
        }else{
            this.emit(':tell', "I don't know where your " + ThingName + " is ");
        }
    },
    "AMAZON.CancelIntent" : function(){
        this.emit(':tell', " Thank you ");
    }
    
};