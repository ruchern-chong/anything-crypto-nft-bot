const axios = require("axios");

const { EBISUS_BAY_BASE_URL } = require("./config");

const fetchCollections = async (collectionId) => {
  let params = {};

  if (collectionId) {
    params = {
      ...params,
      collection: collectionId,
    };
  }

  try {
    const { data } = await axios.get(`${EBISUS_BAY_BASE_URL}/collections`, {
      params,
    });
    const { collections } = data;
    return collections;
  } catch (e) {
    console.error(e);
  }
};

module.exports = fetchCollections;
