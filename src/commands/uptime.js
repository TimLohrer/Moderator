module.exports = {
    name: "uptime",
    aliases: ["uptime", "ut", "upt", "online", "utime"],
    category: "MISC",
    description: "Tells you how long the bot is online since the last restart.",
    usage: " ",
    example: " ",
    id: 4,
    async execute(message, args, db, bot) {
        return bot.info(`I am now online since \`${(bot.uptime / 1000 / 60 / 60).toFixed(2)} h\``, message)
    }
}