const backup = require('discord-backup');
const humanizeDuration = require("humanize-duration");
const Discord = require('discord.js')

module.exports = {
    name: "info",
    description: "Get info about backup",
    options: [
        {
            name: "backup_code",
            description: "Backup code you want to get info for it",
            type: 3,
            required: true
        }
    ],
    run: async(interaction) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command", ephemeral: true })
        }
        await interaction.deferReply()
        const getBackupCode = interaction.options.getString('backup_code');
        try {
            await backup.fetch(getBackupCode)
        } catch (e) {
            return interaction.editReply(`:x: | No backup found for \`${getBackupCode}\``)
        }
        const backupData = await backup.fetch(getBackupCode);
        const distnce = Date.now() - backupData.data.createdTimestamp;
        const embed = new Discord.MessageEmbed()
        .setAuthor(backupData.data.name, backupData.data.iconURL)
        .setColor('#edbb26')
        .addFields(
            {
                name: "BackUp ID:",
                value: backupData.id,
                inline: true
            },
            {
                name: "Server ID:",
                value: backupData.data.guildID,
                inline: true
            },
            {
                name: "BackUp Size:",
                value: `${backupData.size} kb`,
                inline: true
            },
            {
                name: "Backup Created At:",
                value: `**${humanizeDuration(distnce, { largest: 2, round: true })}**`,
                inline: true
            }
        )
        interaction.editReply({ embeds: [embed] })
    }
}