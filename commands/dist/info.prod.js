"use strict";var info=require("../package.json"),functions=require("../functions.js"),_require=require("../config.json"),prefix=_require.prefix,default_color=_require.default_color;module.exports={name:"info",description:"Provides information about the bot itself.",execute:function(o){o.channel.send("Here you go.",{embed:{description:"**Name:** JotaroBot\n          **Version:** ".concat(info.version,"\n          **Description:** ").concat(info.description,"\n          **Prefix:** ").concat(prefix,"\n          **Author:** ").concat(info.author,"\n          **GitHub:** ").concat(info.github,"\n\n          If you'd like to donate to the author (and help out with server fees), you can do so here: https://ko-fi.com/curricle"),color:functions.convertColor(default_color)}}).catch(function(o){console.log(o)})}};