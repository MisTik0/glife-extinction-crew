const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removeuser")
    .setDescription("Remove a user in the point list!")
    .addUserOption((option) =>
      option.setName("user").setDescription("User ?").setRequired(true)
    ),

  /**
  * @param {CommandInteraction} interaction
  **/

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(process.env.POINTPERMISSION))
    return await interaction.reply({ content: "You do not have permission" });

    const getUser = interaction.options.getUser("user");
    let pointsList = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointsList.array.length; i++) {
      if (pointsList.array[i].id === getUser.id) {
        pointsList.array.splice(i, 1);
      };
    };

    fs.writeFileSync("./json/points.json", JSON.stringify(pointsList, null, 4), (err) => {
        if (err) console.log(err);
    });

    const embed = new MessageEmbed()
      .setDescription(`**<@${getUser.id}>** removed from the point list!`)
      .setFooter({text: "Created By MisTik#9871"});

    await interaction.reply({embeds: [embed]});
  },
};
