const backup = require("discord-backup");
const path = require('path')

module.exports = {
    name: "create",
    description: "Create a back up for this server",
    timeout: 15000,
    run: async(interaction) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        await interaction.deferReply()
        try {
            backup.setStorageFolder(path.join(__dirname, '../../backup'))
            const backupData = await backup.create(interaction.guild, {
                maxMessagesPerChannel: 50, // Backup only 50 messages from the channel you can changed it to whatever you want
                jsonSave: true,
                jsonBeautify: true,
                saveImages: "base64"
            })
            interaction.user.send(`The backup has been created! to load it, type this command on the server of your choice:\n\`\`\`/load ${backupData.id}\`\`\``)
            interaction.editReply(`✅ Backup successfully created. The backup ID was sent in dm!`)
        } catch (e) {
            console.error(e)
            return interaction.editReply({ content: `:x: Error: ${e}` })
        }
    }
}