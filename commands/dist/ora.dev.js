"use strict";

var functions = require('../functions.js');

module.exports = {
  name: "ora",
  description: "Ora.",
  execute: function execute(message) {
    var ora = ["ORA", "Ora.", "ORA!", "ORAORAORAORAORA", "ORAORAORAORAORA!", "Ora!", "ORAORA", "ORAORA!", "*ORAORA*", "**ORAORA**", "***ORAORA***", "ORAORA!", "*ORAORA!*", "**ORAORA!**", "***ORAORA!***", "ORAAAAAAAAAA", "ORAAAAAAAAAA!", "*ORAAAAAAAAAA*", "**ORAAAAAAAAAA**", "***ORAAAAAAAAAA***", "ORAAAAAAAAAA!", "*ORAAAAAAAAAA!*", "**ORAAAAAAAAAA!**", "***ORAAAAAAAAAA!***", "Geez, do I have to do everything myself? Give me a break...", "*ORAORAORAORAORAORAORA*", "***ORAORAORAORAORAORAORA***", "*ORA*", "*ORA!*", "**ORA**", "**ORA.**", "***ORA.***", "***ORA!***", "**ORAORAORAORAORA**", "ORAORAORAORAORAORAORAAAAA!", "*ORAORAORAORAORAORAORAAAAA!*", "**ORAORAORAORAORAORAORAAAAA!**", "***ORAORAORAORAORAORAORAAAAA!***", "ORAORAORAORAORAORAORAAAAA", "*ORAORAORAORAORAORAORAAAAA*", "**ORAORAORAORAORAORAORAAAAA**", "***ORAORAORAORAORAORAORAAAAA***"];
    message.channel.send(ora[functions.getRandom(ora.length)]);
    console.log("Ora'ed.");
  }
};