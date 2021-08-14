module.exports = {
    name: 'messageDelete',
    execute(message, args, client, Discord){
        const snipes = message.client.snipes.get(message.channel.id) || [];
        snipes.unshift({
          content: message.content,
          author: message.author,
          image: message.attachments.first() ? message.attachments.first().proxyURL : null,
          date: new Date().toLocaleString("en-GB", {
            dataStyle: "full",
            timeStyle: "long",
          }),
        });
        snipes.splice(10);
        message.client.snipes.set(message.channel.id, snipes);
    }
}
