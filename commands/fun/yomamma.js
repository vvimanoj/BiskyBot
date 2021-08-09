const yomamma = require('yo-mamma').default;

module.exports = {
    name: 'yomama',
    aliases: ['yomama', 'mamajoke'],
    description: 'tells a random yo-mamma joke.',
    help: true, 
    guildOnly: true,
    cooldown: 10,
    execute(message, args, client, Discord){
        let insult = yomamma()
        const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Yo-mama joke`)
        .setDescription(insult)
        .setFooter(`👀`)
        .setTimestamp()
        message.lineReply(embed)
    }
}