import createAxiosClient from '@/api/axiosClient';

export async function getWalletNFTs(): Promise<any> {
  try {
    const axiosClient = await createAxiosClient();
    const response = await axiosClient.get(`/nft/wallet`);

    const nfts = response.data;
    console.log(response.data);
    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
}
