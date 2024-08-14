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
  const uri = searchParams.get('uri');
  const mintAddress = searchParams.get('mintAddress');
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [listStatus, setlistStatus] = useState(0);
  const [isOffered, setIsOffered] = useState<boolean>(false);
  const [offers, setOffers] = useState();
  const [creators, setCreators] = useState();

  useEffect(() => {
    if (uri) {
      getMetadata(uri)
        .then((metadata: NFTMetadata) => {
          setMetadata(metadata);
        })
        .catch((error) => {
          console.error('Error fetching metadata:', error);
          setLoading(false);
        });
    }
  }, [uri]);

  useEffect(() => {
    const fetchNFTStatus = async () => {
      if (mintAddress) {
        await NftApi.getNFTStatus(mintAddress)
          .then(({ isOwner, listStatus, isOffered, owner, bids, creators }) => {
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
            setLoading(false);
          })
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
      ) : metadata ? (
        <NFTDetail
          mintAddress={mintAddress}
          // description={metadata.description}
          description={
            'Bridging the gap between 1/1 art and PFP, Deck of Dark Dreams is an ever-evolving collectible and tangible CNFT art project, set in a dystopian and chaotic universe exploring the darkest depths of the human condition.'
          }
          name={metadata.name}
          owner={owner?.toString()}
          image={metadata.image}
          uri={uri}
          // attributes={metadata.attributes}
          attributes={[
            { traitType: 'Head', value: 'Grey and silver' },
            { traitType: 'Head', value: 'Grey and silver' },
            { traitType: 'Head', value: 'Grey and silver' },
          ]}
          detailsProfile={{ creatorRoyaltyFee: '10', itemContent: 'JPEG Image (Size 6mb)' }}
          isOwner={isOwner}
          listStatus={listStatus}
          isOffered={isOffered}
          offers={offers}
          creators={creators}
        />
      ) : (
        <div>Cannot find metadata</div>
      )}
    </div>
  );
}
