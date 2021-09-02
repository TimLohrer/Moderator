const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = async function warn(target, reason = "No reason provided.", message, bot, database, mod = bot.user) {
    if (!target) { return bot.log('Missing target object!', '[src/features/warn.js]', 'ERROR') }
    if (!message) { return bot.log('Missing message object!', '[src/features/warn.js]', 'ERROR') }
    let data = await firebase.collection('users').doc(target.id).get() || null
    let db = data.data() || null
    const msg = { author: { tag: mod.tag }, guild: message.guild }
    bot.logs(`<@${target.id}> got warned for \`${reason}\``, msg)
    if (!db || db == null) {
        console.log("1");
        await firebase.collection('users').doc(target.id).set({
            first: { reason: reason, mod: mod.tag },
            warns: 1,
        })
    } else {
        if (!db.seccond) {
            await firebase.collection('users').doc(target.id).update({
                seccond: { reason: reason, mod: mod.tag },
                warns: 2
            })
        } else {
            await firebase.collection('users').doc(target.id).update({
                third: { reason: reason, mod: mod.tag },
                warns: 3
            })
            if (database.logs !== null) {
                const embed = new bot.embed()
                .setTitle(`Banned ${target.user.tag}`)
                .setDescription(`<@${target.id}> was banned from this server because he reached \`3\` warns! \n\n\`Warn 1:\`\n\`\`\`Reason: ${db.first.reason}\`\`\` \n\`\`\`By: ${db.first.mod}\`\`\`\n\n\`Warn 2:\`\n\`\`\`Reason: ${db.first.reason}\`\`\` \n\`\`\`By: ${db.first.mod}\`\`\`\n\n\`Warn 3:\`\n\`\`\`Reason: ${db.first.reason}\`\`\` \n\`\`\`By: ${db.first.mod}\`\`\``)
                message.guild.channels.cache.get(database.logs.split('‎')[0]).send({embeds: [embed]})
            }
            if (!target.bot && !target.permissions.has('ADMINISTRATOR')) { await target.send(`You have been banned from the **${message.guild.name}** server, because you reached \`3\` warns!`) }
            await target.ban({ days: 7, reason: 'Reaching 3 warns.' })
            await firebase.collection('users').doc(target.id).delete()
        }
    }
    
}