"use strict";

module.exports = {
  name: 'stats',
  description: 'Displays various stats about the bot.',
  execute: function execute(message, args) {
    var promises = [message.client.shard.fetchClientValues('guilds.cache.size'), message.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')];
    Promise.all(promises).then(function (results) {
      var totalGuilds = results[0].reduce(function (prev, guildCount) {
        return prev + guildCount;
      }, 0);
      var totalMembers = results[1].reduce(function (prev, memberCount) {
        return prev + memberCount;
      }, 0);
      return message.channel.send("Server count: ".concat(totalGuilds, "\nMember count: ").concat(totalMembers, "\nCurrent server is: ").concat(message.guild.name));
    })["catch"](console.error);
  }
};