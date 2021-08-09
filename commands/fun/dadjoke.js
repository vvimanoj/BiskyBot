const DadJoke = require('dadjokes-wrapper');

module.exports = {
    name: 'dadjoke',
    description: 'tells a random dad joke.',
    help: true,
    guildOnly: true,
    cooldown: 10,
    execute(message, args, client, Discord){
        const dj = new DadJoke();
        let joke = dj.randomJoke().then((res) => {
                const embed = new Discord.MessageEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`For ${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true })}`)
                .setDescription(res)
                message.lineReply(embed)
                // console.log(res)
        })

    }
}