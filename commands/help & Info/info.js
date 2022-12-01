// const  Discord = require('discord.js')
const {MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json')
const moment = require('moment')
const os = require('os');
const ms = require('ms');

module.exports = {
    name: 'botinfo',
    description: `Get bot\'s information`,
    aliases: ['info'],
    guildOnly: true,
    help: true,
    cooldown: 5,
    execute(message){
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
        .setColor('#FFB6C1')
        .setAuthor(`Biscuit#4183`, `https://media.discordapp.net/attachments/867416153127518210/870327337500151838/1627572577432.png`)
        // .setTitle(`Biscuit's Info`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/861852398393360384/cbc8af7a1cdb6071b540066cdec59f8a.webp`)
        // .addField('Servers', client.guilds.cache.size.toLocaleString())
        // .addField('Users', `${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
        // .addField('Channels', this.client.channels.cache.size.toLocaleString())
        .addField('Creator', 'Arsène#9200', true)
        .addField('Created on', `6th July 2021`, true)
        .addField('Version', `v${version}`, true)
        .addField('Node.js', `${process.version}`,true)
        .addField('Library', 'Discord.js', true)
        .addField('Discord.js', [`v${djsversion}`], true)
        .addField(`\u200B` ,'**SYSTEM**')
        .addField('Platform', `${process.platform}`, true)
        .addField('Uptime', `${ms(os.uptime() * 1000, { long: true })}`, true)
        .addField(`CPU`, `**Cores**: \`${os.cpus().length}\`\n**Speed**: \`${core.speed}\`Mhz`, true)
        .addField('Helpful links', `[Invite Link!](https://discord.com/oauth2/authorize?client_id=861852398393360384&scope=bot&permissions=939532350)`)
        .setFooter(`ID: 861852398393360384`, `https://cdn.discordapp.com/avatars/861852398393360384/cbc8af7a1cdb6071b540066cdec59f8a.webp`)
        .setTimestamp()
        message.channel.send(embed)
    }
}