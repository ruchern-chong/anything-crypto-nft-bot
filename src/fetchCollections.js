const axios = require("axios");

const fetchCollections = async (collectionId) => {
  try {
    const { data } = await axios.get(
      `https://api.ebisusbay.com/collections?collection=${collectionId}`
    );
    const { collections } = data;

    return collections;
  } catch (e) {
    console.error(e);
  }
};

module.exports = fetchCollections;
