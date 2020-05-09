"use strict";

var Discord = require('discord.js');

var _require = require('./config.json'),
    prefix = _require.prefix,
    hp_token = _require.hp_token,
    DBL_TOKEN = _require.DBL_TOKEN,
    BOT_LOGIN = _require.BOT_LOGIN;

var fs = require('fs');

var responses = require('./responses.js'); // Initialize Discord client


var client = new Discord.Client();
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();
var cooldowns = new Discord.Collection();
client.responses = new Discord.Collection(); //get the commands

var commandFiles = fs.readdirSync('./commands').filter(function (file) {
  return file.endsWith('.js');
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = commandFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;

    var command = require("./commands/".concat(file));

    client.commands.set(command.name, command);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

console.log(client.commands);
/* --------------- process messages --------------- */

client.on('message', function (message) {
  //make sure message isn't from a bot
  if (message.author.bot) return; //check if it's an approved non-prefixed message

  responses.sendResponse(message); //trigger by mention
  //make sure message has prefix

  if (message.content.indexOf(prefix) !== 0) return; //get the actual command after the prefix and make it lowercase

  var args = message.content.slice(prefix.length).split(/ +/g);
  var commandName = args.shift().toLowerCase();
  /* --------------- execute the command --------------- */

  var command = client.commands.get(commandName) || client.commands.find(function (cmd) {
    return cmd.aliases && cmd.aliases.includes(commandName);
  });
  /* --------------- for cooldowns --------------- */

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  var now = Date.now();
  var timestamps = cooldowns.get(command.name);
  var cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    var expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      var timeLeft = (expirationTime - now) / 1000;
      return message.reply("please wait ".concat(timeLeft.toFixed(1), " more second(s) before reusing the `").concat(command.name, "` command."));
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(function () {
    return timestamps["delete"](message.author.id);
  }, cooldownAmount);
  /* --------------- end cooldowns --------------- */

  console.log(command);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
  /* --------------- end command execution ---------------*/

});
/* --------------- end message processing ---------------*/

/* -------- begin info for discordbots listing -------- */

var DBL = require('dblapi.js');

var dbl = new DBL(DBL_TOKEN, client);
dbl.on('posted', function () {
  console.log('Server count posted!');
});
dbl.on('error', function (e) {
  console.log("Oops! ".concat(e));
});
/* -------- end info for discordbots listing -------- */

/* -------- begin Turning The Bot On -------- */

client.once('ready', function (evt) {
  client.user.setActivity("".concat(prefix, "help"), {
    type: "LISTENING"
  });
  console.log("I'm ready.");
});
client.on('error', console.error);
client.on('unhandledRejection', console.error);
client.login(BOT_LOGIN)["catch"](console.error);
/* -------- end Turning The Bot On -------- */