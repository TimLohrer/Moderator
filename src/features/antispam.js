module.exports = async function antispam(message, bot, db) {
    const userMap = bot.antispam
    const antispam = db.antispam.toString().split('')
    // mode, punishment time, msgs, max allowed diff
    if (userMap.has(message.author.id)) {
        const data = userMap.get(message.author.id)
        const { lastMsg, timer } = data;
        const diff = message.createdTimestamp - lastMsg.createdTimestamp;
        let msgs = data.msgs
        if (diff > parseInt(antispam[3]) * 1000) {
            clearTimeout(timer)
            data.msgs = 1;
            data.lastMsg = message;
            data.timer = setTimeout(() => {
                userMap.delete(message.author.id)
            }, 5000)
            userMap.set(message.author.id, data)
        } else {
            message.delete()
            msgs++;
            if (parseInt(msgs) === parseInt(antispam[2])) {
                
                if (antispam[0] === '2') {
                    console.log(`${message.author.tag} spammed`)
                }
            } else {
                data.msgs = msgs;
                userMap.set(message.author.id, data)
            }
        }
    } else {
        let remove = setTimeout(() => { userMap.delete(message.author.id) }, 5000)
        userMap.set(message.author.id, {
            msgs: 1,
            lastMsg: message,
            timer: remove
        })
    }
}