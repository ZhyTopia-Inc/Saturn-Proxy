const config = require("../config.json");

module.exports = (client, message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(`Hello ${message.author}, you can start by typing **${config.prefix}help**!`);
  }
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
};