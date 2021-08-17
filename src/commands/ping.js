require('discord-reply')

module.exports = {
    name: "ping",
    aliases: ["ping", "p", "latency", "lag"],
    category: "misc",
    description: "Tells you the latency of the bot and the Discord API latency.",
    usage: "ping",
    example: "ping",
    async execute(message, args, db, bot) {
        const msg = await message.lineReply(`Pinging...`)
        msg.edit(`🏓 My ping is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API latency is \`${bot.ws.ping}ms\`.`)
        setTimeout(() => { if(message.deleted === false) { message.delete() } if(msg.deleted === false) { msg.delete() } }, 10 * 1000)
    }
}