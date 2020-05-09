"use strict";var axios=require("axios"),fs=require("fs"),dir="./selfies",config=require("../config.json"),functions=require("../functions.js"),default_color=functions.convertColor(config.default_color);module.exports={name:"selfie",description:"Sends an image of Jotaro.",execute:function(c){var e=new(require("twitter"))({consumer_key:config.TWITTER_KEY,consumer_secret:config.TWITTER_SECRET,access_token_key:config.TWITTER_ACCESS_KEY,access_token_secret:config.TWITTER_ACCESS_SECRET});switch(functions.getRandom(4)){case 0:var n;axios.get("https://api.tumblr.com/v2/blog/dailyjotaroscreenshots.tumblr.com/posts/photo?api_key=".concat(config.TUMBLR_KEY)).then(function(e){var o=e.data,t=(o.response.blog.posts,functions.getRandom(o.response.posts.length));n=o.response.posts[t].photos[0].original_size.url,console.log("Tumblr selfie: ".concat(n)),c.channel.send("Here you go.",{embed:{image:{url:n},description:"Source: ".concat(o.response.posts[t].post_url),color:default_color}})}).catch(function(e){console.log(e)});break;case 1:var s;axios.get("https://api.tumblr.com/v2/blog/jotarobot-selfies.tumblr.com/posts/photo?api_key=".concat(config.TUMBLR_KEY)).then(function(e){var o=e.data,t=(o.response.blog.posts,functions.getRandom(o.response.posts.length));s=o.response.posts[t].photos[0].original_size.url,console.log("JTB Tumblr selfie:  ".concat(s)),c.channel.send("Here you go.",{embed:{image:{url:s},color:default_color}})}).catch(function(e){console.log(e)});break;case 2:e.get("statuses/user_timeline",{screen_name:"daily_jotaro",value:"has:media",count:3200},function(e,o,t){if(!e){var n=o[functions.getRandom(o.length)];if(void 0!==n.entities.media){var s=n.entities.media[0].media_url;console.log("@daily_jotaro selfie"),c.channel.send("Here you go.",{embed:{image:{url:s},color:functions.convertColor(n.user.profile_link_color),description:"Source: @daily_jotaro ".concat(n.text)}})}else c.channel.send("Sorry, something went wrong. Try again."),console.log(e)}});break;case 3:var t,a=110;axios.get("https://www.deviantart.com/oauth2/token",{params:{client_id:config.DEV_CLIENT_ID,client_secret:config.DEV_CLIENT_SECRET,grant_type:"client_credentials"}}).then(function(o){axios.get("https://www.deviantart.com/api/v1/oauth2/collections/folders",{params:{username:"thefelldragon",calculate_size:!0,access_token:o.data.access_token,offset:10}}).then(function(e){a=e.data.results[4].size,config.DEV_ACCESS_TOKEN=o.data.access_token,t=functions.getRandom(a/10),axios.get("https://www.deviantart.com/api/v1/oauth2/collections/C769BFDD-A16F-33D2-7BFE-45DA8BB5A5BF?username=thefelldragon&access_token=".concat(config.DEV_ACCESS_TOKEN),{params:{offset:10*t}}).then(function(e){var o=e.data.results.length,t=functions.getRandom(o),n=e.data.results[t];console.log("deviantART selfie: ".concat(n.content.src)),c.channel.send("Here you go.",{embed:{image:{url:n.content.src},color:default_color,title:n.title,description:"By ".concat(n.author.username," on deviantART: ").concat(n.url)}})}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})}}};