const Discord =  require('discord.js')

module.exports = {
    name: 'invite',
    description: 'Bot\'s invite link',
    cooldown: '5',
    guildOnly: true,
    help: true,
    execute(message){
        const embed = new Discord.MessageEmbed()
        .setColor('ee2a64')
        .setTitle('Helpful Links')
        .setDescription(`[Invite me!](https://discord.com/oauth2/authorize?client_id=861852398393360384&scope=bot&permissions=939532350)`)
        .setTimestamp()
        message.channel.send(embed)
    }
}