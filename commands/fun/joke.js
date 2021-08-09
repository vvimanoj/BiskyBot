const fetch = require('node-fetch');

module.exports = {
    name: 'joke',
    description: 'Tells a random joke.',
    cooldown: 5,
    help: true,
    guildOnly: true,
    async execute(message, args, client, Discord){
        const data = await fetch('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist')
        .then(res => res.json())
        .catch(() => null);
    
        if (!data){
          return message.channel.send(`Server Error is currently down!`);
        };
    
        return message.channel.send(
          new Discord.MessageEmbed()
          .setColor('GREY')
          .setAuthor(`${data.category} Joke`)
          .setFooter(`Made with 💖`)
          .setTimestamp()
          .setDescription(data.type === 'twopart' ? `${data.setup}\n\n||${data.delivery}||` : data.joke)
        );
    }
}