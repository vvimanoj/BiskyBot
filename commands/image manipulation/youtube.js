const Discord = require('discord.js')
const Canvacord = require('canvacord')
module.exports = {
    name: 'youtube',
    description: 'youtube comment manipulation',
    aliases: ['ytr', 'yt', 'ytreply'],
    cooldown: 10,
    usage: '[user] [text]',
    example: '@Draken nice tik toks',
    note: 'This command may take time please have patience',
    guildOnly: true,
    args: true,
    help: true,
    async execute(message, args){
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user)
        const avatar = user.displayAvatarURL({ format: 'png' })
        let msg = args.splice(1).join(' ')
        const defaultimg = 'https://preview.redd.it/h68mdg17af661.png?width=250&format=png&auto=webp&s=bb3134dc9579554d2f38d20d927bf7ffe3cfe7c6'
        let options;
        if(!args[0].startsWith('<@')){
            options = {
                username: args[0],
                content: msg,
                avatar: defaultimg,
                dark: true
            }
        }else {
            options = {
                username: user.username,
                content: msg,
                avatar: avatar,
                dark: false
            }
        }
        const img = await Canvacord.Canvacord.youtube(options)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(img, "image.gif"))
    }
}