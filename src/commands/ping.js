//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "ping",
    aliases: ["ping", "p", "latency", "lag"],
    category: "INFO",
    description: "Tells you the latency of the bot and the Discord API latency.",
    usage: " ",
    example: " ",
    async execute({message, args, db, bot}) {
        const msg = await message.reply(`Pinging...`)
        msg.delete()
        return bot.info(`My ping is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API latency is \`${bot.ws.ping}ms\`.`, message, 15, true, "🏓")
    }
}