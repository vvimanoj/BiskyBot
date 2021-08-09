const Discord = require('discord.js')
module.exports = {
    name: 'avatar',
    description: 'Get user avatar/pfp',
    aliases: ['av','pfp'],
    cooldown: 5,
    usage: '[user]',
    example: '@Draken',
    guildOnly: true,
    help: true,
    execute(message){
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user)
        const embed = new Discord.MessageEmbed()
        .setColor(`${member.displayHexColor || '#FFB6C1'}`)
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        // .setTitle(user.tag)
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 512 })}`)
        message.channel.send(embed)
    }
}