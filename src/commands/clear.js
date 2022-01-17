//ts-check
const emoji = require('../data/emojis.json')
const { green } = require('../data/colors.json')
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "clear",
    aliases: ["clear", "clean", "c", "purge"],
    category: "UTILITY",
    description: "Clears a specific ammount of messages in a channel.",
    usage: "{ammount} [channel | member]",
    example: "10 #general",
    cooldown: 10,
    maxArgs: 2,
    permissions: ["MANAGE_MESSAGES"],
    async execute({message, args, db, bot}) {
        let ammount = parseInt(args[0]) || 100
        let target = message.mentions.users.first()
        let channel = message.mentions.channels.first()
        if (ammount < 1) { return bot.error(`The ammount has to be higher than \`0\`!`, message) }
        if (ammount > 100) { return bot.error(`The max ammount is \`100\`!`, message) }
        message.deletable ? await message.delete() : null
        if (target) {
            const msgs = (await message.channel.messages.fetch()).filter(m => m.author.id == target.id)
            let { size } = msgs;
            msgs.forEach(msg => { msg.delete() })
            const embed = new bot.embed()
            .setTitle('Done')
            .setDescription(`${emoji.check} Deleted ${size} messages in ${message.channel} from ${target}!`)
            .setColor(green)
            bot.send({embeds: [embed]}, message.channel, 10)
            return bot.logs(`Deleted ${size} messages in ${channel} from ${target}!`, message)
        } else if (channel) {
            let { size } = await channel.bulkDelete(ammount, true)
            const embed = new bot.embed()
            .setTitle('Done')
            .setDescription(`${emoji.check} Deleted ${size} messages in ${channel}!`)
            .setColor(green)
            bot.send({embeds: [embed]}, message.channel, 10)
            return bot.logs(`Deleted ${size} messages in ${channel}!`, message)
        } else {
            let { size } = await message.channel.bulkDelete(ammount, true)
            const embed = new bot.embed()
            .setTitle('Done')
            .setDescription(`${emoji.check} Deleted ${size} messages in ${message.channel}!`)
            .setColor(green)
            bot.send({embeds: [embed]}, message.channel, 10)
            return bot.logs(`Deleted ${size} messages in ${message.channel}!`, message)
        }
    }
}