"use strict";var _require=require("../config.json"),prefix=_require.prefix,default_color=_require.default_color,functions=require("../functions.js");module.exports={name:"help",description:"A list of commands available to use.",aliases:["commands"],execute:function(o){o.client.commands;o.channel.send("You need something?",{embed:{description:"**".concat(prefix,"help** for a list of commands\n                **").concat(prefix,"oceanpic** for images related to the ocean and marine life\n                **").concat(prefix,"ora** for the oras\n                **").concat(prefix,"selfie** for an image of Jotaro\n                **").concat(prefix,"theworld** to stop time\n                **").concat(prefix,"info** for version information\n                **").concat(prefix,"quote** for a quote\n\n                JotaroBot will also respond to instances of his name (JotaroBot), his catchphrase, 'Good morning', and 'thank you'. \n                \n                Selfie sources include: \n                    - Daily Jotaro Screenshots on tumblr: https://dailyjotaroscreenshots.tumblr.com/\n                    - Daily Jotaro on twitter: https://twitter.com/daily_jotaro"),color:functions.convertColor(default_color)}}),console.log("Help requested."),console.log(default_color)}};