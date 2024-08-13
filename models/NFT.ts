export interface NFT {
  id?: number;
  name: string;
  uri: any;
  collection?: string | null;
  price?: string;
  description?: string;
  owner?: string;
  mintAddress?: string | null;
  listStatus?: number;
  isOffered?: boolean;
  offers?: any;
  creators?: any;
}

export interface NFTMetadata {
  name: string;
  symbol: string;
  description: string;
  seller_fee_basis_points: number;
  image: string;
  external_url: string;
  edition: number;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: {
    files: {
      uri: string;
      type: string;
    }[];
    category: string;
    creators: {
      address: string;
      share: number;
    }[];
  };
}
