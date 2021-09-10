/**
 * @type {import('../utils/types').Command}
*/
const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = async function autorole (member, bot, db) {
    if (db.autorole !== null) {
        if (member.guild.roles.cache.get(db.autorole) !== undefined) {
            const username = process.env.NAME
            if (member.guild.roles.cache.get(db.autorole).position > member.guild.roles.cache.find(role => role.name === username).position) {
                const oldRoleID = db.autorole
                await firebase.collection('guilds').doc(member.guild.id).update({ autorole: null })
                const embed = new MessageEmbed()
                .setDescription(`${member.guild.roles.everyone} \nI can't add the <@&${oldRoleID}> role to new users, because my role is not positioned above <@&${oldRoleID}>. \nMake sure to **change this** in your **server settings**! \nBecause of this, the autorole feature was temporary disabled. \nPlease use \`${db.prefix}help autorole\` to get more information on how to set it up again!`)
                .setFooter(`Info from @Moderator`)
                .setColor(red)
                .setTimestamp()
                const channel = member.guild.channels.cache.get(db.logs) || member.guild.owner
                return channel.send({embeds: [embed]})
            } else {
                member.roles.add(member.guild.roles.cache.get(db.autorole).id)
            }
        } else {
            await firebase.collection('guilds').doc(member.guild.id).update({ autorole: null })
            const embed = new MessageEmbed()
            .setDescription(`${member.guild.roles.everyone} \nThe autorole \`@deleted-role\` was deleted and no longer works! \nBecause of this, the autorole feature was temporary disabled. \nPlease use \`${db.prefix}help autorole\` to get more information on how to set it up again!`)
            .setFooter(`Info from @Moderator`)
            .setColor(red)
            .setTimestamp()
            const channel = member.guild.channels.cache.get(db.logs) || member.guild.owner
            return channel.send({embeds: [embed]})
        }
    }
}