import {
  Connection,
  PublicKey,
  ParsedAccountData,
  clusterApiUrl,
} from "@solana/web3.js";

export async function getNFTOwner(
  tokenMint: string
): Promise<string | undefined> {
  const connection = new Connection(clusterApiUrl("devnet"));

  const tokenMintPubKey = new PublicKey(tokenMint);

  try {
    const largestAccounts = await connection.getTokenLargestAccounts(
      tokenMintPubKey
    );

    if (largestAccounts.value.length === 0) {
      throw new Error("No accounts found for the provided token mint.");
    }
    const largestAccountAddress = largestAccounts.value[0].address;
    const largestAccountInfo = await connection.getParsedAccountInfo(
      largestAccountAddress
    );

    if (!largestAccountInfo.value) {
      throw new Error("Account information could not be retrieved.");
    }
    if ("parsed" in largestAccountInfo.value.data) {
      const parsedData = largestAccountInfo.value.data as ParsedAccountData;
      const ownerAddress = parsedData.parsed.info.owner;
      return ownerAddress;
    } else {
      throw new Error("Account data is not parsed.");
    }
  } catch (error) {
    console.error("Error fetching owner address:", error);
    return undefined;
  }
}
