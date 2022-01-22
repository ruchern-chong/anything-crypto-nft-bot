const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const { COLLECTION_MAP, MARKETPLACE } = require("../config");
const fetchCollections = require("../fetchCollections");
const stringToHexColour = require("../utils/stringToHexColour");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("floor")
    .setDescription("Get the floor price of different NFT collection(s)")
    .addStringOption((option) =>
      option
        .setName("collection")
        .setDescription("Select the collection")
        // TODO: Update the choices to support more options dynamically
        .addChoices([
          [
            "Cronos Monkey Business",
            "0x939b90c529F0e3a2C187E1b190Ca966a95881FDe",
          ],
          ["Lazy Horse", "0xD504ed871d33dbD4f56f523A37dceC86Ee918cb6"],
          [
            "Lazy Horse Member NFT (PONY)",
            "0x7d0259070B5f513CA543afb6a906d42af5884B1B",
          ],
        ])
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const option = interaction.options.get("collection");

    let collections = [];

    if (!option) {
      try {
        const collectionsFromConfig = Object.keys(COLLECTION_MAP).join(",");
        collections = await fetchCollections(collectionsFromConfig);
        collections = collections.filter(({ collection }) => {
          const whitelist = Object.keys(COLLECTION_MAP);
          return whitelist.includes(collection);
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        collections = await fetchCollections(option.value);
      } catch (e) {
        console.error(e);
      }
    }
    console.info(`Collections:`, collections);

    const embeds = [];
    collections.forEach(({ collection, floorPrice }) => {
      const selectedCollection = COLLECTION_MAP[collection];
      const selectedMarketplace = MARKETPLACE[selectedCollection.marketplace];

      const embed = new MessageEmbed()
        .setColor(stringToHexColour(collection))
        .setTitle(selectedCollection.name)
        .setURL(selectedCollection.collectionUrl)
        .setThumbnail(selectedCollection.collectionImage)
        .setFields([
          {
            name: "Floor Price",
            value: `${floorPrice} ${selectedCollection.currency}`,
            inline: true,
          },
        ])
        .setTimestamp(Date.now())
        .setFooter({
          text: selectedMarketplace.name,
          iconURL: selectedMarketplace.iconUrl,
        });

      embeds.push(embed);
    });
    console.info(embeds);

    if (embeds.length === 0) {
      const embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Error fetching details, please try again later!");
      return interaction.editReply({ embeds: [embed] });
    }

    return interaction.editReply({ embeds });
  },
};
