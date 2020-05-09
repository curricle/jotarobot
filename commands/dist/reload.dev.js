"use strict";

var _require = require('../config.json'),
    owner_ID = _require.owner_ID;

module.exports = {
  name: 'reload',
  description: 'Reloads commands.',
  args: true,
  execute: function execute(message, args) {
    if (message.author.id !== owner_ID) return;
    if (!args.length) return message.channel.send("You didn't pass any command to reload, ".concat(message.author, "!"));
    var commandName = args[0].toLowerCase();
    var command = message.client.commands.get(commandName) || message.client.commands.find(function (cmd) {
      return cmd.aliases && cmd.aliases.includes(commandName);
    });
    if (!command) return message.channel.send("There is no command with name or alias `".concat(commandName, "`, ").concat(message.author, "!"));
    delete require.cache[require.resolve("./".concat(command.name, ".js"))];

    try {
      var newCommand = require("./".concat(command.name, ".js"));

      message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
      console.log(error);
      message.channel.send("There was an error while reloading a command `".concat(command.name, "`:\n`").concat(error.message, "`"));
    }

    message.channel.send("Command `".concat(command.name, "` was reloaded!"));
  }
};