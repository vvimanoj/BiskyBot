const Discord = require('discord.js')
const Canvacord = require('canvacord')
module.exports = {
    name: 'ohno',
    description: 'Oh no!',
    cooldown: 10,
    usage: '[text]',
    example: 'jokers',
    note: 'This command may take time please have patience',
    guildOnly: true,
    args: true,
    help: true,
    async execute(message, args){
        // const user = message.mentions.users.first() || message.author;
        // const avatar = user.displayAvatarURL({ format: 'png' })
        // let msg = 'test'
        if(!args[0].startsWith('<@')){
            let msg = args.join(' ')
        }else {
            msg = message.mentions.users.first().tag
        }
        const image = await Canvacord.Canvacord.ohno(msg)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(image, "image.gif"))
    }
}