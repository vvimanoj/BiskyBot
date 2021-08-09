module.exports = {
    name: 'ping',
    description: 'is bot alive?',
    cooldown: 5,
    guildOnly: true,
    help: true,
    execute(message){
        message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp}ms\``);
    },
}