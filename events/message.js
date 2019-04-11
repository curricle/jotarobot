//reading messages and responding to them
module.exports = (client, message) => {
    
    //make sure message isn't from a client
    if(message.author.bot) return;
    var msg = message.content.toLowerCase();
    
    /* List of dialogue options */
    //hydration reminders
    var reminder = ["Don't forget to hydrate today, got it?", "Remember to drink water today.", "Drink some water today, alright?", "Remember to stay hydrated today.", "Don't forget to drink water today.", "Stay hydrated, alright?", "Remember to drink water. It's good for you.", "Stay hydrated... you're gonna need it."];

    //greetings
    var greeting = ["Hi.", "Yo.", "Oi.", "You called?", "What is it?", "You talking to me?", "You talking about me?", "What do you need?", "What do you want?", "You need something?", "You want something?"];

    //thank you list
    var tys = ["thank you", "ty", "thx", "thank u", "thanks"];

    //acceptable non-prefixed messages to react to
    if (msg.includes("jotarobot") && !msg.includes("good morning") && !msg.includes("thank you jotarobot") && !msg.includes("thx jotarobot") && !msg.includes("ty jotarobot") && !msg.includes("thanks jotarobot") && !msg.includes("thank u jotarobot") && !msg.includes("yare yare daze")) {
        message.channel.send(greeting[client.getRandom(greeting.length)]);
        }
        
    if(msg.includes("thanks jotaro") || msg.includes("thanks jotarobot") || msg.includes("thank you jotaro") || msg.includes("thank you jotarobot") || msg.includes("thx jotaro") || msg.includes("thx jotarobot") || msg.includes("ty jotaro") || msg.includes("ty jotarobot") || msg.includes("thank u jotaro") || msg.includes("thank u jotarobot")) {
        var yw = ["You're welcome.", "Don't mention it.", "Don't get used to it.", "Don't expect too much next time.", "Sure.", "Sure thing.", "Yeah.", "Yeah, yeah... got it.", "Good grief... I get it.", "It's fine.", "Give me a break... I get it.", "Don't worry about it.", "Uh huh."];
        message.channel.send(yw[client.getRandom(yw.length)]);
        }
        
    if(msg.includes("yare yare daze")) {
        var yare = ["Yare yare daze.", "Yare yare daze...","Good grief.", "Good grief...", "Give me a break.", "Give me a break...","That's my line.", "Hey, that's my line.", "Oi, that's my line.", "You trying to steal my line?"];
        message.channel.send(yare[client.getRandom(yare.length)]);
        }
        
    if(msg.includes("good morning")) {
        var morning = ["Good morning.", "Morning."];
        message.channel.send(morning[client.getRandom(morning.length)] + " " + reminder[client.getRandom(reminder.length)]);
        }
    
    //make sure message has prefix
    if(message.content.indexOf(client.config.prefix) !== 0) return;
    
    //get message command
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var cmd = client.commands.get(command);
    
    //if the command doesn't exist, return
    if(!cmd) {
        return;
    }
    
    cmd.run(client, message, args);

};
