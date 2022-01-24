import axios from "axios";
import { API_BASE_URL } from "./config";

import type { CollectionResponse } from "./types";

/**
 * Fetch the collections based on the collection IDs provided.
 *
 * @param collectionId
 */
const fetchCollections = async (
  collectionId: string
): Promise<CollectionResponse[]> => {
  let params = {};

  if (collectionId) {
    params = {
      ...params,
      collection: collectionId,
    };
  }

  try {
    const { data } = await axios.get(`${API_BASE_URL}/collections`, {
      params,
    });
    const { collections } = data;
    return collections;
  } catch (e) {
    console.error(e);
  }
};

export default fetchCollections;
