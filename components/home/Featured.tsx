'use client';
import FeaturedCard from './FeaturedItem';
import Vector from '@/public/images/Vector-brown.png';
import Image from 'next/image';
import localFont from 'next/font/local';
import { useEffect, useState } from 'react';
import { CollectionApi } from '@/api/collectionApi';
import CollectionCard from '../CollectionCard';
import Link from 'next/link';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });
const featuredItems = [
  {
    id: 0,
    name: 'Test1',
    image: '/images/collection-profile.png',
    baseImage: '/images/collection-cover.png',
    timeLeft: '1D: 22: 3-M LEFT',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
    isVerified: true,
  },
  {
    id: 1,
    name: 'Test2',
    image: '/images/collection-profile.png',
    baseImage: '/images/collection-cover.png',
    timeLeft: '1D: 22: 3-M LEFT',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
    isVerified: true,
  },
  {
    id: 2,
    name: 'Test3',
    image: '/images/collection-profile.png',
    baseImage: '/images/collection-cover.png',
    timeLeft: '20TH MAY',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
    isVerified: true,
  },
  {
    id: 3,
    name: 'Test4',
    image: '/images/collection-profile.png',
    baseImage: '/images/collection-cover.png',
    timeLeft: '20TH MAY',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
    isVerified: true,
  },
];

const Featured = () => {
  // const [featuredItems, setFeaturedItems] = useState<any>();

  // useEffect(() => {
  //   const fetchFeaturedItems = async () => {
  //     const items = await CollectionApi.getFeaturedCollection();
  //     if (items) setFeaturedItems(items);
  //   };
  //   fetchFeaturedItems();
  // }, []);

  return (
    <div className='md:pl-24 md:pt-14'>
      <div className='flex md:flex-row flex-col items-center md:mt-0 mt-10'>
        <div className='flex'>
          <Image src={Vector} alt='vector'></Image>
          <div
            className={`text-[24px] md:text-[32px]  ${electronica.className}`}
            style={{
              lineHeight: '55.6px',
              letterSpacing: '-0.01em',
              fontWeight: '400',
            }}
          >
            FEATURED COLLECTION
          </div>
          <Image src={Vector} alt='vector'></Image>
        </div>
      </div>
      <div className='flex w-full md:flex-row flex-col items-center justify-center gap-10'>
        {featuredItems &&
          featuredItems.map((item: any, index: any) => (
            <Link href={{ pathname: `collection/${item.symbol}` }} key={index}>
              <CollectionCard
                id={item.id}
                name={item.name}
                description={item.description}
                symbol={item.symbol}
                // logoImage={String(item.logoImage)}
                // coverImage={String(item.baseImage)}
                isVerified={item.isVerified}
                gridType={0}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Featured;
