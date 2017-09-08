"use strict";
exports.handler = function(event, context){
    try{
        if(event.session.application.applicationId !== "amzn1.ask.skill.119e42e4-c2b6-4b38-9d9c-f8a91af525c8"){
            context.fail("Invalid Application ID");
        }
        
        if(event.request.type === "LaunchRequest"){
            onLaunch(event.session, function callback(sessionAttributes,speechletResponse){
                context.succeed(buildresponse(sessionAttributes,speechletResponse));
            });
        }else if(event.request.type === "IntentRequest"){
            onIntent(event.request, event.session, function callback(sessionAttributes,speechletResponse){
                context.succeed(buildresponse(sessionAttributes,speechletResponse));
            });
        }else if(event.request.type === "SessionEndedRequest"){
            
        }
    }catch(e){
        context.fail(e);
    }
};

function onLaunch(session,callback){
    callback(session.attributes,buildSpeechletResponse("Welcome Skill", " You can ask maker to welcome", "You can ask maker to welcome", false));
}

function onIntent(Intentrequest, session, callback){
    var IntentName = Intentrequest.intent.name;
    if(IntentName === "WelcomeIntent"){
       callback(session.attributes,buildSpeechletResponse("Welcome Skill", "Welcome to the course, hope you enjoy learning and making with us", "", true)); 
    } else if (IntentName === "AMAZON.CancelIntent"){
       callback(session.attributes,buildSpeechletResponse("Welcome Skill", "Thank you", "", true));
    }
}

function buildSpeechletResponse(title, output, repromptText,shouldEndSession){
    return {
        card : {
            type : "Simple",
            title : title,
            content : output
        },
        outputSpeech : {
            type : "PlainText",
            text : output
        },
        reprompt : {
            outputSpeech : {
                type : "PlainText",
                text : repromptText
        }
        },
        shouldEndSession : shouldEndSession
    };
}
function buildresponse(sessionAttributes,speechletResponse){
    return{
        version : "1.0",
        sessionAttributes : sessionAttributes,
        response : speechletResponse
    };
}