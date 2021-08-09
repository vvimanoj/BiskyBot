const Discord = require('discord.js');
require('discord-reply')
const client = new Discord.Client()
const fs = require('fs')
const mongoose = require('mongoose')
const { prefix, token, mongodb } = require('./config.json');
const profileModel = require('./models/profileSchema')

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection()

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', async (message) =>{
	if(message.content == '<@861852398393360384>' || message.content == '<@!861852398393360384>'){
		const embed2 = new Discord.MessageEmbed()
		.setTitle('Biscuit')
		.setDescription(`Hello! ${message.author.username}\nMy current prefix is \`fly \`.\n\`fly help\` For all my commands.`)
		.setTimestamp()
		.setFooter(`Thanks!`,`${message.author.displayAvatarURL()}`)
		message.lineReply(embed2)
	}
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

	    const args = message.content.slice(prefix.length).trim().split(/ +/);
	    const commandName = args.shift().toLowerCase();
	
	    const command = client.commands.get(commandName)
	    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	    if (!command) return;

	    if (command.guildOnly && message.channel.type === 'dm') {
		    return message.lineReply('I can\'t execute that command inside DMs!');
	    }
		
		let profileData;
		try{
			const user = message.mentions.users.first() || message.author;
			profileData = await profileModel.findOne({ userID: user.id })
			if(!profileData){
				const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`Hey! ${message.author.username}`)
				.setDescription(`Welcome to the currency commands of Biscuit. We have a ton of currency based commands for you to enjoy playing with and I've already registered your profile.\n\nYou can check your balance using \`Fly bal\`command and try out the other cool stuff on our bot.`)
				.addField('Getting started!', `\nI've enabled every economy command for you and provided __**500**__ coins for you to play around with.`, true)
				.addField('More Info', `\`Fly help\`\nUse this command for further assistance.`, true)
				.addField('Help', `You can get help anytime by using \`Fly help\` any time when you stuck at something in our bot.\nAlso \`Fly help [command name]\` to get info on a specific command!`)
				.setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
				.setTimestamp()
				const userdata = await profileModel.findOne({ userID: message.author.id })
				if(!userdata) {message.author.send(embed)
					.catch(error => {
				  		message.lineReply(embed);
					});
				}
				let profile = await profileModel.create({
					userID: message.author.id,
					serverID: message.guild.id,
					coins: 500,
					bank: 0
				});
				profile.save();
			}
		}catch(err){
			console.log(err)
		}

		const ownerID = '579988574221631511' 
		const karanID = '790483289068404761'
		if (message.author.id !== ownerID){//|| message.author.id !== karanID) {
			if (command.ownerOnly) {
				return message.lineReply('This command is available only for developers!')
			}
		}
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.lineReply(`You do not have enough permissions \(\`${command.permissions.charAt(0).toUpperCase() + command.permissions.substr(1).toLowerCase()}\`\) to use this command!`);
			}
		}
	    if (command.args && !args.length) {
			const data = [];
			
			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if(command.cooldown) data.push(`**Cooldown:** ${command.cooldown} seconds`); // || 3 was there, [${command.cooldown || 3}]
			
			if (command.usage){ if(command.usage !== null) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)}
			else { data.push(`**Usage:** ${prefix}${command.name}`) }
			if(command.example) data.push(`**Example:** ${prefix}${command.name} ${command.example}`)
			const embed = new Discord.MessageEmbed()
			.setColor('#ee2a64')
			.setTitle(`Command: ${command.name}`)
			.setDescription(data)
			
		if (command.usage) {
			const data = [];
			
			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if(command.cooldown) data.push(`**Cooldown:** ${command.cooldown} seconds`); // || 3 was there, [${command.cooldown || 3}]
			
			if (command.usage){ if(command.usage !== null) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)}
			else { data.push(`**Usage:** ${prefix}${command.name}`) }
			if(command.example) data.push(`**Example:** ${prefix}${command.name} ${command.example}`)
			const embed = new Discord.MessageEmbed()
			.setColor('#ee2a64')
			.setTitle(`Command: ${command.name}`)
			.setDescription(data)
		    }
	
		    return message.channel.send(embed);
		}
		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				const data = [];
				data.push(`Have break, have a cooldown!`)
				data.push(`You can use this again in **${timeLeft.toFixed(0)} seconds**`)
				if(command.cooldown >= 60) data.push(`The default cooldown is \`${command.cooldown / 60}m\``)
				if(command.cooldown < 60) data.push(`The default cooldown is \`${command.cooldown}s\``)
				const embed1 = new Discord.MessageEmbed()
				.setColor('#FF6BC1')
				.setTitle(`Hold your horses!`)
				.setDescription(data)
				if(command.note){ embed1.setFooter(`Note: ${command.note}`)}
				return message.lineReply(embed1);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	    try {
		    command.execute(message, args, client, Discord, profileData);
	    } catch (error) {
		    console.error(error);
		    message.reply('there was an error trying to execute that command!');
    	}
		// message.channel.send(`${client.ws.ping}`)
})
mongoose.connect(mongodb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => {
	console.log(`Connected bisky to mongodb`)
}).catch((err) => {
	console.log(err);
})

client.login(token)