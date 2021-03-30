const config = require("../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  let m = require('moment-duration-format'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment'),
    fetch = require('node-fetch')

  cpuStat.usagePercent(function (error, percent, seconds) {
    if (error) {
      return console.error(error)
    }

    const guild = client.guilds.cache.size.toLocaleString()
    const user = client.users.cache.size.toLocaleString()
    const usage = formatBytes(process.memoryUsage().heapUsed)
    const CPU = percent.toFixed(2)
    const Dev = `${client.users.cache.get("529493423556919296").username}#${client.users.cache.get("529493423556919296").discriminator}`

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Information`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
      .setColor("#ff4b3b")
      .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Information', value: `Developer: ${Dev}\nName: ${client.user.tag}\nPrefix: ${config.prefix}\nCreated since: January 3, 2021` },
        { name: `Statistics`, value: `Guilds: ${guild}\nUsers: ${user}\nMemory Usage: ${usage}\nCPU Usage: ${CPU}%` }
      )
      .setTimestamp()

    message.channel.send(embed);
  })
}

function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function formatBytes(a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
    d = b || 2,
    e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function parseDur(ms) {
  let seconds = ms / 1000,
    days = parseInt(seconds / 86400);
  seconds = seconds % 86400

  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600

  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)

  if (days) {
    return `${days} days, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }

  return `${seconds} seconds`
}