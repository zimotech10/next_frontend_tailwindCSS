import * as anchor from '@coral-xyz/anchor';
// import { findProgramAddressSync } from '@coral-xyz/anchor/dist/cjs/utils/pubkey';
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Connection,
} from '@solana/web3.js';
import idl from '@/stores/bictory_marketplace.json';

export const PREFIX = 'bictory_marketplace';
export const TREASURY = 'treasury';
export const SIGNER = 'signer';
export const LISTING = 'listing';
export const OFFER = 'offer';
export const AUCTION = 'auction';

export const METADATA_PROGRAM_ID = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
);
export const PROGRAM_ID = new PublicKey(
  'GDW1qzqhhTMghr7nAZSB6fG7anG1EeHUeRByCNcXdjQ1'
);
export const AUTHORIZATION_RULES_PROGRAM_ID = new PublicKey(
  'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
);
export const MARKETPLACE_FEE_FACTOR = 0.03; // 3%
export const DISCOUNT_FEE_FACTOR = 0.02; // 2%
export const BASIS_POINTS = 10000;

export const sleep = async (seconds: number) => {
  await new Promise((f) => setTimeout(f, 1000 * seconds));
};

export async function safeAirdrop(
  connection: anchor.web3.Connection,
  key: anchor.web3.PublicKey,
  amount: number
) {
  // let blockhash = (await connection.getRecentBlockhash('finalized')).blockhash;

  try {
    const tx = await connection.requestAirdrop(key, amount * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(tx, 'finalized');
  } catch (error) {
    console.log('airdrop error', error);
  }
}

export const findAuctionHouse = (
  authority: PublicKey,
  treasuryMint: PublicKey
): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX), authority.toBuffer(), treasuryMint.toBuffer()],
    PROGRAM_ID
  );

  return pubkey;
};

export const findAuctionHouseTreasury = (
  auctionHouse: PublicKey
): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX), auctionHouse.toBuffer(), Buffer.from(TREASURY)],
    PROGRAM_ID
  );

  return pubkey;
};

export const findEscrowWallet = (
  wallet: PublicKey,
  auctionHouse: PublicKey
): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX), auctionHouse.toBuffer(), wallet.toBuffer()],
    PROGRAM_ID
  );

  return pubkey;
};

export const findOfferAccount = (
  wallet: PublicKey,
  nftMint: PublicKey
): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(PREFIX),
      nftMint.toBuffer(),
      wallet.toBuffer(),
      Buffer.from(OFFER),
    ],
    PROGRAM_ID
  );

  return pubkey;
};

export const findAuctionAccount = (nftMint: PublicKey): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX), nftMint.toBuffer(), Buffer.from(AUCTION)],
    PROGRAM_ID
  );

  return pubkey;
};

export const findListingAccount = (nftMint: PublicKey): PublicKey => {
  let [pubkey, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from(PREFIX), nftMint.toBuffer(), Buffer.from(LISTING)],
    PROGRAM_ID
  );

  return pubkey;
};

export const findMetadataPda = async (mint: PublicKey): Promise<PublicKey> => {
  const [metadata] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from('metadata'), METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    METADATA_PROGRAM_ID
  );

  return metadata;
};

export const findEditionPda = async (mint: PublicKey): Promise<PublicKey> => {
  const [edition] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from('edition'),
    ],
    METADATA_PROGRAM_ID
  );

  return edition;
};

export const findTokenRecordAddress = async (
  mint: PublicKey,
  tokenAccount: PublicKey
) => {
  const [tokenRecordAddress, bump] = await PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(), // Token Metadata Program ID
      mint.toBuffer(),
      Buffer.from('token_record'),
      tokenAccount.toBuffer(),
    ],
    METADATA_PROGRAM_ID // Token Metadata Program ID
  );

  return tokenRecordAddress;
};

export const commitmentLevel = 'confirmed';
export const endpoint = clusterApiUrl('devnet');
export const connection = new Connection(endpoint, commitmentLevel);
export const PROGRAM_INTERFACE = JSON.parse(JSON.stringify(idl));
