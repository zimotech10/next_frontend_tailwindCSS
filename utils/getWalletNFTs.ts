import axiosClient from "@/api/axiosClient";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

export async function getWalletNFTs(walletAddress: string): Promise<any> {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const keypair = Keypair.generate();

    const metaplex = new Metaplex(connection);
    metaplex.use(keypairIdentity(keypair));

    // const response = await axiosClient.get('/nft/wallet', {
    //   params: {
    //     walletAddress
    //   }
    // })
    
    // const registeredMints = response.data;

    const owner = new PublicKey(walletAddress);
    const nfts = await metaplex.nfts().findAllByOwner({ owner });
    // nfts.filter((nft) => registeredMints.includes((nft as {mintAddress: PublicKey}).mintAddress.toBase58()))
    return nfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw new Error("Error fetching NFTs");
  }
}
