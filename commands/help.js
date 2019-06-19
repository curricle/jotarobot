exports.run = (client, message, args) => {
    
    message.channel.send("You need something?", {
        embed: {
            description: "**?help** for a list of commands\n**?oceanpic** for images related to the ocean and marine life\n**?ora** for the oras\n**?selfie** for an image of Jotaro\n**?theworld** to stop time\n**?info** for version information\n\nJotaroBot will also respond to instances of his name (JotaroBot), his catchphrase, 'Good morning', and 'thank you'. \n\nSelfie sources include: \n    - Daily Jotaro Screenshots on tumblr: https://dailyjotaroscreenshots.tumblr.com/\n    - Daily Jotaro on twitter: https://twitter.com/daily_jotaro" 
                       ,
            color: client.convertColor(client.config.default_color)
                   } 
                });
            console.log("Help requested.");

};