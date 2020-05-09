const { ShardingManager } = require('discord.js');
const { BOT_LOGIN } = require('./config.json');
const manager = new ShardingManager('./bot.js', { token: BOT_LOGIN });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

process.on("unhandledRejection", err => { console.log(err.stack, "error"); });