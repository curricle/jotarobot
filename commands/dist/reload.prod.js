"use strict";var _require=require("../config.json"),owner_ID=_require.owner_ID;module.exports={name:"reload",description:"Reloads commands.",cooldown:0,guildOnly:!1,args:!0,execute:function(n,e){if(n.author.id===owner_ID){if(!e.length)return n.channel.send("You didn't pass any command to reload, ".concat(n.author,"!"));var a=e[0].toLowerCase(),o=n.client.commands.get(a)||n.client.commands.find(function(e){return e.aliases&&e.aliases.includes(a)});if(!o)return n.channel.send("There is no command with name or alias `".concat(a,"`, ").concat(n.author,"!"));delete require.cache[require.resolve("./".concat(o.name,".js"))];try{var r=require("./".concat(o.name,".js"));n.client.commands.set(r.name,r)}catch(e){console.log(e),n.channel.send("There was an error while reloading a command `".concat(o.name,"`:\n`").concat(e.message,"`"))}n.channel.send("Command `".concat(o.name,"` was reloaded!"))}}};