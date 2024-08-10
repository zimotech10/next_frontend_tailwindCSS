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
import { NftApi } from "@/api/nftApi";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function NFTDetailsPage() {
  const searchParams = useSearchParams();
  const uri = searchParams.get("uri");
  const mintAddress = searchParams.get("mintAddress");
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isListed, setIsListed] = useState<boolean>(false);
  const [isOffered, setIsOffered] = useState<boolean>(false);
  const [owner, setOwner] = useState("");
  const [offers, setOffers] = useState();

  useEffect(() => {
    if (uri) {
      getMetadata(uri)
        .then((metadata: NFTMetadata) => {
          setMetadata(metadata);
        })
        .catch((error) => {
          console.error("Error fetching metadata:", error);
          setLoading(false);
        });
      console.log(metadata);
    }
  }, [uri]);

  useEffect(() => {
    const fetchNFTStatus = async() => {
      if (mintAddress) {
        await NftApi.getNFTStatus(mintAddress)
          .then(({isOwner, isListed, isOffered, bids}) => {
            if(isOwner){
              setIsOwner(isOwner);
            }
            if(isListed){
              setIsListed(isListed);
            }
            if(bids){
              setOffers(bids);
            }
            if(isOffered){
              setIsOffered(isOffered);
            }
            if(owner){
              setOwner(owner);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching NFT owner:", error);
            setLoading(false);
          });
      }
    }
    fetchNFTStatus()
    
  }, [mintAddress]);

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
      {loading ? (
        <BigSpinner />
      ) : metadata ? (
        <NFTDetail
          creatorAddress={metadata.properties.creators[0].address.toString()}
          mintAddress={mintAddress}
          description={metadata.description}
          name={metadata.name}
          owner={owner?.toString()}
          image={metadata.image}
          uri={uri}
          attributes={metadata.attributes}
          isOwner={isOwner}
          isListed={isListed}
          isOffered={isOffered}
          offers={offers}
        />
      ) : (
        <div>Loading metadata...</div>
      )}
    </div>
  );
}
