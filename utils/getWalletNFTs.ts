import createAxiosClient from '@/api/axiosClient';

export async function getWalletNFTs(category: string): Promise<any> {
  try {
    const axiosClient = await createAxiosClient();
    const response = await axiosClient.get(`/nft/wallet/${category}`);

    const nfts = response.data;
    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
}
