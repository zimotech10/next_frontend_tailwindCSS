import { Collection } from "./Collection";
import { NFT } from "./NFT";

export interface Profile {
  name: string;
  username: string;
  image: string;
  address: string;
  about: string;
  socials: {
    x: string;
    facebook: string;
    instagram: string;
  };
  nfts: NFT[];
  collections: Collection[];
}
