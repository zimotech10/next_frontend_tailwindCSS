'use client';

import { IBM_Plex_Sans } from 'next/font/google';
import Link from 'next/link';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { NFTDetail } from '@/components/nft';
import { useSearchParams } from 'next/navigation';
import { getMetadata } from '@/utils/getMetadata';
import { useState, useEffect } from 'react';
import { NFTMetadata } from '@/models/NFT';
import { getNFTOwner } from '@/utils/getNFTOwner';
import { BigSpinner } from '@/components/Spinner'; // Assuming Spinner component is in the components folder
import { NftApi } from '@/api/nftApi';

const ibmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function NFTDetailsPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const image = searchParams.get('image');
  const mintAddress = searchParams.get('mintAddress');
  const price = searchParams.get('price');
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [listStatus, setlistStatus] = useState(0);
  const [isOffered, setIsOffered] = useState<boolean>(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [offers, setOffers] = useState();
  const [creators, setCreators] = useState();

  // useEffect(() => {
  //   if (uri) {
  //     getMetadata(uri)
  //       .then((metadata: NFTMetadata) => {
  //         setMetadata(metadata);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching metadata:', error);
  //         setLoading(false);
  //       });
  //   }
  // }, [uri]);

  useEffect(() => {
    const fetchNFTStatus = async () => {
      if (mintAddress) {
        await NftApi.getNFTStatus(mintAddress)
          .then(
            ({
              isOwner,
              listStatus,
              isOffered,
              owner,
              bids,
              creators,
              startTime,
              endTime,
            }) => {
              if (isOwner) {
                setIsOwner(isOwner);
              }
              if (listStatus) {
                setlistStatus(listStatus);
              }
              if (bids) {
                setOffers(bids);
              }
              if (isOffered) {
                setIsOffered(isOffered);
              }
              if (owner) {
                setOwner(owner);
              }
              if (creators) {
                setCreators(creators);
              }
              if (startTime) {
                setStartTime(startTime);
              }
              if (endTime) {
                setEndTime(endTime);
              }
              setLoading(false);
            }
          )
          .catch((error) => {
            console.error('Error fetching NFT owner:', error);
            setLoading(false);
          });
      }
    };
    fetchNFTStatus();
  }, [mintAddress]);

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
      {loading ? (
        <BigSpinner />
      ) : (
        <NFTDetail
          mintAddress={mintAddress}
          // description={metadata.description}
          description={
            'Bridging the gap between 1/1 art and PFP, Deck of Dark Dreams is an ever-evolving collectible and tangible CNFT art project, set in a dystopian and chaotic universe exploring the darkest depths of the human condition.'
          }
          name={String(name)}
          owner={owner?.toString()}
          image={String(image)}
          // uri={uri}
          // attributes={metadata.attributes}
          attributes={[
            { traitType: 'Head', value: 'Grey and silver' },
            { traitType: 'Head', value: 'Grey and silver' },
            { traitType: 'Head', value: 'Grey and silver' },
          ]}
          detailsProfile={{
            creatorRoyaltyFee: '10',
            itemContent: 'JPEG Image (Size 6mb)',
          }}
          isOwner={isOwner}
          listStatus={listStatus}
          isOffered={isOffered}
          offers={offers}
          creators={creators}
          price={price}
          startTime={startTime}
          endTime={endTime}
        />
      )}
    </div>
  );
}
