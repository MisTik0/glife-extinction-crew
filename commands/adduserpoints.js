const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmembers")
    .setDescription("Add member in the Points List !")
    .addUserOption((option) =>
      option.setName("user").setDescription("User ?").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("points")
        .setDescription("Default Points ?")
        .setRequired(true)
    ),

    /**
    * @param {CommandInteraction} interaction
    **/

  async execute(interaction) {
    if (!interaction.member.roles.cache.has(process.env.POINTPERMISSION))
    return await interaction.reply({ content: "You do not have permission" });

    const getUser = interaction.options.getUser("user");
    const defaultPoints = interaction.options.getInteger("points");

    let pointsList = JSON.parse(fs.readFileSync("./json/points.json", "utf8"));

    for (let i = 0; i < pointsList.array.length; i++) {
      if (pointsList.array[i].id === getUser.id) {
        return await interaction.reply({content: "This user is already in the points list!"});
      };
    };

    pointsList["array"].push({ id: getUser.id, points: defaultPoints });
    fs.writeFile("./json/points.json", JSON.stringify(pointsList, null, 4), (err) => {
      if (err) console.log(err);
    });

    await interaction.reply({ content: `**<@${getUser.id}>** as been add in the points list. Default Points : **${defaultPoints}**` });
  },
};
