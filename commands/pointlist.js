const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pointlist")
    .setDescription("Send the points list"),

  /**
  * @param {CommandInteraction} interaction
  **/

  async execute(interaction) {
    let playerPointsList = "";
    let pointsList = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointsList.array.length; i++) {
      playerPointsList = playerPointsList.concat("**Name :** <@" + pointsList.array[i].id + "> -- **Points : **" + pointsList.array[i].points, "\n", "\n");
    };

    const embed = new MessageEmbed()
      .setTitle("Points List :")
      .setDescription(`${playerPointsList}`)
      .setFooter({ text: "Created By MisTik#9871" });

    await interaction.reply({ embeds: [embed] });
  },
};
