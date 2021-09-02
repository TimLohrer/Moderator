//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "clear",
    aliases: ["clear", "clean", "c"],
    category: "UTILITY",
    description: "Clears a specific ammount of messages in a channel.",
    usage: "{ammount} {channel}",
    example: "10 #general",
    cooldown: 10,
    minArgs: 1,
    maxArgs: 2,
    id: 2,
    permissions: ["MANAGE_MESSAGES"],
    async execute({message, args, db, bot}) {
        let ammount = parseInt(args[0])
        if (ammount === NaN) { return bot.error(`\`${args[0]}\` is not a valid number!`, message) }
        if (ammount < 1) { return bot.error(`The ammount has to be higher than \`0\`!`, message) }
        if (ammount > 99) { return bot.error(`The ammount has to be lower than \`99\`!`, message) }
        let channel
        if (args[1] && message.mentions.channels.first()) {
            channel = message.mentions.channels.first()
            try { await channel.bulkDelete(ammount, false).then(bot.done(`Deleted \`${ammount}\` messages in <#${channel.id}>.`, message, 5)) } catch { return bot.error(`You can only delete messages from the past 14 days!`, message) }
            bot.logs(`Deleted \`${ammount}\` messages in <#${channel.id}>.`, message)
        } else {
            channel = message.channel
            ammount++
            try { await channel.bulkDelete(ammount, false).then(bot.done(`Deleted \`${ammount -= 1}\` messages.`, message, 5)) } catch { return bot.error(`You can only delete messages from the past 14 days!`, message) }
            bot.logs(`Deleted \`${ammount}\` messages in <#${channel.id}>.`, message)
        }
    }
}