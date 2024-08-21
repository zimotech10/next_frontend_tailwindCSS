'use client';
import React, { useState, useRef, useEffect } from 'react';
import TopCollectionItem from './TopCollectionItem';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Vector from '@/public/images/Vector-red.png';
import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';
import { CollectionApi } from '@/api/collectionApi';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });

const TopCollection = () => {
  const [featuredItems, setFeaturedItems] = useState<any>();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const items = await CollectionApi.getTopCollection();
        if (items) setFeaturedItems(items);
      } catch (error) {
        console.log('Error Fetching Featured Collections:', error);
      }
    };
    fetchFeaturedItems();
  }, []);

  return (
    <div className='md:pl-28 md:pt-14'>
      <div className='flex md:flex-row flex-col gap-8 items-center md:mt-0 mt-10'>
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
            TOP COLLECTION
          </div>
          <Image
            src={Vector}
            alt='vector'
          ></Image>
        </div>
      </div>
      <div className='flex flex-wrap md:flex-row flex-col items-center justify-center gap-16 pt-8'>
        {featuredItems &&
          featuredItems.map((item: any, index: any) => (
            <TopCollectionItem
              key={index}
              id={index + 1}
              name={item.name}
              symbol={item.symbol}
              image={`${item.logoimage}`}
              price={
                Number(item.avg_nft_value) % 1 !== 0 &&
                item.avg_nft_value.toString().split('.')[1]?.length > 4
                  ? parseFloat(item.avg_nft_value).toFixed(4)
                  : item.avg_nft_value
              }
              imgWidth={96}
              imgHeight={21}
            />
          ))}
      </div>
      <div className='flex justify-center pt-8'>
        <Link
          href='/explorer'
          className='px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
          style={{
            border: '2px solid #FFB703',
            color: '#F5F5F5',
          }}
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

export default TopCollection;
