import createAxiosClient from './axiosClient';
import axiosClient from './axiosClient';

export const NftApi = {
  getNftsByCollection: async (
    symbol: string,
    search: string,
    orderBy: string,
    orderDir: string,
    offset: number,
    limit: number,
    price: any,
    attributes: any
  ) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.post(`/nft/${symbol}`, {
        
          search,
          orderBy,
          orderDir,
          offset,
          limit,
          price,
          attributes
        
      });
      const  nfts  = response.data;
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
