import React, { useState } from 'react';
import { DetailsCard } from './components/DetailsCard';
import { ListingModal } from './components/ListingModal'; // Import the ListingModal
import { NFT } from '@/models/NFT';
import { OfferModal } from './components/OfferModal';

interface NFTDetails extends NFT {
  isOwner: boolean;
  image: string;
  listingPrice: any;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
  detailsProfile?: {
    creatorRoyaltyFee: string;
    itemContent: string;
  };
  price?: string | null;
  startTime?: number;
  endTime?: number;
}

export const NFTDetail: React.FC<NFTDetails> = ({
  isOwner,
  listingPrice,
  name,
  description,
  owner,
  image,
  attributes,
  detailsProfile,
  mintAddress,
  listStatus,
  isOffered,
  offers,
  creators,
  price,
  startTime,
  endTime,
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
          listingPrice={listingPrice}
          owner={owner}
          image={image}
          isOwner={isOwner}
          attributes={attributes}
          detailsProfile={detailsProfile}
          listStatus={listStatus}
          isOffered={isOffered}
          mintAddress={mintAddress}
          offers={offers}
          creators={creators}
          startTime={startTime}
          endTime={endTime}
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
          listStatus={listStatus}
          mintAddress={mintAddress}
          onClose={closeBuyModal}
        />
      )}
    </div>
  );
};
