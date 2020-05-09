"use strict";

var _require = require('discord.js'),
    ShardingManager = _require.ShardingManager;

var _require2 = require('./config.json'),
    BOT_LOGIN = _require2.BOT_LOGIN;

var manager = new ShardingManager('./bot.js', {
  token: BOT_LOGIN
});
manager.spawn();
manager.on('shardCreate', function (shard) {
  return console.log("Launched shard ".concat(shard.id));
});
process.on("unhandledRejection", function (err) {
  console.log(err.stack, "error");
});