module.exports = {
    name: 'loverate',
    description: 'Check love between you and someone',
    aliases: ['lovecalc', 'lover8'],
    usage: '[user]',
    example: '@Biscuit',
    cooldown: 10,
    help: true,
    args: true,
    guildOnly: true,
    execute(message, args, client, Discord){
        let person;
        if(!message.mentions.members){
            person = message.mentions.members.first(message, args[0]).username;
        }else person = args.join(' ');

        const love = Math.round(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "🖤".repeat(10 - loveIndex);
        
        let loveEmbed = new Discord.MessageEmbed()
        .setTitle("Love Percentage")
        .setDescription(`Checking love between....\n${message.author.username} and ${person}\n\n\n`)
        .setFooter(`${loveLevel} ${love}%`)
        message.channel.send(loveEmbed)
    }
}
