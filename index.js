const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");

const handleCommand = require("./helpers/command");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

require("dotenv").config();

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
};

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) handleCommand(client, interaction);
});

// Status
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("dnd");
  client.user.setActivity(process.env.STATUS, { type: "WATCHING" });
});

client.login(process.env.TOKEN);
