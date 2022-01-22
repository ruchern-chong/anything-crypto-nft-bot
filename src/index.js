const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.commands = new Collection();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_BOT_API_TOKEN);

const commandsFolderPath = path.resolve(__dirname, "commands");

const commands = [];
const commandFiles = fs
  .readdirSync(commandsFolderPath)
  .filter((file) => file.endsWith(".js"));

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

for (const file of commandFiles) {
  const command = require(`${commandsFolderPath}/${file}`);
  // TODO: Confirm why we need to duplicate the commands
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_BOT_API_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (e) {
    console.error(e);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    return command.execute(interaction);
  } catch (e) {
    console.error(e);

    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
