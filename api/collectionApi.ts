import createAxiosClient from './axiosClient';
import { Collection2 } from '@/models/Collection';

export const CollectionApi = {
  getCollectionByParams: async (
    search: string,
    orderBy: string,
    orderDir: string,
    offset: number,
    limit: number
  ) => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get('/collection/', {
        params: {
          search,
          orderBy,
          orderDir,
          offset,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw error;
    }
  },
  getCollection: async (symbol: string): Promise<Collection2> => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get(`/collection/${symbol}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching collection:', error);
      throw error;
    }
  },
  getFeaturedCollection: async () => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get('/collection/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured collections', error);
      throw error;
    }
  },
  getTopCollection: async () => {
    try {
      const axiosClient = await createAxiosClient();
      const response = await axiosClient.get('/collection/top', {
        params: {
          limit: 10,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured collections', error);
      throw error;
    }
  },
};
