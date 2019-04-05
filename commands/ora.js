exports.run = (client, message, args) => {
                  
    var ora = ["ORA", "Ora.", "ORA!", "ORAORAORAORAORA", "ORAORAORAORAORA!", "Ora!", "ORAORA", "ORAORA!","*ORAORA*","**ORAORA**","***ORAORA***","ORAORA!","*ORAORA!*","**ORAORA!**","***ORAORA!***","ORAAAAAAAAAA","ORAAAAAAAAAA!", "*ORAAAAAAAAAA*","**ORAAAAAAAAAA**","***ORAAAAAAAAAA***","ORAAAAAAAAAA!","*ORAAAAAAAAAA!*","**ORAAAAAAAAAA!**","***ORAAAAAAAAAA!***","Geez, do I have to do everything myself? Give me a break...", "*ORAORAORAORAORAORAORA*", "***ORAORAORAORAORAORAORA***", "*ORA*", "*ORA!*", "**ORA**", "**ORA.**", "***ORA.***", "***ORA!***", "**ORAORAORAORAORA**", "ORAORAORAORAORAORAORAAAAA!", "*ORAORAORAORAORAORAORAAAAA!*", "**ORAORAORAORAORAORAORAAAAA!**", "***ORAORAORAORAORAORAORAAAAA!***","ORAORAORAORAORAORAORAAAAA","*ORAORAORAORAORAORAORAAAAA*", "**ORAORAORAORAORAORAORAAAAA**","***ORAORAORAORAORAORAORAAAAA***"];
    message.channel.send(ora[client.getRandom(ora.length)]);
    console.log("Ora'ed.");  
    
};