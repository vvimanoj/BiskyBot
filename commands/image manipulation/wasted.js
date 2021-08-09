const Discord = require('discord.js')
const Canvacord = require('canvacord')
module.exports = {
    name: 'wasted',
    description: 'waste a user',
    cooldown: 10,
    usage: '[user]',
    example: '@Draken',
    note: 'This command may take time please have patience',
    guildOnly: true,
    help: true,
    async execute(message){
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user)
        const avatar = user.displayAvatarURL({ format: 'png' })
        const image = await Canvacord.Canvacord.wasted(avatar)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(image, "image.png"))
    }
}