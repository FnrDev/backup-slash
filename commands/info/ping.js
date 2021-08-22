module.exports = {
    name: "ping",
    description: "Get bot speed",
    run: async(interaction, client) => {
        await interaction.reply("🏓 Pong!")
        const msg = await interaction.fetchReply();
        interaction.editReply({ content: `**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms` })
    }
}