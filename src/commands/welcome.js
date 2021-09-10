//ts-check
/**
 * @type {import('../utils/types').Command}
 */
 module.exports = {
    name: "welcome",
    aliases: [],
    category: "UTILITY",
    description: "Get information about you welcome message and lets you change the welcome channel.",
    usage: "{#channel / channel name / channel-ID / none}",
    example: "#welcome",
    cooldown: 60,
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    async execute({message, args, db, bot}) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[0]) || message.guild.channels.cache.get(args[0])
        if (db.welcome.channel !== null && args[0] && args[0] !== 'none') {
            if (!channel) { return bot.error(`Could not find the channel \`${args[0].toString()}\`!`, message) }
            const old_channel = db.welcome.channel
            await firebase.collection('guilds').doc(message.guild.id).update({ welcome: { channel: channel.id }})
            bot.done(`Changed welcome-channel from <#${old_channel}> to ${channel.id} \n\nIf you want to change the welcome **message**, check our [Web-Dashboard](${process.env.DASHBOARD})`, message)
            return bot.logs(`Changed welcome-channel from <#${old_channel}> to ${channel.id}!`, message)
        } else if (db.welcome.channel !== null && !args[0]) {
            const embed = new bot.embed()
            .setTitle('Welcome message')
            .setDescription(`Welcome channel: <#${db.welcome.channel}> \n\nWelcome message: \`\`\`${db.welcome.ifembed === false && db.welcome.msg !== null ? db.welcome.msg : `Your welcome message is an embed or empty. Please checkout my Web-Dashboard to preview / chnage your welcome message!`}\`\`\` \n\nTo chnage your welcome message, checkout my **[Web-Dashboard](${process.env.DASHBOARD})**!`)
            .setColor("ORANGE")
            return bot.reply(embed, message, 60)
        } else if (db.welcome.channel !== null && args[0] === 'none') {
            await firebase.collection('guilds').doc(message.guild.id).update({ welcome: { channel: null }})
            bot.done(`Disabled welcome-messages!`, message)
            return bot.logs(`Disabled welcome-messages!`, message)
        }
    }
}