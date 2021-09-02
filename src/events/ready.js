module.exports = {
    name: "ready",
    async execute (bot) {
        bot.user.setActivity(`@${bot.user.username}`, { type: "LISTENING", name: `@${bot.user.username}`  })
        const embed = new bot.embed()
        .setDescription(`Restarted...`)
        .setTimestamp()
        .setColor(bot.colors.green)
        // bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.STATUS_ID).send({embeds: [embed]})
        console.log(' ')
        bot.log(`${bot.user.tag} is now online!`, 'src/events/ready.js', 'INFO')
        console.log(' ')
    }
}