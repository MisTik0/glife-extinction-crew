const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("allgivepoints")
    .setDescription("Give points for all players!")
    .addIntegerOption((option) =>
      option.setName("points").setDescription("Points ?").setRequired(true)
    ),

  /**
  * @param {CommandInteraction} interaction
  **/

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(process.env.POINTPERMISSION))
    return await interaction.reply({ content: "You do not have permission" });

    const givedPoints = interaction.options.getInteger("points");
    let pointsList = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointsList.array.length; i++) {
      pointGive = pointsList.array[i].points += parseInt(givedPoints);
      pointsList.array[i].points = pointGive;
    }

    fs.writeFileSync("./json/points.json", JSON.stringify(pointsList, null, 4), (err) => {
      if (err) console.log(err);
    });

    const embed = new MessageEmbed()
      .setDescription(`**${givedPoints} Points** give to **all players !**`)
      .setFooter({ text: "Created By MisTik#9871" });

    await interaction.reply({ embeds: [embed] });
  },
};
