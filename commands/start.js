const ms = require('ms');
const config = require("../config.json");

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You need **Manage_Guild** permission or @Giveaways role to run this command!');
    }

    let giveawayChannel = message.mentions.channels.first();

    if(!giveawayChannel){
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to mention the channel first!\nExample: \`${config.prefix}start #Giveaway\``);
    }

    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to specify a valid duration!\nExample: \`${config.prefix}start #Giveaway 1h\``);
    }

    let giveawayNumberWinners = args[2];

    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to specify a valid number of winner(s)!\nExample: \`${config.prefix}start #Giveaway 1h 1\`\nDo not include \`w\` after the winner amount`);
    }

    let giveawayPrize = args.slice(3).join(' ');

    if(!giveawayPrize){
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to specify a valid prize!\nExample: \`${config.prefix}start #Giveaway 1h 1 Discord Nitro\``);
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY STARTED** 🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY ENDED** 🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "🎉 | Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    message.channel.send(`<:SD_emoji_50:796948104716353538> | Giveaway started in ${giveawayChannel}!`);

};