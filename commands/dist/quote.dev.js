"use strict";

var quotes = require("../quotes.json");

var functions = require("../functions");

var _require = require("../config.json"),
    default_color = _require.default_color;

module.exports = {
  name: "quote",
  description: "Sends a quote from Jotaro.",
  cooldown: 1,
  guildOnly: false,
  execute: function execute(message) {
    var getArc = functions.getRandom(quotes.series[0].arc.length);
    var obj = quotes.series[0].arc[getArc];
    var arcName;

    for (var key in obj) {
      arcName = key;
    }

    var randTwo = functions.getRandom(obj[arcName].length);
    var quoteObj = obj[arcName][randTwo];
    message.channel.send("", {
      embed: {
        description: "*\"" + quoteObj.quote + "\"*" + "\n\n - " + quoteObj.description + "\nVolume " + quoteObj.vol + ", Chapter " + quoteObj.ch + ": *" + arcName + "*, part " + quoteObj.part,
        color: functions.convertColor(default_color)
      }
    });
  }
};