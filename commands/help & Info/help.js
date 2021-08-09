const { prefix } = require('../../config.json');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List of commands and assistance',
    usage: '[command name]',
    example: 'wasted',
    help: true,
    guildOnly: true,
    cooldown: 5,
    execute(message, args , client, Discord){
        const data = [];
        const { commands } = message.client;
        if(!args.length){
            let categories = [];
            fs.readdirSync("./commands/").forEach((dir) => {
                const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
                );
        
                const cmds = commands.map((command) => {
                  let file = require(`../../commands/${dir}/${command}`);
        
                  if (!file.name) return "No command name.";
        
                  let name = file.name.replace(".js", "")//.split(', ', file.name.length - 1)
        
                  return `\`${name}\``;
                });
        
                let data = new Object();
        
                data = {
                  name: dir.charAt(0).toUpperCase() + dir.substr(1).toLowerCase(),
                  value: cmds.length === 0 ? "In progress." : cmds.join(", "),
                };
        
                categories.push(data);
            });
            const embed = new Discord.MessageEmbed()
            .setTitle("📬 Need help? Here are all of my commands:")
            .addFields(categories)
            .setDescription(
              `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help gay\`.`
            )
            .setFooter(
              `Requested by ${message.author.tag}`,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()
            .setColor('FF6BC1');
            return message.channel.send(embed);
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return message.lineReply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if(command.cooldown) data.push(`**Cooldown:** ${command.cooldown} seconds`);
        
        if (command.usage){ if(command.usage !== null) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)}
        else { data.push(`**Usage:** ${prefix}${command.name}`) }
        if(command.example) data.push(`**Example:** ${prefix}${command.name} ${command.example}`)
            const embed = new Discord.MessageEmbed()
            .setColor('#ee2a64')
            .setTitle(`${command.name.charAt(0).toUpperCase() + command.name.substr(1).toLowerCase()}`)
            .setDescription(data)
            // console.log()
            if(command.note){ embed.setFooter(`Note: ${command.note}`)}//, `${message.author.displayAvatarURL()}`)}
            if(command.help) {return message.lineReplyNoMention(embed)} else {return};
        }
    }
}