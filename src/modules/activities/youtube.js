module.exports = {
    name: "youtube",
    description: "",
    async execute({message, args, db, bot}) {
        const channel = message.member.voice.channel
        if (!channel) { return bot.error(`You have to be in a voice channel to run this command!`, message)}
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_users: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.TOKEN}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
            if (!invite.code) { return bot.error(`Something went wrong!`, message) }
            const embed = new MessageEmbed()
            .setDescription(`**[Youtube togeather - *${channel.name}*](https://discord.com/invite/${invite.code})**`)
            .setColor('ORANGE')
            bot.reply(embed, message)
        })
    }
}