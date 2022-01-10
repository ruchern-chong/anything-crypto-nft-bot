const MARKETPLACE = {
  AGORA_CRO: {
    name: "Agora",
    iconUrl: "https://agoracro.com/icon.png",
  },
  EBISUS_BAY: {
    name: "Ebisus Bay",
    iconUrl: "https://app.ebisusbay.com/favicon-32x32.png?v=3",
  },
};

const COLLECTION_MAP = {
  "0x939b90c529F0e3a2C187E1b190Ca966a95881FDe": {
    name: `Chronos Monkey Business`,
    collectionImage: `https://app.ebisusbay.com/img/collections/cronosmb/avatar.png`,
    collectionUrl: `https://app.ebisusbay.com/collection/0x939b90c529F0e3a2C187E1b190Ca966a95881FDe`,
    description: `We want to evolve in a growing ecosystem with long-term security for us and our community. We are convinced that the projects that will be launched on cronos will be promising and will represent for us potential future partnerships.`,

    currency: "CRO",
    marketplace: "EBISUS_BAY",
  },
  "0xD504ed871d33dbD4f56f523A37dceC86Ee918cb6": {
    name: "LazyHorse",
    collectionImage: `https://app.ebisusbay.com/img/collections/lazyhorse/avatar.png`,
    collectionUrl: `https://app.ebisusbay.com/collection/0xD504ed871d33dbD4f56f523A37dceC86Ee918cb6`,
    description: `On January 2nd, horse enthusiasts will be able to mint their very own one-of-a-kind Lazy Horse NFT on Ebisusbay. Stay tuned for more details leading up to the launch.`,

    currency: "CRO",
    marketplace: "EBISUS_BAY",
  },
  // "0x89dBC8Bd9a6037Cbd6EC66C4bF4189c9747B1C56": {
  //   name: "Mad Meerkat",
  //   collectionImage: `https://app.ebisusbay.com/img/collections/meerkats/avatar.png`,
  //   collectionUrl: `https://app.ebisusbay.com/collection/0x89dBC8Bd9a6037Cbd6EC66C4bF4189c9747B1C56`,
  //   description: `On January 2nd, horse enthusiasts will be able to mint their very own one-of-a-kind Lazy Horse NFT on Ebisusbay. Stay tuned for more details leading up to the launch.`,
  //
  //   currency: "CRO",
  //   marketplace: "EBISUS_BAY",
  // },
};

module.exports = { COLLECTION_MAP, MARKETPLACE };
