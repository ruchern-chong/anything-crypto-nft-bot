const axios = require("axios");

const fetchCollections = async (collectionId) => {
  let params = {};

  if (collectionId) {
    params = {
      ...params,
      collection: collectionId,
    };
  }

  try {
    const { data } = await axios.get(`https://api.ebisusbay.com/collections`, {
      params,
    });
    const { collections } = data;

    return collections;
  } catch (e) {
    console.error(e);
  }
};

module.exports = fetchCollections;
