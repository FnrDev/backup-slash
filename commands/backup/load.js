const backup = require("discord-backup");

module.exports = {
    name: "load",
    description: "Load the backup",
    options: [
        {
            name: "backup_code",
            description: "Backup code you want to create",
            type: 3,
            required: true
        }
    ],
    run: async(interaction) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: ":x: You dont have permission to do this command!", ephemeral: true })
        }
        const backupCode = interaction.options.getString('backup_code');
        await interaction.deferReply()
        backup.fetch(backupCode).then(async () => {
            interaction.user.send(':white_check_mark: | Start loading the backup!')
            backup.load(backupCode, interaction.guild).then(() => {
                backup.remove(backupCode)
            }).catch((err) => {
                console.error(err)
                return interaction.editReply(`:x: | No backup found for \`${backupCode}\``)
            })
        })
    }
}