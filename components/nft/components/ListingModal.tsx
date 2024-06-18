import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import solanaIcon from "@/public/images/solana-logo.png";
import { ItemSummary } from "@/components/ItemSummary";
import { listing } from "@/web3/contract";
import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import {
  connection,
  PROGRAM_ID,
  PROGRAM_INTERFACE,
  commitmentLevel,
} from "@/web3/utils";
import { web3 } from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

type ListingType = "listing-fixed" | "listing-auction";
import { NATIVE_MINT } from "@solana/spl-token";

interface ListingModalProps {
  name: string;
  image: string;
  mintAddress?: string;
  onClose: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  name,
  image,
  mintAddress,
  onClose,
}) => {
  const [listingType, setListingType] = useState<ListingType>("listing-fixed");
  const [fixedPrice, setFixedPrice] = useState<number | undefined>(undefined);
  const [minimumBid, setMinimumBid] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [expirationTime, setExpirationTime] = useState<string | undefined>(
    undefined
  );
  const wallet = useAnchorWallet();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixedPrice(Number(event.target.value));
  };

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinimumBid(Number(event.target.value));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationTime(event.target.value);
  };

  const handleListing = async () => {
    if (!wallet || !wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    if (!fixedPrice) {
      alert("Please enter a price.");
      return;
    }

    setLoading(true);

    try {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const price = new BN(fixedPrice * web3.LAMPORTS_PER_SOL); // Convert SOL to lamports
      const expiry = new BN(0); // Set expiry to 0 for fixed price listing

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(mintAddress as string);
      console.log(mintAddress);
      console.log(nftMint.toString());

      const tx = await listing(
        program,
        wallet,
        authority,
        treasuryMint,
        nftMint,
        price,
        expiry
      );

      if (tx) {
        alert("Listing successful!");
      } else {
        alert("Listing failed.");
      }
    } catch (error) {
      console.error("Listing error:", error);
      alert("An error occurred during listing.");
    }

    setLoading(false);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <motion.div
        className="relative bg-[#0B0A0A] p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 md:gap-9 max-h-full overflow-y-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          X
        </button>
        <div className="flex flex-col gap-6 w-full md:w-[576px]">
          <div className="text-base md:text-2xl">
            Select your listing method
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-[576px] p-4 gap-[10px] bg-[#0B0A0A] rounded-lg">
            <motion.button
              onClick={() => setListingType("listing-fixed")}
              className="flex flex-col gap-1 justify-center items-center py-4 border w-full rounded-[22px]"
              animate={{
                borderColor:
                  listingType === "listing-fixed" ? "#FFEA7F" : "#0B0A0A",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-bold text-base">Fixed Price</span>
              <span className="text-[#afafaf] font-normal text-sm">
                Sell NFT for a fixed price
              </span>
            </motion.button>
            <motion.button
              onClick={() => setListingType("listing-auction")}
              className="flex flex-col gap-1 justify-center items-center py-4 border w-full rounded-[22px]"
              animate={{
                borderColor:
                  listingType === "listing-auction" ? "#FFEA7F" : "#0B0A0A",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-bold text-base">Auction</span>
              <span className="text-[#afafaf] font-normal text-sm">
                Start an Auction to sell NFT
              </span>
            </motion.button>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
            <div className="w-[240px] flex justify-center items-center p-[14px] border rounded-md">
              <Image src={image} alt="nftItem" width={240} height={200} />
            </div>
            <div className="flex flex-col gap-8 w-full">
              {listingType === "listing-fixed" ? (
                <div className="flex flex-col gap-[10px] w-full">
                  <span className="font-semibold text-base">Price</span>
                  <div className="text-[#afafaf] font-normal text-sm">
                    Enter the price for 1 item (in SOL).
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <Image src={solanaIcon} width={24} height={24} alt="sol" />
                    <input
                      type="number"
                      className="p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-full"
                      placeholder="Enter Amount"
                      value={fixedPrice ?? ""}
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[10px] w-full">
                  <span className="font-semibold text-base">Minimum Bid</span>
                  <div className="text-[#afafaf] font-normal text-sm">
                    Set the minimum bid you want to consider.
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <Image src={solanaIcon} width={24} height={24} alt="sol" />
                    <input
                      type="number"
                      className="p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-full"
                      placeholder="Enter Amount"
                      value={minimumBid ?? ""}
                      onChange={handleBidChange}
                    />
                  </div>
                  <span className="font-semibold text-base">
                    Expiration Date
                  </span>
                  <div className="text-[#afafaf] font-normal text-sm">
                    Set the minimum bid Auction automatically ends on this date
                    and the highest bidder wins.
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="date"
                      className="p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer"
                      placeholder="DD-MM-YYYY"
                      value={expirationDate ?? ""}
                      onChange={handleDateChange}
                    />
                    <span>UTC</span>
                    <input
                      type="time"
                      className="p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer"
                      placeholder="HH:MM"
                      value={expirationTime ?? ""}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ItemSummary usage={listingType} name={name} image={image}>
          {listingType === "listing-fixed" ? (
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Quantity:
                </span>
                <span className="text-base font-semibold">x1</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Platform Fee:
                </span>
                <span className="text-base font-semibold">2%</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Price:
                </span>
                <span className="text-base font-semibold">
                  {fixedPrice} SOL
                </span>
              </div>
              <button
                className={`my-2 py-3 rounded-full
                font-semibold ${
                  fixedPrice
                    ? "bg-gradient-orange text-black"
                    : "bg-none border"
                }`}
                onClick={() => handleListing()}
              >
                List NFT for Sale
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Quantity:
                </span>
                <span className="text-base font-semibold">x1</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Platform Fee:
                </span>
                <span className="text-base font-semibold">2%</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Minimum Bid:
                </span>
                <span className="text-base font-semibold">
                  {minimumBid} SOL
                </span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="font-normal text-[#afafaf] text-sm">
                  Expiration Date:
                </span>
                <span className="text-base font-semibold">
                  {expirationDate} {expirationTime} UTC
                </span>
              </div>
              <button
                className={`my-2 py-3 rounded-full font-semibold ${
                  minimumBid && expirationDate && expirationTime
                    ? "bg-gradient-orange text-black"
                    : "bg-none border"
                }`}
              >
                Start Auction
              </button>
            </div>
          )}
        </ItemSummary>
      </motion.div>
    </div>
  );
};
