import * as anchor from '@coral-xyz/anchor';
import {
  SYSVAR_RENT_PUBKEY,
  Keypair,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
// import  {BictoryMarketplace}  from "../stores/idl";
import {
  AUTHORIZATION_RULES_PROGRAM_ID,
  findAuctionAccount,
  findAuctionHouse,
  findAuctionHouseTreasury,
  findEditionPda,
  findEscrowWallet,
  findListingAccount,
  findMetadataPda,
  findOfferAccount,
  findOfferAuctionAccount,
  findTokenRecordAddress,
  METADATA_PROGRAM_ID,
} from './utils';
import { AnchorWallet } from '@solana/wallet-adapter-react';

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
  const metadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    wallet.publicKey
  );
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        nftToAccount,
        auctionHouseTreasury,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

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
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        listingAccount: listingAccount,
        metadata: metadata,
        edition: edition,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const unlisting = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  const metadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    wallet.publicKey
  );
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        nftToAccount,
        wallet.publicKey,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

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
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        listingAccount: listingAccount,
        metadata: metadata,
        edition: edition,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const offer = async (
  program: anchor.Program,
  wallet: AnchorWallet,
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
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const cancelBuy = async (
  program: anchor.Program,
  wallet: AnchorWallet,
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
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const instantBuy = async (
  program: anchor.Program,
  buyer: AnchorWallet,
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

  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer.publicKey
  );
  const nftMetadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer.publicKey
  );
  const sellerPaymentReceiptAccount = isNative
    ? seller
    : await getAssociatedTokenAddress(treasuryMint, seller);

  const escrowWallet = findEscrowWallet(buyer.publicKey, auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        buyer.publicKey,
        nftToAccount,
        buyer.publicKey,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

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
        edition: edition,
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        listingAccount: listingAccount,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .remainingAccounts(remainingAccounts)
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const acceptBuy = async (
  program: anchor.Program,
  buyer: PublicKey,
  seller: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  creators: Array<PublicKey> | null = [],
  discountMint: PublicKey | null = null,
  discountTokenAccount: PublicKey | null = null,
  discountMetadata: PublicKey | null = null
) => {
  const isNative = treasuryMint == NATIVE_MINT;

  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccount = await getAssociatedTokenAddress(nftMint, buyer);
  const nftMetadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer
  );
  const sellerPaymentReceiptAccount = isNative
    ? seller.publicKey
    : await getAssociatedTokenAddress(treasuryMint, seller.publicKey);

  const escrowWallet = findEscrowWallet(buyer, auctionHouse);
  const listingAccount = findListingAccount(nftMint);
  console.log(listingAccount);
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  const offerAccount = findOfferAccount(buyer, nftMint);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        seller.publicKey,
        nftToAccount,
        buyer,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

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
        auctionHouseTreasury: auctionHouseTreasury,
        auctionHouse: auctionHouse,
        nftMint: nftMint,
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        metadata: nftMetadata,
        edition: edition,
        listingAccount: listingAccount,
        offerAccount: offerAccount,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .remainingAccounts(remainingAccounts)
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const deposit = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  amount: anchor.BN
) => {
  try {
    const isNative = treasuryMint == NATIVE_MINT;
    const auctionHouse = findAuctionHouse(authority, treasuryMint);
    const escrowWallet = findEscrowWallet(wallet.publicKey, auctionHouse);
    // const walletAta = (
    //   await getOrCreateAssociatedTokenAccount(
    //     program.provider.connection,
    //     wallet,
    //     treasuryMint,
    //     wallet.publicKey
    //   )
    // ).address;

    const tx = await program.methods
      .deposit(amount)
      .accounts({
        wallet: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        paymentAccount: wallet.publicKey,
        // paymentAccount: isNative ? wallet.publicKey : walletAta,
        escrowPaymentAccount: escrowWallet,
        auctionHouse: auctionHouse,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (error) {
    console.log('deposit error', error);
    return null;
  }
};

export const createAuction = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  price: anchor.BN,
  startTime: anchor.BN | null,
  endTime: anchor.BN | null
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const auctionAccount = findAuctionAccount(nftMint);
  const metadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    wallet.publicKey
  );
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        nftToAccount,
        auctionHouseTreasury,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

  try {
    const tx = await program.methods
      .createAuction(price, startTime, endTime)
      .accounts({
        seller: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        auctionAccount: auctionAccount,
        metadata: metadata,
        edition: edition,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const cancelAuction = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const auctionAccount = findAuctionAccount(nftMint);
  const metadata = await findMetadataPda(nftMint);
  const edition = await findEditionPda(nftMint);
  const nftFromAccount = await getAssociatedTokenAddress(
    nftMint,
    auctionHouseTreasury,
    true
  );
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    wallet.publicKey
  );
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  const fromTokenRecord = await findTokenRecordAddress(nftMint, nftFromAccount);
  const toTokenRecord = await findTokenRecordAddress(nftMint, nftToAccount);
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        nftToAccount,
        wallet.publicKey,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

  try {
    const tx = await program.methods
      .cancelAuction()
      .accounts({
        seller: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        auctionHouseTreasury: auctionHouseTreasury,
        nftMint: nftMint,
        nftFromAccount: nftFromAccount,
        nftToAccount: nftToAccount,
        auctionAccount: auctionAccount,
        metadata: metadata,
        edition: edition,
        fromTokenRecord: fromTokenRecord,
        toTokenRecord: toTokenRecord,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        authorizationRulesProgram: AUTHORIZATION_RULES_PROGRAM_ID,
        authorizationRules: new PublicKey('11111111111111111111111111111111'),
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        metadataProgram: METADATA_PROGRAM_ID,
      })
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};

export const offerToAuction = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey,
  price: anchor.BN
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const offerAccount = findOfferAuctionAccount(wallet.publicKey, nftMint);
  const auctionAccount = findAuctionAccount(nftMint);

  try {
    const tx = await program.methods
      .offerToAuction(price)
      .accounts({
        buyer: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        nftMint: nftMint,
        auctionAccount: auctionAccount,
        offerAccount: offerAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const cancelOfferFromAuction = async (
  program: anchor.Program,
  wallet: AnchorWallet,
  authority: PublicKey,
  treasuryMint: PublicKey,
  nftMint: PublicKey
) => {
  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const offerAccount = findOfferAuctionAccount(wallet.publicKey, nftMint);
  const auctionAccount = findAuctionAccount(nftMint);

  try {
    const tx = await program.methods
      .cancelOfferFromAuction()
      .accounts({
        buyer: wallet.publicKey,
        authority: authority,
        treasuryMint: treasuryMint,
        auctionHouse: auctionHouse,
        nftMint: nftMint,
        auctionAccount: auctionAccount,
        offerAccount: offerAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};

export const winPrize = async (
  program: anchor.Program,
  buyer: AnchorWallet,
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

  const auctionHouse = findAuctionHouse(authority, treasuryMint);
  const auctionHouseTreasury = findAuctionHouseTreasury(auctionHouse);
  const offerAccount = findOfferAuctionAccount(buyer.publicKey, nftMint);
  const auctionAccount = findAuctionAccount(nftMint);
  const nftToAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer.publicKey
  );
  const nftMetadata = await findMetadataPda(nftMint);
  const buyerReceiptTokenAccount = await getAssociatedTokenAddress(
    nftMint,
    buyer.publicKey
  );
  const sellerPaymentReceiptAccount = isNative
    ? seller
    : await getAssociatedTokenAddress(treasuryMint, seller);

  const escrowWallet = findEscrowWallet(buyer.publicKey, auctionHouse);
  const nftToAccountInfo = await program.provider.connection.getAccountInfo(
    nftToAccount
  );
  let preInstructions: anchor.web3.TransactionInstruction[] = [];
  if (!nftToAccountInfo) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        buyer.publicKey,
        nftToAccount,
        buyer.publicKey,
        nftMint,
        TOKEN_PROGRAM_ID
      )
    );
  }

  const remainingAccounts = creators
    ? creators.map((creator) => {
        return {
          pubkey: creator,
          isSigner: false,
          isWritable: true,
        };
      })
    : [];

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
        auctionAccount: auctionAccount,
        offerAccount: offerAccount,
        metadata: nftMetadata,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        ataProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .remainingAccounts(remainingAccounts)
      .preInstructions(preInstructions)
      .rpc({ commitment: 'confirmed' });
    return tx;
  } catch (ex) {
    console.log(ex);
  }
};
