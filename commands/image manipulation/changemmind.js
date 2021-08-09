const Canvacord = require('canvacord')
module.exports = {
    name: 'changemymind',
    description: 'change your mind',
    cooldown: 10,
    usage: '[text]',
    example: 'i\'m a handsome boy',
    note: 'This command may take time please have patience',
    guildOnly: true,
    help: true,
    async execute(message, args, client, Discord){
        const text = args.join(" ");
        const image = await Canvacord.Canvacord.changemymind(`${text}`)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(image, "image.png"))
    }
}