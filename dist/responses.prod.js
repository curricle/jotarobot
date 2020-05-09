"use strict";var functions=require("./functions"),reminder=["Don't forget to hydrate today, got it?","Remember to drink water today.","Drink some water today, alright?","Remember to stay hydrated today.","Don't forget to drink water today.","Stay hydrated, alright?","Remember to drink water. It's good for you.","Stay hydrated... you're gonna need it."],greeting=["Hi.","Yo.","Oi.","You called?","What is it?","You talking to me?","You talking about me?","What do you need?","What do you want?","You need something?","You want something?"],tys=["thank you","ty","thx","thank u","thanks"],yw=["You're welcome.","Don't mention it.","Don't get used to it.","Don't expect too much next time.","Sure.","Sure thing.","Yeah.","Yeah, yeah... got it.","Good grief... I get it.","It's fine.","Give me a break... I get it.","Don't worry about it.","Uh huh."],yare=["Yare yare daze.","Yare yare daze...","Good grief.","Good grief...","Give me a break.","Give me a break...","That's my line.","Hey, that's my line.","Oi, that's my line.","You trying to steal my line?"];function sendGoodMorning(e){var n=["Good morning.","Morning."];e.channel.send("".concat(n[functions.getRandom(n.length)]," ").concat(reminder[functions.getRandom(reminder.length)]))}function sendGreeting(e){e.channel.send(greeting[functions.getRandom(greeting.length)])}function sendYareYareDaze(e){e.channel.send(yare[functions.getRandom(yare.length)])}function sendYoureWelcome(e){e.channel.send(yw[functions.getRandom(yw.length)])}function sendResponse(e){for(var n in tys)if(e.content.includes("".concat(tys[n]," jotaro"))||e.content.includes("".concat(tys[n]," jotarobot")))return void sendYoureWelcome(e);if(e.content.includes("yare yare daze")&&sendYareYareDaze(e),e.content.includes("good morning"))sendGoodMorning(e);else{if(!e.content.includes("jotarobot"))return;sendGreeting(e)}}module.exports={sendResponse:sendResponse};