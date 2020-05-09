module.exports = {
	name: 'stats',
	description: 'Displays various stats about the bot.',
	execute(message, args) {
		const promises = [
			message.client.shard.fetchClientValues('guilds.cache.size'),
			message.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
		];
		
		Promise.all(promises)
			.then(results => {
				const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
				const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}\nCurrent server is: ${message.guild.name}`);
			})
			.catch(console.error);
	}

}