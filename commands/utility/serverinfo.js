const Discord = require('discord.js')
const moment = require('moment')

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = {
    name: 'serverinfo',
    description: `Get server information`,
    usage: null,
    guildOnly: true,
    help: true,
    cooldown: 7,
    
    execute(message){
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
        const ctime = `${moment(message.guild.createdTimestamp).format('LL')}`//${moment(message.guild.createdTimestamp).fromNow()}`

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Info for ${message.guild.name}`)
        .setFooter(`ID: ${message.guild.id} | Created: ${ctime}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
    //  True only fields
        .addField('Owner', `<:server_owner:869873680304459836> ${message.guild.owner.user.tag}`, true)
        .addField('Region', `${regions[message.guild.region]}`, true)
        .addField('Verification Level',`${verificationLevels[message.guild.verificationLevel]}`)
        .addField('Explicit Filter',`${filterLevels[message.guild.explicitContentFilter]}`,true)
        // Conditional fields
        const data = []
        const boostTier = `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`
        if(message.guild.premiumSubscriptionCount !== 0) { embed.addField('Boosts', `${message.guild.premiumSubscriptionCount}`)}
        if(message.guild.premiumSubscriptionCount !== 0) {embed.addField('Boost Tier', `${boostTier}`)}
        if(roles.length !== 0) {embed.addField('Roles', `${roles.length}`)}
        embed.addField('Channels',`Text:  ${channels.filter(channel => channel.type === 'text').size}\nVoice: ${channels.filter(channel => channel.type === 'voice').size}`,)// true)
        embed.addField('Members',`Total: ${message.guild.memberCount}\nHumans: ${members.filter(member => !member.user.bot).size}\nBots: ${members.filter(member => member.user.bot).size}`, true)
        embed.addField('Presence',`Online: ${members.filter(member => member.presence.status === 'online').size}\nIdle: ${members.filter(member => member.presence.status === 'idle').size}\nDo not disturb: ${members.filter(member => member.presence.status === 'dnd').size}`, true)
        if(emojis.filter(emoji => !emoji.animated).size !== 0) {data.push(`Regular: ${emojis.filter(emoji => !emoji.animated).size}`)}
        if(emojis.filter(emoji => emoji.animated).size !== 0) {data.push(`Animated: ${emojis.filter(emoji => emoji.animated).size}`)}
        if(emojis.size !== 0) { embed.addField('Emojis', `
        Total: ${emojis.size}\n${data[0]}\n${data[1]}`, true)}

        message.channel.send(embed)
    }
}