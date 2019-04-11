exports.run = (client, message, args) => {
    
    message.channel.send("Here you go.", {
      embed: {
        description: "**Name:** JotaroBot\n**Version:** " + client.info.version + "\n**Description:** " + client.info.description + "\n**Prefix:** " + client.config.prefix + "\n**Author:** " + client.info.author + "\n**GitHub repo:** https://github.com/curricle/jotarobot",
        color: client.convertColor(client.config.default_color)
      }
    })
    .catch(function(error) {
        console.log(error);
    });  
};