const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const fetch = require('node-fetch');

module.exports = {
    name: 'horoscope',
    description: 'Get your today\'s horoscope.',
    usage: '[sign]',
    example: 'libra',
    async execute(message, args, client, Discord){
        const sign = args[0]
        if (!signs.includes(sign.toLowerCase())){
            return message.lineReply(`**${sign}** is not a valid sign!`);
          };
      
          const data = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
          .then(res => res.json())
          .catch(() => null);
      
          if (!data){
            return message.lineReply(`Server is currently down for this command!`);
          };
          return message.lineReply(
            new Discord.MessageEmbed()
            .setColor('GREY')
            .setFooter(`Today's horoscope for ${sign}`)
            .setTimestamp()
            .setAuthor(data.sunsign || sign)
            .setDescription(data.horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', ''))
            .addFields([
              { name: 'Mood', inline: true, value: data.meta.mood || '\u200b' },
              { name: 'Intensity', inline: true, value: data.meta.intensity || '\u200b' },
              { name: 'Keywords', inline: true, value: data.meta.keywords || '\u200b' }
            ])
          );
    }
}