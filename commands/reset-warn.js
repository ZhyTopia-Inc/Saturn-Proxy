const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {   
    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You need **Manage_Guild** permission to run this command!');
    }

    let user = message.mentions.users.first();
    if(!user) {
        return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to mention the user first!\nExample: \`${config.prefix}reset-warn @Greblue#7865\``);
        }
        
    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    const well2 = new Discord.MessageEmbed()
    .setDescription(`<:SD_emoji_51:796948139243208735> | ${user.tag} do not have any warning!`)

if(warnings === null) {
    return message.channel.send(well2)
    }

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${user} warning(s) has been successfully cleared!`)
    .setTimestamp()
    .setColor("#ff4b3b")

    db.delete(`warning_${message.guild.id}_${user.id}`)
    db.delete(`latestwarn.${user.id}`);
    message.channel.send(embed).catch(() => message.channel.send("Something wrong.. try again."))
    user.send(`Your warning(s) has been cleared by \`${message.author.tag}\` from \`${message.guild.name}\``)

}