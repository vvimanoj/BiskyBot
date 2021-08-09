const profileModel = require('../../models/profileSchema')
module.exports = {
  name: 'share',
  description: 'Share your coins with other players',
  aliases: ['give'],
  usage: '@user <amount>',
  example: '@Draken 500',
  help: true,
  guildOnly: true,
  args: true,
  async execute(message, args, client, Discord, profileData){
    let amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.lineReply("You have actually mention someone to give your coins to, bonehead");

    else if(amount === 'all' || amount === 'max'){
        amount = profileData.coins
    }else if(amount === String) return message.lineReply(`That's not even a valid number, you blockhead!`)
    if (amount < 0 || amount % 1 != 0 ) {
        message.lineReply("Sharing amount must be a positive number or use \`all/max\`");
        return }
    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.lineReply(`This user hasn't started the economy game yet!`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );
        await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -amount,
            }
        })
      return message.lineReply(`This player has been given their coins! ${amount} of coins!`);
    } catch (err) {
      console.log(err);
    }
  }
}