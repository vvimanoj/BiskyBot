const Discord = require('discord.js')
module.exports = {
    name: 'clearchannel',
    description:'Clear all the messages in a channel.',
    aliases: ['cc', 'wash'],
    guildOnly: true,
    permissions: 'MANAGE_GUILD',
    cooldown: 60,
    help: true,
    note: 'msgs older than 14d will not be deleted!',
    execute(message){
        async function wipe() {
            var msg_size = 100;
            while (msg_size == 100) {
                await message.channel.bulkDelete(100)
            .then(messages => msg_size = messages.size)
            .catch(console.error);
            }
            const embed = new Discord.MessageEmbed()
            .setColor('ee2a64')
            .setTitle('Operation successful')
            .setDescription(`<a:ts_stars:867012480622788618> Deleted all the messages in this channel. <a:ts_stars:867012480622788618>`)
            .setThumbnail(`https://media.discordapp.net/attachments/867028007927414804/869934194099363860/output-onlinegiftools.gif`)
            .setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
            .setTimestamp()
            message.channel.send(embed)
            .then(msg => {
                setTimeout(() => msg.delete(), 10000)
            })
        }
        wipe()
    }

}