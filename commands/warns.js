const db = require(`quick.db`)
const discord = require(`discord.js`)

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
        return message.channel.send('<:SD_emoji_51:796948139243208735> | You need **Manage_Guild** permission to run this command!');
    }

    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`<:SD_emoji_51:796948139243208735> | You have to mention the user first!\nExample: \`${config.prefix}warns @Greblue#7865\``);
    
    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    if(warnings === null) warnings = 0;
    let latest = db.get(`latestwarn.${user.id}`);
    if (latest === undefined) latest = 'No latest warn.'

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${user.tag} have \`${warnings}\` warning(s)\nLatest warning: ${latest}`)
    .setTimestamp()
    .setColor("#ff4b3b")

    message.channel.send(embed).catch(() => message.channel.send("Something wrong.. try again."));
}