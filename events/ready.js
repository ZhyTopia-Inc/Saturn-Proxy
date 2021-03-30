module.exports = (client) => {
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

      function randomStatus() {
    let status = [`${client.guilds.cache.size.toLocaleString()} Guilds`, `${client.guilds.cache.size.toLocaleString()} Guilds`]
    let rstatus = Math.floor(Math.random() * status.length);
      
    client.user.setActivity(status[rstatus], {type: "WATCHING"});
  }
  setInterval(randomStatus, 60000);
};