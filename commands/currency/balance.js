// const Discord = require('discord.js')
module.exports = {
    name: 'balance',
    description: 'Check balance',
    aliases: ['bal'],
    cooldown: 5,
    // usage: '[user]',
    // example: '@Draken',
    guildOnly: true,
    help: true,
    async execute(message, args, client, Discord, profileData){
        const user = message.mentions.users.first() || message.author;
        const coins = await profileData.coins
        if(user === null ) return
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s Balance`)
        .setDescription(`Wallet: ${coins}\nBank: ${profileData.bank}`)
        .setTimestamp()
        message.lineReplyNoMention(embed)
    }
}
