const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("givepoints")
    .setDescription("Give points for an players!")
    .addUserOption((option) =>
      option.setName("user").setDescription("user ?").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("points").setDescription("Points ?").setRequired(true)
    ),

  /**
  * @param {CommandInteraction} interaction
  **/

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(process.env.POINTPERMISSION))
    return await interaction.reply({ content: "You do not have permission" });

    const getUser = interaction.options.getUser("user");
    const numberPoints = interaction.options.getInteger("points");

    let pointsList = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointsList.array.length; i++) {
      if (pointsList.array[i].id === getUser.id) {
        list = pointsList.array[i].points += parseInt(numberPoints);
        pointsList.array[i].points = list;
      }
    }

    fs.writeFileSync("./json/points.json", JSON.stringify(pointsList, null, 4), (err) => {
      if (err) console.log(err);
    });

    const embed = new MessageEmbed()
      .setDescription(`**${numberPoints} Points** give to **<@${getUser.id}>**`)
      .setFooter({ text: "Created By MisTik#9871" });

    await interaction.reply({ embeds: [embed] });
  },
};
