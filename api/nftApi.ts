import createAxiosClient from './axiosClient';

export const NftApi = {
  getNftsByCollection: async (
    symbol: string,
    search: string,
    orderBy: string,
    orderDir: string,
    offset: number,
    limit: number,
    price: any,
    attributes: any,
    status: any
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
        attributes,
        status
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },
  getNFTStatus: async (mintAddress: string) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/nft/item/${mintAddress}`);
      const { isOwner, listStatus, isOffered, owner, bids, nftInfo, price } =
        response.data;
      const creators = nftInfo.creators.map((creator: any) => creator.address);
      const description = nftInfo.json.description;
      const attributes = nftInfo.json.attributes;
      return { isOwner, listStatus, isOffered, owner, bids, creators, price, description, attributes };
    } catch (error) {
      console.error('Error fetching NFT Status', error);
      throw error;
    }
  },
  getNFTAttributes: async (symbol: string) => {
    try{
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/collection/attribute/${symbol}`);
      const attributes = response.data;
      return attributes;
    } catch(error){
      console.error('Error fetching Attributes Status', error);
      throw error;
    }
  } 
};
