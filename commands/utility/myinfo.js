const Discord = require('discord.js')
const moment = require('moment')
const flags = {
	DISCORD_EMPLOYEE: '<:discord_employee:869874837642944563> Discord Employee',
	DISCORD_PARTNER: '<:discord_partner:869876272606629908> Discord Partner',
	BUGHUNTER_LEVEL_1: '<:discord_bughunterlv1:869876273609080862> Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: '<:discord_bughunterlv2:869876273097347072> Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: '<:discord_hypesquad:869876271918751765> HypeSquad Events',
	HOUSE_BRAVERY: '<:discord_bravery:869876272363347968> House of Bravery',
	HOUSE_BRILLIANCE: '<:discord_brillance:869876273541959680> House of Brilliance',
	HOUSE_BALANCE: '<:discord_balance:869876272606642196> House of Balance',
	EARLY_SUPPORTER: '<:discord_earlysupporter:869876273202225192> Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System <:system_badge:869873617402486804>',
	VERIFIED_BOT: 'Verified Bot <:BotTag:869873549718982677>',
	VERIFIED_DEVELOPER: '<:discord_verifiedbotdeveloper:869880446907981874> Verified Bot Developer'
};

module.exports = {
    name: 'whois',
    description: `Get user information`,
    aliases: ['ui','about'],
    usage: '<user mention>',
    example: '@Draken',
    guildOnly: true,
    help: true,
    cooldown: 5,
    note: 'Ids/names/nicknames currently not working',
    execute(message, args){
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        const member = message.guild.member(user);
        const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
        let resRole;
        if(roles.length === 0){
            resRole = 'None'
        }else {resRole = `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`}
        const perms = member.permissions;
        const userPerms = perms.toArray();
        const userFlags = user.flags.toArray();
        let acknow;
        if(perms.has('ADMINISTRATOR') && message.guild.ownerID !== user.id){
            acknow = 'Server Admin'
        } else if(perms.has('MANAGE_GUILD') && message.guild.ownerID !== user.id){
            acknow = 'Sever Manager'
        } else if (message.guild.ownerID === user.id){
            acknow = 'Server Owner'
        } else {
            acknow = `None`
        }
        let userStatus = user.presence.status;
        let status;
        if(userStatus === 'dnd'){
            status = '<:discorddnd:869889687291035689> Do not disturb'
        } else if(userStatus === 'idle'){
            status = '<:discordidle:869889687886651462> Idle'
        } else if (userStatus === 'online'){
            status = '<:discordonline:869889687727243294> Online'
        } else {
            status = '<:discordoffline:869889687936978994> Offline'
        }
        let permissions = member.permissions.toArray().map(perm => {
            return perm
              .toLowerCase()
              .replace(/_/g, " ") // Replace all underscores with spaces
              .replace(/\w\S*/g, txt => {
                // Capitalize the first letter of each word
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        });
        let resultPerms = permissions.splice();
        const activity = user.presence.activities.find(activity => activity.type === 'PLAYING') || null;
        member.fetch()
        const embed = new Discord.MessageEmbed()
        .setColor(member.displayHexColor || '#ee2a64')
        .setThumbnail(user.displayAvatarURL({ dynamic: true}))
        // basic true only fields 
        .setAuthor(user.tag , user.displayAvatarURL({ dynamic: true }))
        .setDescription(user)
        .addField('Status', status, true)
        // .addField('Flags',`${userFlags.length ?  : 'None'}`, true)
        .addField('Registered on Discord', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm')} (UTC)`, true)
        .addField('Joined this server', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm')} (UTC)`, true)
        // .addField('Main Permissions', resultPerms)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()
        // Conditional Fields
        if(activity !== null){ embed.addField('Game', `${activity}`, true) }
        if(userFlags.length){ embed.addField('Badges', userFlags.map(flag => flags[flag]).join(', ')), true }
        if(member.nickname !== null){ embed.addField('Nickname', `${member.nickname}`, true) }
        if(roles.length){ embed.addField(`Roles [${roles.length}]`, resRole) }
        if(acknow !== 'None'){ embed.addField('Acknowledgements', acknow) }
        message.channel.send(embed)
        // console.log(resultPerms.join(', '))
    }
}