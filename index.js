const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./bot.js', { token: config.hp_token });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

process.on("unhandledRejection", err => { console.log(err.stack, "error"); });