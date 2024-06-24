import React, { useState } from "react";
import { ItemImage } from "./components/ItemImage";
import { DetailsCard } from "./components/DetailsCard";
import { ListingModal } from "./components/ListingModal"; // Import the ListingModal
import { NFT } from "@/models/NFT";

interface NFTDetails extends NFT {
  userType: "owner" | "user";
  image: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

export const NFTDetail: React.FC<NFTDetails> = ({
  userType,
  name,
  description,
  owner,
  creatorAddress,
  image,
  attributes,
  mintAddress,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          userType={userType}
          attributes={attributes}
          openModal={openModal} // Pass openModal to DetailsCard
        />
      </div>
      {isModalOpen && (
        <ListingModal
          name={name}
          image={image}
          mintAddress={mintAddress}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
