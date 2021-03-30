const ms = require('ms');
const config = require("../config.json");

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You need **Manage_Guild** permission or @Giveaways role to run this command!');
    }

    if (!args[0]) {
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You have to provide a valid giveaway ID!');
    }

    let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) {
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | Unable to find giveaway with the ID: \`${args.join(' ')}\`.`);
    }

    client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('<:SD_emoji_50:796948104716353538> | Giveaway rerolled!');
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
                message.channel.send('This giveaway is not ended!');
            } else {
                console.error(e);
                message.channel.send('An error occured...');
            }
        });

};
