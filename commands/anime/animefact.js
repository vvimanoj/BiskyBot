const AnimeFact = require('anime-facts')
const api = new AnimeFact('c7b0002634c7dd4503c40c0b84cc17d86fffed4daba7')

module.exports = {
  name: 'animefact',
  description: 'Sends a random fact about anime/manga.',
  aliases: ['anifact'],
  cooldown: 10,
  help: true,
  guildOnly: true,
  execute(message, args, client, Discord){
    api.getFact().then((facts) => {
      const { fact } = facts
      const { tag } = facts
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`<a:ts_excla:869083625533108274> Did you know?`)
      .setDescription(`<a:ts_arrow:867012432659873822> ${fact}`)
      .setFooter(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true})}`)
      .setTimestamp()
      message.lineReply(embed)
      // console.log()

    })
  }
}