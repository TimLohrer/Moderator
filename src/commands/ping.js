//ts-check
require('discord-reply')
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "ping",
    aliases: ["ping", "p", "latency", "lag"],
    category: "MISC",
    description: "Tells you the latency of the bot and the Discord API latency.",
    usage: " ",
    example: " ",
    id: 9,
    async execute({message, args, db, bot}) {
        const msg = await message.lineReply(`Pinging...`)
        msg.delete()
        bot.info(`My ping is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API latency is \`${bot.ws.ping}ms\`.`, message, 15, "🏓")
        setTimeout(() => { if(message.deleted === false) { message.delete() } if(msg.deleted === false) { msg.delete() } }, 10 * 1000)
    }
}