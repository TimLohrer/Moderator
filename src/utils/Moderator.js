//ts-check
const { Client, MessageEmbed, Collection } = require('discord.js')

class Moderator extends Client {
    /**
     * @param {import('discord.js').ClientOptions} options 
     */
    constructor (options) {
        super (options)
        this.get_db = require('../functions/get_db')
        this.log = require('../functions/log')
        this.logs = require('../functions/logs')
        this.send = require('../functions/send')
        this.reply = require('../functions/reply')
        this.error = require('../functions/error')
        this.done = require('../functions/done')
        this.info = require('../functions/info')
        this.warn = require('../punishments/warn')
        this.ms = require('../functions/ms')
        this.embed = MessageEmbed
        this.emoji = require('../data/emojis.json')
        this.colors = require('../data/colors.json')
        this.blacklist = require('../data/blacklist.json')
        this.cooldowns = new Map()
        this.antispam = new Collection()
        this.events = new Collection()
        this.slashCommands = new Collection()
        this.commands = new Collection()
        this.aliases = new Collection()
        this.devs = process.env.DEVS.split(',')
    }
}

module.exports = Moderator;