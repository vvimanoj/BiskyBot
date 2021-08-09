module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}\nBisky is ready to rock the world!`);
        client.user.setActivity('Fly help', {type: 'LISTENING'})    }
}