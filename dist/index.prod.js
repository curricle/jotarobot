"use strict";var _require=require("discord.js"),ShardingManager=_require.ShardingManager,config=require("./config.json"),manager=new ShardingManager("./bot.js",{token:config.hp_token});manager.spawn(),manager.on("shardCreate",function(n){return console.log("Launched shard ".concat(n.id))}),process.on("unhandledRejection",function(n){console.log(n.stack,"error")});