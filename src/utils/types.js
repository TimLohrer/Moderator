module.exports = {}

/**
 * @typedef Command
 * @type {object}
 * @property {string} name
 * @property {string[]} aliases
 * @property {string} category
 * @property {string} description
 * @property {string} usage
 * @property {string} example
 * @property {number} cooldown
 * @property {number} minArgs
 * @property {number} maxArgs
 * @property {import('discord.js').PermissionString[]} permissions
 * @property {execute} execute
 */

/**
 * @callback execute
 * @param {param}
 */

/**
 * @typedef db
 * @type {object}
 * @property {number} [antispam]
 * @property {string} [autorole]
 * @property {number[]} disabled
 * @property {string} [logs]
 * @property {string} [membercount]
 * @property {string} owner
 * @property {string} prefix
 * @property {boolean} premium
 * @property {object} welcome
 * @property {string} [welcome.channel]
 * @property {boolean} welcome.ifembed
 * @property {string} [welcome.msg]
 * @property {object} welcome.embed
 * @property {string} [welcome.embed.color]
 * @property {string} [welcome.embed.description]
 * @property {string} [welcome.embed.footer]
 * @property {string} [welcome.embed.title]
 */

/**
 * @typedef param
 * @type {object}
 * @property {import('discord.js').Message} message
 * @property {string[]} args
 * @property {db} db
 * @property {import('./Moderator')} bot
 * @property {string} [command]
 */