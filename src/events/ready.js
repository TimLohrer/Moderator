module.exports = {
    name: "ready",
    async execute (bot, type) {
        bot.user.setActivity(`@${bot.user.username}`, { type: "LISTENING", name: `@${bot.user.username}`  })
        const embed = new bot.embed()
        .setDescription(`Restarted...`)
        .setTimestamp()
        .setColor(bot.colors.green)
        // bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.STATUS_ID).send(embed)
        if (!type) {
            console.log(' ')
            bot.log(`${bot.user.tag} is now online!`, 'src/events/ready.js', 'INFO')
            console.log(' ')
        } else if (type === "RESTART") {
            bot.log(`${bot.user.tag} restarted!`, 'src/events/dev.js', 'INFO')
            console.log(' ')
        }
    }
}