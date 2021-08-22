const humanizeDuration = require("humanize-duration");
const Discord = require('discord.js')

module.exports = {
    name: "bot",
    description: "Display info about backup bot",
    run: async(interaction, client) => {
        const fnr = await client.users.fetch('596227913209217024');
        const embed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setURL('https://github.com/FnrDev/backup-slash')
        .setFooter(`Developed by ${fnr.tag} | ${fnr.id}`, fnr.displayAvatarURL({ dynamic: true }))
        .setColor('#edbb26')
        .addFields(
            {
                name: "Total Users:",
                value: client.users.cache.size.toString(),
                inline: true
            },
            {
                name: "Total Guilds:",
                value: client.guilds.cache.size.toString(),
                inline: true
            },
            {
                name: "Bot Uptime:",
                value: humanizeDuration(client.uptime, { round: true }),
                inline: true
            },
        )
        interaction.reply({ embeds: [embed] })
    }
}