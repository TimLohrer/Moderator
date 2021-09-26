//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "clear",
    aliases: ["clear", "clean", "c", "purge"],
    category: "UTILITY",
    description: "Clears a specific ammount of messages in a channel.",
    usage: "{ammount} {channel}",
    example: "10 #general",
    cooldown: 10,
    minArgs: 1,
    maxArgs: 2,
    permissions: ["MANAGE_MESSAGES"],
    async execute({message, args, db, bot}) {
        let ammount = parseInt(args[0])
        if (ammount === NaN) { return bot.error(`\`${args[0]}\` is not a valid number!`, message) }
        if (ammount < 1) { return bot.error(`The ammount has to be higher than \`0\`!`, message) }
        if (ammount > 99) { return bot.error(`The ammount has to be lower than \`99\`!`, message) }
        const target = message.mentions.channels.first() || message.mentions.users.first()
        const channel = message.channel
        const messages = channel.messages.fetch()
        if (target) {
            const target_msgs = (await messages).filter(m => m.author.id === target.id)
            await channel.bulkDelete(target_msgs, true)
            bot.done(`Deleted \`${target_msgs}\` messages ${target.type ? `in ${target}` : `send by ${target}`}.`, message)
            return bot.logs(`Deleted \`${target_msgs}\` messages ${target.type ? `in ${target}` : `send by ${target}`}.`, message)
        } else {
            channel.bulkDelete(ammount++, true)
            ammount -= 1
            bot.done(`Deleted \`${ammount}\` messages.`, message)
            return bot.logs(`Deleted \`${ammount}\` messages in ${channel}.`, message)
        }
    }
}