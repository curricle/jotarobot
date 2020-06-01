const info = require('../package.json');
const functions = require('../functions.js');
const { prefix, default_color } = require('../config.json');

module.exports = {
    name: 'info',
    description: 'Provides information about the bot itself.',
    cooldown: 1,
    guildOnly: false,
    execute(message) {
      message.channel.send("Here you go.", {
        embed: {
          description: 
          `**Name:** JotaroBot
          **Version:** ${info.version}
          **Description:** ${info.description}
          **Prefix:** ${prefix}
          **Author:** ${info.author}
          **GitHub:** ${info.github}

          If you'd like to donate to the author (and help out with server fees), you can do so here: https://ko-fi.com/curricle`,
          color: functions.convertColor(default_color)
        }
      })
      .catch(function(error) {
          console.log(error);
      });  
    }
    
};