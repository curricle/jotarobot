"use strict";

var functions = require('../functions.js');

module.exports = {
  name: 'theworld',
  description: 'Stops time.',
  cooldown: 10,
  guildOnly: false,
  execute: function execute(message) {
    /* 
          range 4-6: 60%
    range 7-9: 25%
    range 10-12: 15% 
    
    */
    function getRangeByPercentage() {
      var percentage = Math.random();

      if (percentage > .4) {
        return functions.getRandom(6, 4);
      }

      if (percentage > .15 && percentage < .4) {
        return functions.getRandom(9, 7);
      }

      if (percentage <= .15) {
        return functions.getRandom(12, 10);
      }
    }

    var seconds = getRangeByPercentage();
    var elapsed = 0;
    console.log(seconds);
    var sp = ["Star Platinum: ", "Star Platinum... "];
    var tw = ["The World!", "*The World!*", "*THE WORLD!*", "THE WORLD!", "**The World!**", "**THE WORLD!**", "***The World!***", "***THE WORLD!***"];
    message.channel.send(sp[functions.getRandom(sp.length)] + tw[functions.getRandom(tw.length)]);

    function count() {
      elapsed++;

      if (elapsed == 1) {
        message.channel.send("".concat(elapsed, " second has passed..."));
      } else if (elapsed <= seconds) {
        message.channel.send("".concat(elapsed, " seconds have passed..."));
      }
    }

    setInterval(count, 1000);
    setTimeout(function () {
      message.channel.send("Time has resumed.");
      var beginning = ["So... ".concat(seconds, " seconds, huh?"), "".concat(seconds, " seconds..."), "Managed to stop time for ".concat(seconds, " seconds.")];
      var low = ["It's been a while.", "I'm not as sharp as I used to be.", "I'm getting old.", "I'm out of practice.", "I should practice more.", "Gonna be tough defeating DIO with this.", "I'll never defeat DIO with this.", "Damn."];
      var mid = ["Not too shabby.", "Could be worse.", "Hmm.", "I can work with that.", "Not bad.", "Alright.", "Good enough.", "Not my best, but it's something."];
      var high = ["I'm in top form.", "I'm at the top of my game.", "Watch out.", "DIO won't know what hit him.", "Nice.", "Heh... alright."];

      if (seconds <= 6) {
        message.channel.send(beginning[functions.getRandom(beginning.length)] + " " + low[functions.getRandom(low.length)]);
      }

      if (seconds > 6 && seconds <= 9) {
        message.channel.send(beginning[functions.getRandom(beginning.length)] + " " + mid[functions.getRandom(mid.length)]);
      }

      if (seconds > 9) {
        message.channel.send(beginning[functions.getRandom(beginning.length)] + " " + high[functions.getRandom(high.length)]);
      }
    }, 1000 * seconds + 1000);
  }
};