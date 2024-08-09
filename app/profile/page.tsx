"use client";

import React, { useState, useEffect } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { useWallet } from "@solana/wallet-adapter-react";
import solanaIcon from "@/public/images/solana-logo.png";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import redirectIcon from "@/public/vectors/redirect.svg";
import { formatAddress } from "@/hooks/useFormatAddress";
import { getWalletNFTs } from "@/utils/getWalletNFTs";
import ItemCard from "@/components/ItemCard";
import { NFT } from "@/models/NFT";
import BigSpinner from "@/components/Spinner";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function ProfilePage() {
  const wallet = useWallet();
  const address = wallet.publicKey?.toString();
  const [copied, setCopied] = useState(false);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      getWalletNFTs(address)
        .then((nfts: NFT[]) => {
          setNFTs(nfts);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching NFTs:", error);
          setLoading(false);
        });
    }
  }, [address]);

  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const openSolscan = (address: string | undefined) => {
    if (address) {
      const solscanUrl = `https://solscan.io/account/${address}`;
      window.open(solscanUrl, "_blank");
    }
  };

  const formattedAddress = formatAddress(address);

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
      <div className="flex flex-row justify-center md:justify-end p-8 bg-[#4343434d] rounded-xl">
        {wallet && address && (
          <div className="p-3 rounded-full bg-black flex flex-row items-center gap-2">
            <Image src={solanaIcon} width={24} height={24} alt="solana" />
            <div>{formattedAddress}</div>
            <button
              onClick={() => copyToClipboard(address)}
              className="flex items-center"
            >
              <Icon
                icon={copied ? "pajamas:task-done" : "solar:copy-outline"}
                width={24}
              />
            </button>
            <button
              onClick={() => openSolscan(address)}
              className="flex items-center"
            >
              <Image src={redirectIcon} width={24} height={24} alt="solana" />
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <BigSpinner />
      ) : (
        <div className="flex gap-4 md:gap-6 flex-wrap py-3 md:py-0 justify-center">
          {nfts.length === 0 ? (
            <div className="text-neutral-500 text-xl">No NFT found</div>
          ) : (
            nfts.map((nft: NFT) => (
              <ItemCard
                key={nft.id}
                name={nft.name}
                uri={nft.uri}
                mintAddress={nft.mintAddress?.toString()}
              />
            ))
          )}
        </div>
      ) }
    </div>
  );
}
