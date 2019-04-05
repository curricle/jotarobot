/* 

    TO UPDATE:
    
    - Make sure node is the latest version
    - install better-sqlite-pool
    - install Enmap (npm install enmap@latest)
    - install devtools (yum install make automake gcc gcc-c++ kernel-devel)
    
    ALSO: there doesn't need to be a getRandomByInt AND a getRandom. you moron. just pass the length of the array when -- oh my god. you idiot
    
    Updates:
    - HEXtoVBColor or whatever it's called is now convertColor and it's more accurate
    - the .env file is the config file now
    
    Consult this for embed pagination: https://www.youtube.com/watch?v=GQlBPMW0pZo
    
    REMEMBER: all instances of "bot" were changed to "client"

*/


const Discord = require('discord.js');
const Enmap = require('enmap');
const config = require('./config.json');
const info = require('./package.json');
const fs = require('fs');


// Initialize Discord client
const client = new Discord.Client();

client.config = config;
client.info = info;

//for discordbots stats
const DBL = require('dblapi.js');
const dbl = new DBL(config.DBL_TOKEN, client);

//gets a random number 
client.getRandom = (len) => {
    return Math.floor(Math.random()*len);
};   

//to convert hex colors to int
client.convertColor = (rrggbb) => {
    var newColor = rrggbb.substr(1);
    return parseInt(newColor, 16);
    };


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

//r u ready kids
client.on('ready', function (evt) {
    client.user.setPresence({
        game: {
            'name': '?help',
            'type': 'LISTENING'
        },
        status: 'online'
    });
    console.log("I'm ready.");
});

client.on('error', console.error);

//logged tf in
client.login(config.BOT_LOGIN);