module.exports = {
    name: "clear",
    aliases: ["clear", "clean", "c"],
    category: "utility",
    description: "Clears a specific ammount of messages in a channel.",
    usage: "clear {ammount} {channel}",
    example: "clear 10 #general",
    minArgs: 1,
    maxArgs: 2,
    permissions: ["MANAGE_MESSAGES"],
    async execute(message, args, db, bot) {
        let ammount = parseInt(args[0])
        if (ammount === NaN) { return bot.error(`\`${args[0]}\` is not a valid number!`, message) }
        if (ammount > 99) { return bot.error(`The ammount has to be lower than \`99\`!`) }
        let channel
        let amnt
        if (args[1] && message.mentions.channels.first()) {
            channel = message.mentions.channels.first()
            amnt = await channel.bulkDelete(ammount, false)
        } else {
            channel = message.channel
            ammount++
            amnt = await channel.bulkDelete(ammount, false)
            ammount -= 1
        }
        bot.done(`Deleted \`${amnt.size}\` messages.`, message, 5)
        bot.logs(`Deleted \`${amnt.size}\` messages in <#${channel.id}>.`, message)
    }
}