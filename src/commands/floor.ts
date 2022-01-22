import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

import { COLLECTION_MAP, MARKETPLACE } from "../config";
import fetchCollections from "../fetchCollections";

const choices: [name: string, value: string][] = Object.entries(
  COLLECTION_MAP
).map(([key, { name }]) => [name, key]);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("floor")
    .setDescription("Get the floor price of different NFT collection(s)")
    .addStringOption((option) =>
      option
        .setName("collection")
        .setDescription("Select the collection")
        .addChoices(choices)
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

    const embeds = [];

    collections.forEach(({ collection, floorPrice }) => {
      const selectedCollection = COLLECTION_MAP[collection];
      const selectedMarketplace = MARKETPLACE[selectedCollection.marketplace];

      const embed = new MessageEmbed()
        .setColor("RANDOM")
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

    if (embeds.length === 0) {
      const embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Error fetching details, please try again later!");
      return interaction.editReply({ embeds: [embed] });
    }

    return interaction.editReply({ embeds });
  },
};
