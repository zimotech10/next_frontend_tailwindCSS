import axiosClient from "@/api/axiosClient";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

export async function getWalletNFTs(walletAddress: string): Promise<any> {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));

    const response = await axiosClient.get(`/nft/wallet/${walletAddress}`)
    
    const nfts = response.data.nftList;
    return nfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw new Error("Error fetching NFTs");
  }
}
