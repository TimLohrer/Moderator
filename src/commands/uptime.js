//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "uptime",
    aliases: ["uptime", "ut", "upt", "online", "utime"],
    category: "INFO",
    description: "Tells you how long the bot is online since the last restart.",
    usage: " ",
    example: " ",
    cooldown: 30,
    async execute({message, args, db, bot}) {
        const time = bot.ms(bot.uptime)
        return bot.info(`I am now online since \`${time}\`!`, message, 20, true)
    }
}