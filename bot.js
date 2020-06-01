const Discord = require('discord.js');
const { prefix, hp_token, DBL_TOKEN, BOT_LOGIN } = require('./config.json');
const fs = require('fs');
const responses = require('./responses.js');


// Initialize Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.responses = new Discord.Collection();

//get the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/* --------------- process messages --------------- */

client.on('message', message => {

    //make sure message isn't from a bot
    if(message.author.bot) return;
    
    //check if it's an approved non-prefixed message
    responses.sendResponse(message);

    //trigger by mention
    
    //make sure message has prefix
    if(!message.content.startsWith(prefix)) return;

    //get the actual command after the prefix and make it lowercase
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase(); 
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //make sure guild only commands throw error in DMs
    if(command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Can\'t execute that command inside DMs.');
    }

    /* --------------- for cooldowns --------------- */

     if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    /* --------------- end cooldowns --------------- */

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

    /* --------------- end command execution ---------------*/

});

/* --------------- end message processing ---------------*/


/* -------- begin info for discordbots listing -------- */

const DBL = require('dblapi.js');
const dbl = new DBL(DBL_TOKEN, client);

dbl.on('posted', () => {
  console.log('Server count posted!');
});

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
});

/* -------- end info for discordbots listing -------- */



/* -------- begin Turning The Bot On -------- */

client.once('ready', function (evt) {
    client.user.setActivity(`${prefix}help`, {type: "LISTENING"});
    console.log("I'm ready.");
});

client.on('error', console.error);
client.on('unhandledRejection', console.error);

client.login(BOT_LOGIN).catch(console.error);

/* -------- end Turning The Bot On -------- */