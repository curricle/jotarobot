"use strict";var quotes=require("../quotes.json"),functions=require("../functions"),_require=require("../config.json"),default_color=_require.default_color;module.exports={name:"quote",description:"Sends a quote from Jotaro.",execute:function(e){var o,r=functions.getRandom(quotes.series[0].arc.length),n=quotes.series[0].arc[r];for(var t in n)o=t;var u=functions.getRandom(n[o].length),s=n[o][u];console.log(s.quote),e.channel.send("",{embed:{description:'*"'+s.quote+'"*\n\n - '+s.description+"\nVolume "+s.vol+", Chapter "+s.ch+": *"+o+"*, part "+s.part,color:functions.convertColor(default_color)}})}};