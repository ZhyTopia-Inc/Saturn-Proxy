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

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
        .then(() => {
            message.channel.send('<:SD_emoji_50:796948104716353538> | Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds...');
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                message.channel.send('This giveaway is already ended!');
            } else {
                console.error(e);
                message.channel.send('An error occured...');
            }
        });

};
