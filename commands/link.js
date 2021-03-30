const config = require("../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Invite me!')
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setColor("#ff4b3b")
    .setDescription(`Invite ➔ [Click here](https://discord.com/oauth2/authorize?client_id=795281781687451649&permissions=403172470&scope=bot)!\nVote ➔ [Click here](https://top.gg/bot/795281781687451649/vote)!`)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    message.channel.send(embed)
}