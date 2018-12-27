/* 

TO DO:

    1. Goodnight + sleep well reminders
    2. Automatic good morning + hydration reminders
    3. Selfies
        - Continue to add more selfies to the folder
        - Figure out how to call a file without having to create an array each time the selfie command is called
        - Add Daily Jotaro twitter pulls to list of selfie sources
    4. Restructure oceanpic command so the api calls are within a function
    5. ???
    6. Have fun
    7. Art
        - figure out DeviantArt API
    
*/

//require .env for the secrets and keys
require('dotenv').config({ debug: process.env.DEBUG }).load();

const {Client, Attachment, RichEmbed} = require('discord.js');

//to access local files
const fs = require('fs');
const dir = './selfies';

//for API calls
const axios = require('axios');

//to convert hex colors to int
function HEXToVBColor(rrggbb) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
    }

//gets a random number based on an object's length
function getRandom(len) {
    return Math.floor(Math.random()*len.length);
}    

// Initialize Discord Bot
var bot = new Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    console.log("I'm ready.");
});

//for good morning and hydration
//this doesn't work right now
var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function(){
    bot.on('message', message => {
      message.channel.send("Good morning, everyone.", {
          attachment: "https://cdn.discordapp.com/attachments/482338795862097930/521782462754324491/2jrjtb.png"
      });  
    });
    
}, millisTill10);

/* List of dialogue options */

    //hydration reminders
    var reminder = ["Don't forget to hydrate today, got it?", "Remember to drink water today.", "Drink some water today, alright?", "Remember to stay hydrated today.", "Don't forget to drink water today.", "Stay hydrated, alright?", "Remember to drink water. It's good for you.", "Stay hydrated... you're gonna need it."];

    //greetings
    var greeting = ["Hi.", "Yo.", "Oi.", "You called?", "What is it?", "You talking to me?", "You talking about me?", "What do you need?", "What do you want?", "You need something?", "You want something?"];

    //thank yous
    var tys = ["thank you", "ty", "thx", "thank u", "thanks"];


//reading messages and responding to them
bot.on('message', message => {

    var msg = message.content.toLowerCase();
    
    if (msg.includes("jotarobot") && !msg.includes("good morning") && !msg.includes("thank you jotarobot") && !msg.includes("thx jotarobot") && !msg.includes("ty jotarobot") && !msg.includes("thanks jotarobot") && !msg.includes("thank u jotarobot") && !msg.includes("yare yare daze")) {
        message.channel.send(greeting[getRandom(greeting)]);
    }
    
    if(msg.includes("thanks jotaro") || msg.includes("thanks jotarobot") || msg.includes("thank you jotaro") || msg.includes("thank you jotarobot") || msg.includes("thx jotaro") || msg.includes("thx jotarobot") || msg.includes("ty jotaro") || msg.includes("ty jotarobot") || msg.includes("thank u jotaro") || msg.includes("thank u jotarobot")) {
        var yw = ["You're welcome.", "Don't mention it.", "Don't get used to it.", "Don't expect too much next time.", "Sure.", "Sure thing.", "Yeah.", "Yeah, yeah... got it.", "Good grief... I get it.", "It's fine.", "Give me a break... I get it.", "Don't worry about it.", "Uh huh."];
        message.channel.send(yw[getRandom(yw)]);
    }
    
    if(msg.includes("yare yare daze")) {
        var yare = ["Yare yare daze.", "Yare yare daze...","Good grief.", "Good grief...", "Give me a break.", "Give me a break...","That's my line.", "Hey, that's my line.", "Oi, that's my line.", "You trying to steal my line?"];
        message.channel.send(yare[getRandom(yare)]);
    }
    
    if(msg.includes("good morning")) {
        var morning = ["Good morning.", "Morning."];
        message.channel.send(morning[getRandom(morning)] + " " + reminder[getRandom(reminder)]);
    }
    
    //direct commands that begin with '?'
    if (message.content.substring(0,1) === '?') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            
            case 'help':
                message.channel.send("You need something?", {
                   embed: {
                       description: "**?help** for a list of commands\n**?oceanpic** for images related to the ocean and marine life\n**?ora** for the oras\n**?selfie** for an image of Jotaro\n\nJotaroBot will also respond to instances of his name (JotaroBot), his catchphrase, 'Good morning', and 'thank you'. Selfies sources include Daily Jotaro Screenshots on tumblr: https://dailyjotaroscreenshots.tumblr.com/" 
                       ,
                       color: HEXToVBColor("#81768C")
                   } 
                });
                console.log("Help requested.");
                break;
                
            case 'time':
                message.channel.send(now);
                break;

            case 'ping':
                message.channel.send("Yare yare daze.");
                break;
                
            case 'hydrate':
                message.channel.send(reminder[getRandom(reminder)]);
                console.log("Hydration reminder sent.");
                break;
                
            case 'ora':
                var ora = ["ORA", "Ora.", "ORA!", "ORAORAORAORAORA", "ORAORAORAORAORA!", "Ora!", "ORAORA", "ORAORA!","*ORAORA*","**ORAORA**","***ORAORA***","ORAORA!","*ORAORA!*","**ORAORA!**","***ORAORA!***","ORAAAAAAAAAA","ORAAAAAAAAAA!", "*ORAAAAAAAAAA*","**ORAAAAAAAAAA**","***ORAAAAAAAAAA***","ORAAAAAAAAAA!","*ORAAAAAAAAAA!*","**ORAAAAAAAAAA!**","***ORAAAAAAAAAA!***","Geez, do I have to do everything myself? Give me a break...", "*ORAORAORAORAORAORAORA*", "***ORAORAORAORAORAORAORA***", "*ORA*", "*ORA!*", "**ORA**", "**ORA.**", "***ORA.***", "***ORA!***", "**ORAORAORAORAORA**", "ORAORAORAORAORAORAORAAAAA!", "*ORAORAORAORAORAORAORAAAAA!*", "**ORAORAORAORAORAORAORAAAAA!**", "***ORAORAORAORAORAORAORAAAAA!***","ORAORAORAORAORAORAORAAAAA","*ORAORAORAORAORAORAORAAAAA*", "**ORAORAORAORAORAORAORAAAAA**","***ORAORAORAORAORAORAORAAAAA***"];
                message.channel.send(ora[getRandom(ora)]);
                console.log("Ora'ed.");
                break;
                
            case 'oceanpic':
                
                //restructure this so the message is not within the API call, but the API call exists within a function that is called within the message. flip it turnways
                var pic = '';
                var imgColor = '';
                var res;
  
                axios.get("https://api.unsplash.com/photos/random?collections=3672442&client_id=" + process.env.UNSPLASH_ID)
                    .then(function(response) {
                        res = response.headers;

                        pic = response.data.urls.regular;
                        imgColor = "0x" + response.data.color.substring(1,7);
                        message.channel.send("Here you go.", {
                            embed: {
                                image: {
                                    url: pic
                                },
                                color: HEXToVBColor(response.data.color),
                                title: response.data.description,
                                description: "By " + response.data.user.name + " on Unsplash: " + (response.data.user.links.html + "?utm_source=jotarobot&utm_medium=referral")
                            },
                        });
                    })
                    .catch(function (error) {
                        pic = error;
                     });
                     console.log("Ocean pic sent.");
                break;    
            
            case 'selfie':
                
                var src = getRandom(["x","x"]);
                console.log(src);
                
                switch(src) {
                    
                    case 0:
                      
                       var selfie2;
                        
                        axios.get("https://api.tumblr.com/v2/blog/dailyjotaroscreenshots.tumblr.com/posts/photo?api_key=" + process.env.TUMBLR_KEY)
                            .then(function(resp) {
                                var r = resp.data;
                                var limit = r.response.blog.posts;
                                var rand = getRandom(r.response.posts);
                                selfie2 = r.response.posts[rand].photos[0].original_size.url;
                               console.log("selfie2 inside axios: " + selfie2); 
                               message.channel.send("Here you go.", {
                                    embed: {
                                        image: {
                                            url: selfie2
                                        },
                                        description: "Source: " + r.response.posts[rand].post_url
                                    }
                               });
                            })
                            .catch(function(error) {
                                console.log(error);
                            }); 
                            
                            
                        break;
                    
                    case 1:
                        
                        //see if you can restructure this so it's not creating arrays every time; pick directly from the folder
                        fs.readdir(dir, (err, files) => {
                        if(err) {
                            console.log(err);
                        } 
                        else {
                            //send selfies from folder
                            var rand = getRandom(files);
                            var selfies = [];
                            files.forEach(file => {
                                selfies.push(file);
                            });
                            console.log(selfies[rand]);
                            message.channel.send("I've got " + files.length + " selfies to choose from. You're getting number " + (rand+1) + ".", {
                                files: [
                                        "./selfies/" + selfies[rand],
                                    ]
                            });
                        }
                    });
                        break;
                     }
                
                
                break;
                
            case 'portrait':

                axios.get("https://www.deviantart.com/api/v1/oauth2/collections/78102548?username=thefelldragon&access_token=" + process.env.DEV_KEY)
                    .then(function(response) {
                        console.log(response);
                    });
                break;
         }
     }
});

bot.on('error', console.error);
console.log(process.env);

//logged tf in
bot.login(process.env.BOT_LOGIN);