const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'deposit',
    description: 'Deposit cash to bank',
    aliases: ['dep'],
    cooldown: 5,
    // usage: '[user]',
    // example: '@Draken',
    args: true,
    guildOnly: true,
    help: true,
    async execute(message, args, client, Discord, profileData){
        let amount = args[0];
        if(amount === 'all' || amount === 'max'){
            amount = profileData.coins
        }else if(amount === String) return message.lineReply(`That's not even a valid number, you blockhead!`)
        if (amount < 0 || amount % 1 != 0 ) {
            message.lineReply("Deposit amount must be a positive number or use \`all/max\`");
            return }
        try {
            if (amount > profileData.coins) return message.lineReply(`You don't have that many coins to deposit, dont try to break me!`);
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: -amount,
                bank: amount,
              },
            }
          );
    
          return message.lineReply(`Successfully, deposited **${amount} coins** into your bank`);
        } catch (err) {
          console.log(err);
        }
    }
}