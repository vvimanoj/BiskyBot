const Canvacord = require('canvacord')
module.exports = {
    name: 'clyde',
    description: 'clyde replies',
    usage: '[message]',
    example: 'GoodBye World!',
    cooldown: 10,
    args: true,
    help: true,
    guildOnly: true,
    async execute(message, args, client, Discord){
        let msg = args.join(" ")
        const image = await Canvacord.Canvacord.clyde(msg)
        .catch(console.error);   
        message.lineReplyNoMention(new Discord.MessageAttachment(image, "image.png"))
    }
}