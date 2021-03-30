const ms = require('ms');
const config = require("../config.json");

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You need **Manage_Guild** permission or @Giveaways role to run this command!');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You have to provide a valid giveaway ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | Unable to find giveaway with the ID: \`${args.join(' ')}\`.`);
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('<:SD_emoji_50:796948104716353538> | Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway is already ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

};
