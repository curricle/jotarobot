"use strict";

var _require = require('discord.js'),
    ShardingManager = _require.ShardingManager;

var config = require('./config.json');

var manager = new ShardingManager('./bot.js', {
  token: config.hp_token
});
manager.spawn();
manager.on('shardCreate', function (shard) {
  return console.log("Launched shard ".concat(shard.id));
});
process.on("unhandledRejection", function (err) {
  console.log(err.stack, "error");
});