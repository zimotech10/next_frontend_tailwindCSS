import React, { useState } from 'react';
import { DetailsCard } from './components/DetailsCard';
import { ListingModal } from './components/ListingModal'; // Import the ListingModal
import { NFT } from '@/models/NFT';
import { MakeOfferModal } from './components/MakeOfferModal';

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
  price?: string | null;
  startTime?: number;
  endTime?: number;
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
  listStatus,
  isOffered,
  offers,
  creators,
  price,
  startTime,
  endTime,
}) => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const openListModal = () => {
    setIsListModalOpen(true);
  };

  const closeListModal = () => {
    setIsListModalOpen(false);
  };

  const openOfferModal = () => {
    setIsOfferModalOpen(true);
  };

  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
  };

  return (
    <div className='relative'>
      <div className='flex flex-col md:flex-row md:gap-9 gap-3 items-center md:items-start'>
        <DetailsCard
          name={name}
          description={description}
          listingPrice={price}
          owner={owner}
          image={image}
          isOwner={isOwner}
          // attributes={attributes}
          detailsProfile={detailsProfile}
          listStatus={listStatus}
          isOffered={isOffered}
          mintAddress={mintAddress}
          offers={offers}
          creators={creators}
          startTime={startTime}
          endTime={endTime}
          openListModal={openListModal} // Pass openModal to DetailsCard
          openOfferModal={openOfferModal}
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
      {isOfferModalOpen && (
        <MakeOfferModal
          name={name}
          image={image}
          listStatus={listStatus}
          listingPrice={price}
          mintAddress={mintAddress}
          onClose={closeOfferModal}
        />
      )}
    </div>
  );
};
