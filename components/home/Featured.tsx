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

const Featured = () => {
  const [featuredItems, setFeaturedItems] = useState<any>();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const items = await CollectionApi.getFeaturedCollection();
        if (items) setFeaturedItems(items);
      } catch (error) {
        console.log('Error Fetching Featured Collections:', error);
      }
    };
    fetchFeaturedItems();
  }, []);

  return (
    <div className='md:pl-24 md:pt-14'>
      <div className='flex md:flex-row flex-col items-center md:mt-0 mt-10'>
        <div className='flex'>
          <Image
            src={Vector}
            alt='vector'
          ></Image>
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
          <Image
            src={Vector}
            alt='vector'
          ></Image>
        </div>
      </div>
      <div className='flex w-full md:flex-row flex-col items-center justify-center gap-10'>
        {featuredItems &&
          featuredItems.map((item: any, index: any) => (
            <Link
              href={{ pathname: `collection/${item.symbol}` }}
              key={index}
            >
              <CollectionCard
                id={item.id}
                name={item.name}
                description={item.description}
                symbol={item.symbol}
                logoImage={String(item.logoImage)}
                coverImage={String(item.baseImage)}
                floor={
                  Number(item.floor) % 1 !== 0 &&
                  item.floor.toString().split('.')[1]?.length > 4
                    ? parseFloat(item.floor).toFixed(4)
                    : item.floor
                }
                average={
                  Number(item.monthFloor) % 1 !== 0 &&
                  item.monthFloor.toString().split('.')[1]?.length > 4
                    ? parseFloat(item.monthFloor).toFixed(4)
                    : item.monthFloor
                }
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
