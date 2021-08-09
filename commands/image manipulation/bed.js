const Canvacord = require('canvacord')
module.exports = {
    name: 'bed',
    description: 'just the bed',
    cooldown: 10,
    usage: '[user]',
    example: '@Draken',
    note: 'This command may take time please have patience',
    guildOnly: true,
    args: true,
    help: true,
    async execute(message, args, client, Discord){
        const user = message.mentions.users.first() // || message.author;
        const member = message.guild.member(user)
        const avatar = user.displayAvatarURL({ format: 'png' })
        const image = await Canvacord.Canvacord.bed(message.author.displayAvatarURL({ format: 'png'}), avatar)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(image, "image.gif"))
    }
}