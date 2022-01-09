const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const { COLLECTION_MAP } = require("../config");
const fetchCollections = require("../fetchCollections");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("floor")
    .setDescription("Get the floor price of the selected NFT collection"),
  async execute(interaction) {
    const embeds = [];

    const collectionIds = Object.keys(COLLECTION_MAP).join(",");

    let collectionsData = [];
    try {
      collectionsData = await fetchCollections(collectionIds);
    } catch (e) {
      console.error(e);
    }

    collectionsData.forEach(({ collection, floorPrice }) => {
      const selectedCollection = COLLECTION_MAP[collection];

      if (collection) {
        const embed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`${selectedCollection.name} Floor Price`)
          .setURL(`${selectedCollection.collectionUrl}`)
          .setDescription(`${floorPrice} ${selectedCollection.currency}`);

        embeds.push(embed);
      }
    });

    return interaction.reply({ embeds });
  },
};
