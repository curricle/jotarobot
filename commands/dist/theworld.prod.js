"use strict";var functions=require("../functions.js");module.exports={name:"theworld",description:"Stops time.",cooldown:10,execute:function(a){var n,s=.4<(n=Math.random())?functions.getRandom(6,4):.15<n&&n<.4?functions.getRandom(9,7):n<=.15?functions.getRandom(12,10):void 0,t=0;console.log(s);var e=["Star Platinum: ","Star Platinum... "],o=["The World!","*The World!*","*THE WORLD!*","THE WORLD!","**The World!**","**THE WORLD!**","***The World!***","***THE WORLD!***"];a.channel.send(e[functions.getRandom(e.length)]+o[functions.getRandom(o.length)]),setInterval(function(){1==++t?a.channel.send("".concat(t," second has passed...")):t<=s&&a.channel.send("".concat(t," seconds have passed..."))},1e3),setTimeout(function(){a.channel.send("Time has resumed.");var n=["So... ".concat(s," seconds, huh?"),"".concat(s," seconds..."),"Managed to stop time for ".concat(s," seconds.")],t=["It's been a while.","I'm not as sharp as I used to be.","I'm getting old.","I'm out of practice.","I should practice more.","Gonna be tough defeating DIO with this.","I'll never defeat DIO with this.","Damn."],e=["Not too shabby.","Could be worse.","Hmm.","I can work with that.","Not bad.","Alright.","Good enough.","Not my best, but it's something."],o=["I'm in top form.","I'm at the top of my game.","Watch out.","DIO won't know what hit him.","Nice.","Heh... alright."];s<=6&&a.channel.send(n[functions.getRandom(n.length)]+" "+t[functions.getRandom(t.length)]),6<s&&s<=9&&a.channel.send(n[functions.getRandom(n.length)]+" "+e[functions.getRandom(e.length)]),9<s&&a.channel.send(n[functions.getRandom(n.length)]+" "+o[functions.getRandom(o.length)])},1e3*s+1e3)}};