const { prefix, default_color } = require('../config.json');
const functions = require('../functions.js');

module.exports = {
    
    name: 'help',
    description: 'A list of commands available to use.',
    aliases: ['commands'],
    execute(message) {

        const data = [];
        const { commands } = message.client;

        message.channel.send("You need something?", {
            embed: {
                description: 
                `**${prefix}help** for a list of commands
                **${prefix}oceanpic** for images related to the ocean and marine life
                **${prefix}ora** for the oras
                **${prefix}selfie** for an image of Jotaro
                **${prefix}theworld** to stop time
                **${prefix}info** for version information
                **${prefix}quote** for a quote

                JotaroBot will also respond to instances of his name (JotaroBot), his catchphrase, 'Good morning', and 'thank you'. 
                
                Selfie sources include: 
                    - Daily Jotaro Screenshots on tumblr: https://dailyjotaroscreenshots.tumblr.com/
                    - Daily Jotaro on twitter: https://twitter.com/daily_jotaro`,
                color: functions.convertColor(default_color)
            }
        });
        
        console.log("Help requested.");
        console.log(default_color);

    },
    
};