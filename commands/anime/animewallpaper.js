const animewall = require('anime-wallpapers');

module.exports = {
    name: 'aniwall',
    description: 'Sends an anime wallpaper',
    usage: '[name]',
    example: 'deathnote',
    help: true,
    guildOnly: true,
    args: true,
    async execute(message, args, client, Discord){
        
        const wall = new animewall.AnimeWallpaper();
        const search = args[0];
        const wallpaper = await wall.getAnimeWall2(search)
        const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`${wallpaper[0].title}`)
        .setURL(`${wallpaper[0].image}`)
        .setImage(`${wallpaper[0].image}`)
        .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}