import React, { useState } from "react";
import { ItemImage } from "./components/ItemImage";
import { DetailsCard } from "./components/DetailsCard";
import { ListingModal } from "./components/ListingModal"; // Import the ListingModal
import { NFT } from "@/models/NFT";
import { OfferModal } from "./components/OfferModal";

interface NFTDetails extends NFT {
  isOwner: boolean;
  image: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

export const NFTDetail: React.FC<NFTDetails> = ({
  isOwner,
  name,
  description,
  owner,
  creatorAddress,
  image,
  attributes,
  mintAddress,
  isListed,
  offers,
}) => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const openListModal = () => {
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
  };

  const openBuyModal = () => {
    setIsBuyModalOpen(true);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:gap-9 gap-3 items-center md:items-start">
        <ItemImage imageSrc={image} />
        <DetailsCard
          name={name}
          description={description}
          owner={owner}
          creator={creatorAddress}
          isOwner={isOwner}
          attributes={attributes}
          isListed={isListed}
          mintAddress={mintAddress}
          offers={offers}
          openListModal={openListModal} // Pass openModal to DetailsCard
          openBuyModal={openBuyModal} // Pass openModal to DetailsCard
        />
      </div>
      {isListModalOpen && (
        <ListingModal
          name={name}
          image={image}
          mintAddress={mintAddress}
          onClose={closeListModal}
        />
      )}
      {isBuyModalOpen && (
        <OfferModal
          name={name}
          image={image}
          mintAddress={mintAddress}
          onClose={closeListModal}
        />
      )}
    </div>
  );
};
