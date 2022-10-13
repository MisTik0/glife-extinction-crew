const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("presence")
    .setDescription("List of player in the airdrop voice channel!"),

  /**
  * @param {CommandInteraction} interaction
  **/

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(process.env.LEADROLE))
    return await interaction.reply({ content: "You do not have permission" });

    let playerPresenceList = "";
    let client = interaction.client;
    let getVoiceChannel = client.channels.cache.get(process.env.VOCALDROP);

    getVoiceChannel.members.forEach((member) => {

    playerPresenceList = playerPresenceList.concat(`<@${member.user.id}>` + "\n");
    let pointslist = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointslist.array.length; i++) {
      if (pointslist.array[i].id === member.user.id) {
        list = pointslist.array[i].points += parseInt(process.env.PRESENCEGIVEPOINTS);
        pointslist.array[i].points = list;
      };
    };

    fs.writeFileSync("./json/points.json", JSON.stringify(pointslist, null, 4), (err) => {
        if (err) console.log(err);
      });

    });

    const embed = new MessageEmbed()
      .setTitle("Presence List :")
      .setDescription(playerPresenceList)
      .setFooter({ text: "Created By MisTik#9871" });

    await interaction.reply({ embeds: [embed] });
  },
};
