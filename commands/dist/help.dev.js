"use strict";

var _require = require('../config.json'),
    prefix = _require.prefix,
    default_color = _require.default_color;

var functions = require('../functions.js');

module.exports = {
  name: 'help',
  description: 'A list of commands available to use.',
  cooldown: 1,
  guildOnly: false,
  aliases: ['commands'],
  execute: function execute(message) {
    var data = [];
    var commands = message.client.commands;
    message.channel.send("You need something?", {
      embed: {
        description: "**".concat(prefix, "help** for a list of commands\n                **").concat(prefix, "oceanpic** for images related to the ocean and marine life\n                **").concat(prefix, "ora** for the oras\n                **").concat(prefix, "selfie** for an image of Jotaro\n                **").concat(prefix, "theworld** to stop time\n                **").concat(prefix, "info** for version information\n                **").concat(prefix, "quote** for a quote\n\n                JotaroBot will also respond to instances of his name (JotaroBot), his catchphrase, 'Good morning', and 'thank you'. \n                \n                Selfie sources include: \n                    - Daily Jotaro Screenshots on tumblr: https://dailyjotaroscreenshots.tumblr.com/\n                    - Daily Jotaro on twitter: https://twitter.com/daily_jotaro"),
        color: functions.convertColor(default_color)
      }
    });
  }
};