const malScraper = require('mal-scraper');
module.exports = {
    name: 'anime',
    description: 'Find an anime by name.',
    usage: '[anime name]',
    example: 'death note',
    guildOnly: true,
    help: true,
    cooldown: 5,
    args: true,
    execute(message, args, client, Discord){
        const name = args

        malScraper.getInfoFromName(`${name}`)
        .then((data) => {
            const { title } = data;
            const { synopsis } = data;
            const { url } = data;
            const { picture } = data;
            const { genres } = data;
            const { episodes } = data;
            const { aired } = data;
            const { score } = data;
            const { ranked } = data;
            const { popularity } = data;
            const { status } = data;
            const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${title}`)
            .setURL(`${url}`)
            .setDescription(synopsis.substr(0, synopsis.length - 24))
            .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTimestamp()
            .setThumbnail(picture)
            embed.addField('Ranked', `${ranked}`, true)
            embed.addField('Popularity', `${popularity}`, true)
            .addField('Episodes', `${episodes}`, true)
            embed.addField('Score', `${score}/10`, true)
            .addField('Genre', `${genres.join(', ')}`, true)
            .addField('Status', `${status}`, true)
            if(status === 'Finished Airing')embed.addField('Aired', `${aired}`, true)
            
            message.channel.send(embed)
        })
        .catch((err) => console.log(err))

        // same as
        // malScraper.getInfoFromName(name, true)
        // .then((data) => console.log(data))
        // .catch((err) => console.log(err))

        // malScraper.getInfoFromName(name, false)
        // .then((data) => console.log(data))
        // .catch((err) => console.log(err))

    }
}