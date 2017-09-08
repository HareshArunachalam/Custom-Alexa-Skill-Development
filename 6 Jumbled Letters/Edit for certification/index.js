"use strict";
var Alexa = require('alexa-sdk');
var arr = [{"Q":"kobo","A":"book"},{"Q":"labl","A":"ball"},{"Q":"eirf","A":"fire"},{"Q":"cgea","A":"cage"},{"Q":"keac","A":"cake"},{"Q":"teda","A":"date"},{"Q":"rodo","A":"door"},{"Q":"maxe","A":"exam"},
{"Q":"ixte","A":"exit"},{"Q":"eeys","A":"eyes"},{"Q":"hsif","A":"fish"},{"Q":"lxuf","A":"flux"},{"Q":"deah","A":"head"},{"Q":"lido","A":"idol"},{"Q":"enek","A":"knee"},
{"Q":"dnal","A":"land"},{"Q":"pplu","A":"pulp"},{"Q":"oard","A":"road"},{"Q":"toro","A":"root"},{"Q":"wons","A":"snow"},{"Q":"luos","A":"soul"},{"Q":"rtsa","A":"star"},
{"Q":"eetr","A":"tree"},{"Q":"netu","A":"tune"},{"Q":"nitw","A":"twin"},{"Q":"erwi","A":"wire"},{"Q":"dniw","A":"wind"},{"Q":"nwya","A":"yawn"},{"Q":"agyo","A":"yoga"},
{"Q":"cniz","A":"zinc"}];

exports.handler = function(event,context,callback){
    var alexa = Alexa.handler(event,context,callback);
    alexa.dynamoDBTableName = "JumbledLetters";
    alexa.appId = "amzn1.ask.skill.e82d326a-00dc-46b2-831a-35eeee46c2a8";
    alexa.registerHandlers(handler);
    initialize(event,function(){
        alexa.execute();
    });
};

function initialize(event,callback){
    if(event.session.attributes.Game === undefined){
        event.session.attributes.Game={};
    }
    callback();
}

var handler = {
    "start" : function(){
        this.attributes.Game.score = 0;
        this.attributes.Game.index = 0;
        this.attributes.Game.count = 3;
        var question = arr[0].Q;
        var q = "<break time='0.5s'/>" + question.split('').join("<break time='0.5s'/>") + "<break time='0.5s'/>";
        var qc = question.split('').join("   ") ;
        var speech = "Welcome to Jumbled Letters, let's begin, here are your jumbled letters " + q + " . Guess the word, you have 3 attempts left ";
        this.emit(":askWithCard",speech,speech,"Jumbled letters",qc);
    },
    "resume" : function(){
        var index = this.attributes.Game.index; 
        var count = this.attributes.Game.count;
        var question = arr[index].Q;
        var q = "<break time='0.5s'/>" + question.split('').join("<break time='0.5s'/>") + "<break time='0.5s'/>";
        var qc = question.split('').join("   ") ;
        var speech = "Welcome back, here are your jumbled letters " + q + " . Guess the word, you have " + count + " attempts left ";
        this.emit(":askWithCard",speech,speech,"Jumbled letters",qc);
    },
    "LaunchRequest": function(){
        if(this.attributes.Game.score === undefined){
            this.emit('start');
        }else if(this.attributes.Game.end === 1){
            var score = this.attributes.Game.score;
            var speech1 = "I have asked all the questions that I have, you have scored " + score + " If you wish to delete this game and start over again, say delete my previous game.";
            this.emit(":askWithCard",speech1,speech1,"The End","You have played all the thirty questions, to start over say, DELETE MY GAME");
        }else{
            var speech = "You have already played the game. Your score is " + this.attributes.Game.score + " . To resume your game say, resume my game, or to delete your previous game and start again, say delete my previous game ";
            this.emit(':askWithCard',speech,speech,"Game Already Exists","To resume say, RESUME MY GAME or to delete say, DELETE MY GAME");
        }
    },
    "AMAZON.StartOverIntent" : function(){
        if(this.attributes.Game.score === undefined){
            this.emit('start');
        }else if(this.attributes.Game.end === 1){
            var score = this.attributes.Game.score;
            var speech1 = "I have asked all the questions that I have, you have scored " + score + " If you wish to delete this game and start over again, say delete my previous game.";
            this.emit(":askWithCard",speech1,speech1,"The End","You have played all the thirty questions, to start over say, DELETE MY GAME");
        }else{
            var speech = "You have already played the game. Your score is " + this.attributes.Game.score + " . To resume your game say, resume my game, or to delete your previous game and start again, say delete my previous game ";
            this.emit(':askWithCard',speech,speech,"Game Already Exists","To resume say, RESUME MY GAME or to delete say, DELETE MY GAME");
        }
    },
    "AnswerIntent" : function(){
        var guess = this.event.request.intent.slots.Guess.value;
        var l1 = this.event.request.intent.slots.LetterOne.value;
        var l2 = this.event.request.intent.slots.LetterTwo.value;
        var l3 = this.event.request.intent.slots.LetterThree.value;
        var l4 = this.event.request.intent.slots.LetterFour.value;
        var index = this.attributes.Game.index; 
        var count = this.attributes.Game.count;
        var answer = arr[index].A;
        var a = answer.split('');
        if(guess !== undefined && l1 !== undefined && l2 !== undefined && l3 !== undefined && l4 !== undefined){
            l1 = l1.toLowerCase();
            l2 = l2.toLowerCase();
            l3 = l3.toLowerCase();
            l4 = l4.toLowerCase();
            if(guess === answer && (l1 === a[0] || l1 === a[0] + ".") && (l2 === a[1] || l2 === a[1] + ".") && (l3 === a[2] || l3 === a[2] + ".") && (l4 === a[3] || l4 === a[3] + ".") ){
                this.attributes.Game.score += 1;
                var score = this.attributes.Game.score;
                var speech = "Good job, you have guessed it right in " + (4-count) + " attempts. Your score is " + score + " . Do you wish to play again? say Yes to play again and No to quit.";
                this.emit(":askWithCard",speech,speech, "Good Job", "Score is " + score + ". To play again say, YES or to quit say, NO");
            }else{
                this.attributes.Game.count -= 1;
                count = this.attributes.Game.count;
                var question = arr[index].Q;
                var q = "<break time='0.5s'/>" + question.split('').join("<break time='0.5s'/>") + "<break time='0.5s'/>";
                if(count > 0){
                    var speech1 = "Please try again, your jumbled letters were " + q + ". You have " + count + " attempts left";
                    this.emit(":askWithCard",speech1,speech1,"Attempts Left: " + count, " Try again, your guess " + l1 + " "+ l2 + " "+l3 + " "+ l4 + " " + guess + " is incorrect");
                }else{
                    var ans = "<break time='0.5s'/>" + answer.split('').join("<break time='0.5s'/>") + "<break time='0.5s'/>";
                    var speech2 = "Sorry, there are no attempts left, the correct word is " + ans + answer + ". Do you wish to play again? say Yes to play again and No to quit";
                    this.emit(":askWithCard",speech2,speech2,"NO MORE ATTEMPTS LEFT", "The correct word is " + answer);
                }
            }
        }else{
            this.emit(":askWithCard","Please guess by spelling out the word","Please guess by spelling out the word","Please Spell the Word","The guess should have the letters spelled out in the right order, followed by the word after that");
        }
    },
    "AMAZON.YesIntent" : function(){
        if(this.attributes.Game.index === arr.length - 1){
            this.attributes.Game.end = 1;
            var score = this.attributes.Game.score;
            var speech = "I have asked all the questions that I have, you have scored " + score + " If you wish to delete this game and start over again, say delete my previous game.";
            this.emit(":askWithCard",speech,speech,"The End","You have played all the thirty questions, to start over say, DELETE MY GAME");
        }else{
            this.attributes.Game.index += 1;
            this.attributes.Game.count = 3;
            this.emit('resume');
        }
    },
    "AMAZON.NoIntent" : function(){
        if(this.attributes.Game.index === arr.length - 1){
            this.attributes.Game.end = 1;
            this.emit(":tell","Thank You");
        }else{
            this.attributes.Game.index += 1;
            this.attributes.Game.count = 3;
            this.emit(":tell","Thank you");
        }
    },
    "AMAZON.ResumeIntent" : function(){
        if(this.attributes.Game.score === undefined){
            var speech = "You have not started the game yet, to start the game say, start a game";
            this.emit(":ask",speech,speech);
        }
        else if(this.attributes.Game.end === 1){
            var score = this.attributes.Game.score;
            var speech1 = "I have asked all the questions that I have, you have scored " + score + " If you wish to delete this game and start over again, say delete my previous game.";
            this.emit(":askWithCard",speech1,speech1,"The End","You have played all the thirty questions, to start over say, DELETE MY GAME");
        }else{
            this.emit('resume');    
        }
    },
    "DeleteIntent" : function(){
        if(this.attributes.Game.score === undefined){
            var speech = "You have not started the game yet, to start the game say, start a game";
            this.emit(":ask",speech,speech);
        }else{
            this.attributes.Game.end = 0;
            this.emit('start');   
        }
    },
    "AMAZON.StopIntent" : function(){
        this.emit(":tell","Thank you");
    },
    "AMAZON.CancelIntent" : function(){
        this.emit(":tell","Thank you");
    },
    "AMAZON.HelpIntent" : function(){
        this.emit(":askWithCard","I will spell out the jumbled letters of a meaningful word, you have to guess the word by spelling out the letters in the right order and also tell the word, to continue say, resume my game, or to start from the begining say, delete my previous game.","I will spell out the jumbled letters of a meaningful word, you have to guess the word by spelling out the letters in the right order and also tell the word, to continue say, resume my game, or to start from the begining say, delete my previous game.","Help","I will spell out the jumbled letters of a meaningful word, you should guess the word by spelling it out in the Right order and tell the word. For example, a guess should be like B  A  N  K BANK");
    },
    'Unhandled' : function(){
        this.emit("tell", "I did not get any response from you, please open the skill again");
    }
};