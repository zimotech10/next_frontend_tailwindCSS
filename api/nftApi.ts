import axiosClient from "./axiosClient";

export const NftApi = {
  getNftsByCollection : async (symbol:string) => {
    try {
      const response = await axiosClient.post(`/nft/${symbol}`, 
          {
              price:{
                  min: 0,
                  max: 1000,
              },
              attributes: [],
              offset: 0,
              limit: 10,
              search: "",
          }
      );
      const nfts = response.data.data;
      return nfts;
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  },
  getNFTStatus : async (mintAddress:string) => {
    try{
        const response = await axiosClient.get(`/nft/item/${mintAddress}`);
        const {isOwner, isListed, isOffered, bids} = response.data.data;
        return {isOwner, isListed, isOffered, bids}
    } catch (error) {
        console.error("Error fetching NFT Status", error);
        throw error;
    }
  }
}

