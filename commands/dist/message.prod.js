"use strict";module.exports=function(t,o,e){if(!o.author.bot){var n,a,i,r=o.content.toLowerCase(),d=["Don't forget to hydrate today, got it?","Remember to drink water today.","Drink some water today, alright?","Remember to stay hydrated today.","Don't forget to drink water today.","Stay hydrated, alright?","Remember to drink water. It's good for you.","Stay hydrated... you're gonna need it."],s=["Hi.","Yo.","Oi.","You called?","What is it?","You talking to me?","You talking about me?","What do you need?","What do you want?","You need something?","You want something?"];if(!r.includes("jotarobot")||r.includes("good morning")||r.includes("thank you jotarobot")||r.includes("thx jotarobot")||r.includes("ty jotarobot")||r.includes("thanks jotarobot")||r.includes("thank u jotarobot")||r.includes("yare yare daze")||o.channel.send(s[t.getRandom(s.length)]),r.includes("thanks jotaro")||r.includes("thanks jotarobot")||r.includes("thank you jotaro")||r.includes("thank you jotarobot")||r.includes("thx jotaro")||r.includes("thx jotarobot")||r.includes("ty jotaro")||r.includes("ty jotarobot")||r.includes("thank u jotaro")||r.includes("thank u jotarobot")){var u=["You're welcome.","Don't mention it.","Don't get used to it.","Don't expect too much next time.","Sure.","Sure thing.","Yeah.","Yeah, yeah... got it.","Good grief... I get it.","It's fine.","Give me a break... I get it.","Don't worry about it.","Uh huh."];o.channel.send(u[t.getRandom(u.length)])}if(r.includes("yare yare daze")){var l=["Yare yare daze.","Yare yare daze...","Good grief.","Good grief...","Give me a break.","Give me a break...","That's my line.","Hey, that's my line.","Oi, that's my line.","You trying to steal my line?"];o.channel.send(l[t.getRandom(l.length)])}if(r.includes("good morning")){var h=["Good morning.","Morning."];o.channel.send(h[t.getRandom(h.length)]+" "+d[t.getRandom(d.length)])}if(0===o.content.indexOf(t.config.prefix))e=o.content.slice(t.config.prefix.length).trim().split(/ +/g),a=(n=e).shift().toLowerCase(),(i=t.commands.get(a))?i.run(t,o,n):console.log("Command does not exist")}};