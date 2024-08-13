import createAxiosClient from './axiosClient';
import axiosClient from './axiosClient';

export const NftApi = {
  getNftsByCollection: async (symbol: string) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.post(`/nft/${symbol}`, {
        price: {
          min: 0,
          max: 1000,
        },
        attributes: [],
        offset: 0,
        limit: 10,
        search: '',
      });
      const { nfts } = response.data;
      return nfts;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },
  getNFTStatus: async (mintAddress: string) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/nft/item/${mintAddress}`);
      const { isOwner, listStatus, isOffered, owner, bids, nftInfo } =
        response.data;
      const creators = nftInfo.creators.map((creator: any) => creator.address);
      return { isOwner, listStatus, isOffered, owner, bids, creators };
    } catch (error) {
      console.error('Error fetching NFT Status', error);
      throw error;
    }
  },
};
