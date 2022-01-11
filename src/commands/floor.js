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
          // ["Mad Meerkat", "0x89dBC8Bd9a6037Cbd6EC66C4bF4189c9747B1C56"],
        ])
    ),
  async execute(interaction) {
    const option = interaction.options.get("collection");

    let collections;

    if (!option) {
      try {
        collections = await fetchCollections();
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

      if (collection) {
        const embed = new MessageEmbed()
          .setColor(stringToHexColour(collection))
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
