"use client";

import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { NFTDetail } from "@/components/nft";
import { useSearchParams } from "next/navigation";
import { getMetadata } from "@/utils/getMetadata";
import { useState, useEffect } from "react";
import { NFTMetadata } from "@/models/NFT";
import { getNFTOwner } from "@/utils/getNFTOwner";
import BigSpinner from "@/components/Spinner"; // Assuming Spinner component is in the components folder

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function NFTDetailsPage() {
  const searchParams = useSearchParams();
  const uri = searchParams.get("uri");
  const mintAddress = searchParams.get("mintAddress");
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uri) {
      getMetadata(uri)
        .then((metadata: NFTMetadata) => {
          setMetadata(metadata);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching metadata:", error);
          setLoading(false);
        });
      console.log(metadata);
    }
  }, [uri]);

  useEffect(() => {
    if (mintAddress) {
      getNFTOwner(mintAddress)
        .then((owner: string | undefined) => {
          if (owner) {
            setOwner(owner);
          } else {
            console.error("Owner is undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching NFT owner:", error);
        });
    }
  }, [mintAddress]);

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
      <Link
        href="/profile"
        className="flex flex-row items-center md:gap-4 gap-2"
      >
        <Icon icon="mingcute:arrow-left-line" width={30} />
        <span className="text-xl md:text-2xl font-bold">Back</span>
      </Link>
      {loading ? (
        <BigSpinner />
      ) : metadata ? (
        <NFTDetail
          creatorAddress={metadata.properties.creators[0].address.toString()}
          description={metadata.description}
          name={metadata.name}
          userType="owner"
          owner={owner?.toString()}
          image={metadata.image}
          uri={uri}
          attributes={metadata.attributes}
        />
      ) : (
        <div>Loading metadata...</div>
      )}
    </div>
  );
}
