const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const { COLLECTION_MAP, MARKETPLACE } = require("../config");
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
          .setColor("#00FF00")
          .setTitle(selectedCollection.name)
          .setURL(selectedCollection.collectionUrl)
          .setDescription(selectedCollection.description)
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
            text: MARKETPLACE[selectedCollection.marketplace].name,
            iconURL: MARKETPLACE[selectedCollection.marketplace].iconUrl,
          });

        embeds.push(embed);
      }
    });

    return interaction.reply({ embeds });
  },
};
