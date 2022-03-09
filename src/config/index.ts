import type { CollectionMap, Marketplace } from "../types";

export const API_BASE_URL: string = `https://api.ebisusbay.com`;

export const MARKETPLACE: Marketplace = {
  name: "Ebisus Bay",
  iconUrl: "https://app.ebisusbay.com/favicon-32x32.png?v=3",
};

export const COLLECTION_MAP: CollectionMap = {
  "0x8d9232Ebc4f06B7b8005CCff0ca401675ceb25F5": {
    name: `Ebisu's Bay - ALL Founding Member`,
    collectionImage: `https://app.ebisusbay.com/img/avatar.jpg`,
    collectionUrl: `https://app.ebisusbay.com/collection/0x8d9232Ebc4f06B7b8005CCff0ca401675ceb25F5`,
    currency: "CRO",
  },
  "0x939b90c529F0e3a2C187E1b190Ca966a95881FDe": {
    name: `Chronos Monkey Business`,
    collectionImage: `https://app.ebisusbay.com/img/collections/cronosmb/avatar.png`,
    collectionUrl: `https://app.ebisusbay.com/collection/0x939b90c529F0e3a2C187E1b190Ca966a95881FDe`,
    currency: "CRO",
  },
  "0xD504ed871d33dbD4f56f523A37dceC86Ee918cb6": {
    name: "LazyHorse",
    collectionImage: `https://app.ebisusbay.com/img/collections/lazyhorse/avatar.png`,
    collectionUrl: `https://app.ebisusbay.com/collection/0xD504ed871d33dbD4f56f523A37dceC86Ee918cb6`,
    currency: "CRO",
  },
  "0x7d0259070B5f513CA543afb6a906d42af5884B1B": {
    name: "Lazy Horse Member NFT (PONY)",
    collectionImage: `https://app.ebisusbay.com/img/collections/lazyhorse/avatar.png`,
    collectionUrl: `https://app.ebisusbay.com/collection/0x7d0259070B5f513CA543afb6a906d42af5884B1B`,
    currency: "CRO",
  },
  "0x9a219f71d435be7fadb5824dd843c7fc830c118f": {
    name: "MAG Brew Vikings",
    collectionImage:
      "https://app.ebisusbay.com/img/collections/magbrew/avatar.jpg",
    collectionUrl:
      "https://app.ebisusbay.com/collection/0x9a219f71d435be7fadb5824dd843c7fc830c118f",
    currency: "CRO",
  },
};
