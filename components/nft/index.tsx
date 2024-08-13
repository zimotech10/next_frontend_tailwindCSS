import React, { useState } from 'react';
import { ItemImage } from './components/ItemImage';
import { DetailsCard } from './components/DetailsCard';
import { ListingModal } from './components/ListingModal'; // Import the ListingModal
import { NFT } from '@/models/NFT';
import { OfferModal } from './components/OfferModal';

interface NFTDetails extends NFT {
  isOwner: boolean;
  image: string;
  attributes?: {
    traitType: string;
    value: string;
  }[];
  detailsProfile?: {
    creatorRoyaltyFee: string;
    itemContent: string;
  };
}

export const NFTDetail: React.FC<NFTDetails> = ({
  isOwner,
  name,
  description,
  owner,
  image,
  attributes,
  detailsProfile,
  mintAddress,
  isListed,
  isOffered,
  offers,
  creators,
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
    <div className='relative'>
      <div className='flex flex-col md:flex-row md:gap-9 gap-3 items-center md:items-start'>
        <DetailsCard
          name={name}
          description={description}
          listingPrice={'0.35'}
          owner={owner}
          image={image}
          isOwner={isOwner}
          attributes={attributes}
          detailsProfile={detailsProfile}
          isListed={isListed}
          isOffered={isOffered}
          mintAddress={mintAddress}
          offers={offers}
          creators={creators}
          openListModal={openListModal} // Pass openModal to DetailsCard
          openBuyModal={openBuyModal} // Pass openModal to DetailsCard
        />
      </div>
      {isListModalOpen && <ListingModal name={name} image={image} mintAddress={mintAddress} onClose={closeListModal} />}
      {isBuyModalOpen && <OfferModal name={name} image={image} mintAddress={mintAddress} onClose={closeBuyModal} />}
    </div>
  );
};
