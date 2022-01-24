export interface CollectionMap {
  [key: string]: Collection;
}

export interface Collection {
  name: string;
  collectionImage: string;
  collectionUrl: string;
  currency: string;
}

export interface CollectionResponse {
  floorPrice: string;
  averageSalePrice: string;
  totalVolume: string;
  totalRoyalties: string;
  numberOfSales: string;
  numberActive: string;
  collection: string;
}
