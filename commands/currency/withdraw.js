const profileModel = require('../../models/profileSchema')
module.exports = {
    name: 'withdraw',
    description: 'Withdraw cash to bank',
    aliases: ['with'],
    cooldown: 5,
    // usage: '[user]',
    // example: '@Draken',
    args: true,
    guildOnly: true,
    help: true,
    async execute(message, args, client, Discord, profileData){
        let amount = args[0];
        if(amount === 'all' || amount === 'max'){
            amount = profileData.bank
        }else if(amount === String) return message.lineReply(`That's not even a valid number, you blockhead!`)
        if (amount < 0 || amount % 1 != 0 ) {
            message.lineReply("Withdraw amount must be a positive number or use \`all/max\`");
            return }
        try {
            if (amount > profileData.bank) return message.lineReply(`You don't have that many coins to withdraw, do you plan to get money that you don\'t have!?`);
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: amount,
                bank: -amount,
              },
            }
          );
    
          return message.lineReply(`Successfully, withdrawn **${amount} coins** from your bank`);
        } catch (err) {
          console.log(err);
        }
    }
}