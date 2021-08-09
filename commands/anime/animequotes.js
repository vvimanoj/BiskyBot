const aniquote = require('aniquotes-npm');
const { searchAnime } = require('node-kitsu')
module.exports = {
    name: 'quotes',
    aliases: ['aquote'],
    description: 'Sends a random anime quote.',
    guildOnly: true,
    help: true,
    cooldown: 10,
    async execute(message, args, client, Discord){
        let quotes = aniquote.randomQuote();
        const { anime, name, quote} = quotes;
        const res = await searchAnime(anime,0).catch(()=>{}) || [];
        const image = res?.[0]?.attributes?.coverImage?.original || null;
        const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle(`From ${anime}`)
        .setDescription(`${quote} \n\n-${name}`)
        .setFooter(`Made with ❤️`)
        .setTimestamp()
        if(image !== null) embed.setImage(image);
        message.lineReply(embed)
        // console.log(quotes)
    }
}