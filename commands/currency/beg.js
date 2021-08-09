const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'beg',
    description: 'begging for coins',
    cooldown: 30,
    guildOnly: true,
    help: true,
    async execute(message, args, client, Discord, profileData){
        const randomNumber = Math.floor(Math.random() * 400) +1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: randomNumber,
            }
        })
        const embed = new Discord.MessageEmbed()
        .setColor('#FF6BC1')
        .setTitle(`${message.author.username}`)
        .setDescription(`You begged and got a total of **${randomNumber} coins**`)
        return message.lineReply(embed)
    }
}