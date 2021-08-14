module.exports = {
    name: "snipe",
    description: "Get the last deleted message of a channel.",
    help: true,
    guildOnly: true,
    cooldown: 5,
    execute(message, args, client, Discord){
        const snipes = client.snipes.get(message.channel.id) || [];
        const snipedmsg = snipes[args[0] - 1 || 0];
        if (!snipedmsg) return message.lineReply("There's nothing to snipe!");
        const Embed = new Discord.MessageEmbed()
            .setAuthor(snipedmsg.author.tag, snipedmsg.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor('FFB6C1')
            .setDescription(snipedmsg.content)
            .setFooter(`Sniped by ${message.author.username}`)
            .setTimestamp()
        if (snipedmsg.image) Embed.setImage(snipedmsg.image);
        message.channel.send(Embed);
    }
}