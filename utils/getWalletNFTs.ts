import createAxiosClient from '@/api/axiosClient';
import axiosClient from '@/api/axiosClient';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';

export async function getWalletNFTs(walletAddress: string): Promise<any> {
  try {
    const connection = new Connection(clusterApiUrl('devnet'));
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));

    const axiosClient = await createAxiosClient();
    const response = await axiosClient.get(`/nft/wallet`);

    const nfts = response.data;
    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Error fetching NFTs');
  }
}
