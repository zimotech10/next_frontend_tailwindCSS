import * as anchor from "@coral-xyz/anchor";
import { SYSVAR_RENT_PUBKEY, Keypair, PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
// import  {BictoryMarketplace}  from "../stores/idl";
import {
  findAuctionHouse,
  findAuctionHouseTreasury,
  findEscrowWallet,
  findListingAccount,
  findMetadataPda,
  findOfferAccount,
} from "./utils";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const listing = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  price: anchor.BN,
  expiry: anchor.BN | null
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  const nftAccount = await getAssociatedTokenAddress(nftMint, wallet.publicKey);

  try {
    const tx = await program.methods
      .list(price, expiry)
      .accounts({
        seller: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        nftAccount: nftAccount,
        listingAccount: listingAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const unlisting = async (
  program: anchor.Program,
  wallet: Keypair,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  const nftAccount = await getAssociatedTokenAddress(nftMint, wallet.publicKey);

  try {
    const tx = await program.methods
      .unlisting()
      .accounts({
        seller: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        nftAccount: nftAccount,
        listingAccount: listingAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([wallet])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const offer = async (
  program: anchor.Program,
  wallet: Keypair,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  price: anchor.BN,
  expiry: anchor.BN | null
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const offerAccount = findOfferAccount(wallet.publicKey, nftMint);

  try {
    const tx = await program.methods
      .buy(price, expiry)
      .accounts({
        buyer: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        nftMint: nftMint,
        offerAccount: offerAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([wallet])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const cancelBuy = async (
  program: anchor.Program,
  wallet: Keypair,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const offerAccount = findOfferAccount(wallet.publicKey, nftMint);

  try {
    const tx = await program.methods
      .cancelBuy()
      .accounts({
        buyer: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        nftMint: nftMint,
        offerAccount: offerAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([wallet])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const instantBuy = async (
  program: anchor.Program,
  buyer: Keypair,
  seller: PublicKey,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  creators: Array<PublicKey> | null = [],
  discountMint: PublicKey | null = null,
  discountTokenAccount: PublicKey | null = null,
  discountMetadata: PublicKey | null = null
) => {
  const isNative = treasuryMint == NATIVE_MINT;

  const sellerNftAccount = await getAssociatedTokenAddress(nftMint, seller);
  const nftMetadata = await findMetadataPda(nftMint);
  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer.publicKey
  );
  const sellerPaymentReceiptAccount = isNative
    ? seller
    : await getAssociatedTokenAddress(treasuryMint, seller);

  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const escrowWallet = findEscrowWallet(buyer.publicKey, auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  const nftAccountInfo = await program.provider.connection.getAccountInfo(
    sellerNftAccount
  );
  console.log("nftAccountInfo", nftAccountInfo);
  const remainingAccounts = creators
    ? creators.map((creator) => {
        return {
          pubkey: creator,
          isSigner: false,
          isWritable: true,
        };
      })
    : [];

  console.log(discountMint?.toString());

  if (discountMint && discountTokenAccount && discountMetadata) {
    remainingAccounts.push({
      pubkey: discountMint,
      isSigner: false,
      isWritable: false,
    });
    remainingAccounts.push({
      pubkey: discountTokenAccount,
      isSigner: false,
      isWritable: false,
    });
    remainingAccounts.push({
      pubkey: discountMetadata,
      isSigner: false,
      isWritable: false,
    });
  }

  try {
    const tx = await program.methods
      .instantBuy()
      .accounts({
        buyer: buyer.publicKey,
        seller: seller,
        escrowPaymentAccount: escrowWallet,
        sellerPaymentReceiptAccount: sellerPaymentReceiptAccount,
        buyerReceiptTokenAccount: buyerReceiptTokenAccount,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        metadata: nftMetadata,
        nftAccount: sellerNftAccount,
        listingAccount: listingAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        ataProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .remainingAccounts(remainingAccounts)
      .signers([buyer])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const acceptBuy = async (
  program: anchor.Program,
  buyer: PublicKey,
  seller: Keypair,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  creators: Array<PublicKey> | null = [],
  discountMint: PublicKey | null = null,
  discountTokenAccount: PublicKey | null = null,
  discountMetadata: PublicKey | null = null
) => {
  const isNative = treasuryMint == NATIVE_MINT;

  const sellerNftAccount = await getAssociatedTokenAddress(
    nftMint,
    seller.publicKey
  );
  const nftMetadata = await findMetadataPda(nftMint);
  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer
  );
  const sellerPaymentReceiptAccount = isNative
    ? seller.publicKey
    : await getAssociatedTokenAddress(treasuryMint, seller.publicKey);

  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const escrowWallet = findEscrowWallet(buyer, auctionHouse);
  const listingAccount = findListingAccount(nftMint);

  const remainingAccounts = creators
    ? creators.map((creator) => {
        return {
          pubkey: creator,
          isSigner: false,
          isWritable: true,
        };
      })
    : [];

  console.log(discountMint?.toString());

  if (discountMint && discountTokenAccount && discountMetadata) {
    remainingAccounts.push({
      pubkey: discountMint,
      isSigner: false,
      isWritable: false,
    });
    remainingAccounts.push({
      pubkey: discountTokenAccount,
      isSigner: false,
      isWritable: false,
    });
    remainingAccounts.push({
      pubkey: discountMetadata,
      isSigner: false,
      isWritable: false,
    });
  }

  try {
    const tx = await program.methods
      .acceptBuy()
      .accounts({
        buyer: buyer,
        seller: seller.publicKey,
        escrowPaymentAccount: escrowWallet,
        sellerPaymentReceiptAccount: sellerPaymentReceiptAccount,
        buyerReceiptTokenAccount: buyerReceiptTokenAccount,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        metadata: nftMetadata,
        nftAccount: sellerNftAccount,
        listingAccount: listingAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        ataProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .remainingAccounts(remainingAccounts)
      .signers([seller])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const deposit = async (
  program: anchor.Program,
  wallet: Keypair,
  authority: PublicKey,
  treasuryMint: PublicKey,
  amount: anchor.BN
) => {
  try {
    const isNative = treasuryMint == NATIVE_MINT;
    const auctionHouse = findAuctionHouse(authority, treasuryMint);
    const escrowWallet = findEscrowWallet(wallet.publicKey, auctionHouse);
    const walletAta = (
      await getOrCreateAssociatedTokenAccount(
        program.provider.connection,
        wallet,
        treasuryMint,
        wallet.publicKey
      )
    ).address;

    const tx = await program.methods
      .deposit(amount)
      .accounts({
        wallet: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        paymentAccount: isNative ? wallet.publicKey : walletAta,
        escrowPaymentAccount: escrowWallet,
        auctionHouse: auctionHouse,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([wallet])
      .rpc({ commitment: "confirmed" });
    return tx;
  } catch (error) {
    console.log("deposit error", error);
    return null;
  }
};
