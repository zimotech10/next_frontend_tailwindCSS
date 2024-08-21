import createAxiosClient from './axiosClient';

export const ActivityApi = {
  getNFTActivity: async (
    mintAddress: string,
    limit?: number,
    offset?: number,
    type?: string
  ) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/activity/nft/${mintAddress}`, {
        params: {
          limit,
          offset,
          type,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error Fetching Activity:', error);
    }
  },
  getWalletActivity: async (limit: number, offset: number, type?: string) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/activity/wallet`, {
        params: {
          limit,
          offset,
          type,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error Fetching Activity:', error);
    }
  },
};
