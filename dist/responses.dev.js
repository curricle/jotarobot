"use strict";

var functions = require("./functions"); // List of dialogue options
//hydration reminders


var reminder = ["Don't forget to hydrate today, got it?", "Remember to drink water today.", "Drink some water today, alright?", "Remember to stay hydrated today.", "Don't forget to drink water today.", "Stay hydrated, alright?", "Remember to drink water. It's good for you.", "Stay hydrated... you're gonna need it."]; //greetings

var greeting = ["Hi.", "Yo.", "Oi.", "You called?", "What is it?", "You talking to me?", "You talking about me?", "What do you need?", "What do you want?", "You need something?", "You want something?"]; //thank you list

var tys = ["thank you", "ty", "thx", "thank u", "thanks"];
var yw = ["You're welcome.", "Don't mention it.", "Don't get used to it.", "Don't expect too much next time.", "Sure.", "Sure thing.", "Yeah.", "Yeah, yeah... got it.", "Good grief... I get it.", "It's fine.", "Give me a break... I get it.", "Don't worry about it.", "Uh huh."];
var yare = ["Yare yare daze.", "Yare yare daze...", "Good grief.", "Good grief...", "Give me a break.", "Give me a break...", "That's my line.", "Hey, that's my line.", "Oi, that's my line.", "You trying to steal my line?"];

function sendGoodMorning(message) {
  var morning = ["Good morning.", "Morning."];
  message.channel.send("".concat(morning[functions.getRandom(morning.length)], " ").concat(reminder[functions.getRandom(reminder.length)]));
}

function sendGreeting(message) {
  message.channel.send(greeting[functions.getRandom(greeting.length)]);
}

function sendYareYareDaze(message) {
  message.channel.send(yare[functions.getRandom(yare.length)]);
}

function sendYoureWelcome(message) {
  message.channel.send(yw[functions.getRandom(yw.length)]);
}

function sendResponse(msg) {
  //acceptable non-prefixed messages to react to
  for (var ty in tys) {
    if (msg.content.includes("".concat(tys[ty], " jotaro")) || msg.content.includes("".concat(tys[ty], " jotarobot"))) {
      sendYoureWelcome(msg);
      return;
    }
  }

  if (msg.content.includes("yare yare daze")) {
    sendYareYareDaze(msg);
  }

  if (msg.content.includes("good morning")) {
    sendGoodMorning(msg);
  } else if (msg.content.includes("jotarobot")) {
    sendGreeting(msg);
  } else return;
}

module.exports = {
  sendResponse: sendResponse
};