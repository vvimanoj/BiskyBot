const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'urban',
    description: 'Search something on urban.',
    cooldown: 10,
    args: true,
    aliases: ['define'],
    usage: '[text]',
    example: 'konichiwa',
    guildOnly: true,
    help: true,
    async execute(message, args){
        let query = args.join(' ');
        query = encodeURIComponent(query)
        const { 
            data: {list},
        } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`);
        const [ans] = list;
        if(ans == undefined){
            message.lineReply(`There's nothing much to tell about \`${query}\``)
        }else {
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(ans.word)
            .setURL(ans.permalink)
            .setThumbnail(`https://whohaha.com/app/uploads/2017/08/Urban-Dictionary-logo-300x141.png`)
            .addField('Definition', trim(ans.definition))
            .addField('Example', trim(ans.example))
            .addField('Ratings', `${ans.thumbs_up}👍/${ans.thumbs_down}👎`)
            message.channel.send(embed)

        }
    }
}
function trim(input){
    return input.length > 1024 ? `${input.slice(0, 1020)}...` : input;
}