const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removepoints")
    .setDescription("Remove points for an players!")
    .addUserOption((option) =>
      option.setName("user").setDescription("User ?").setRequired(true)
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
    const removedPoints = interaction.options.getInteger("points");

    let pointslist = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointslist.array.length; i++) {
      if (pointslist.array[i].points <= 0) {
        return await interaction.reply({ content: "This user has no points!" });
      };

      if (pointslist.array[i].id === getUser.id) {
        list = pointslist.array[i].points -= parseInt(removedPoints);
        pointslist.array[i].points = list;
      };
    };

    fs.writeFileSync("./json/points.json", JSON.stringify(pointslist, null, 4), (err) => {
      if (err) console.log(err);
    });

    const embed = new MessageEmbed()
      .setDescription(`**${removedPoints} Points** removed to **<@${getUser.id}>**`)
      .setFooter({ text: "Created By MisTik#9871" });

    await interaction.reply({ embeds: [embed] });
  },
};
