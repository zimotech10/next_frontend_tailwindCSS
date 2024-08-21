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
  // const [sort, setSort] = useState('Most Recent');
  // const [sortModal, setSortModal] = useState(false);
  // const sortRef = useRef<HTMLDivElement>(null);

  // const selectSort = (method: string, orderBy: string, orderDir: string) => {
  //   setSort(method);
  //   setSortModal(false);
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
  //     setSortModal(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

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
        {/* <div
          className='flex flex-row items-center cursor-pointer w-fit relative py-2 h-11 px-3 md:px-8 rounded-2xl md:rounded-[32px] gap-2 md:gap-4 border-[1px] border-[#191C1F]'
          style={{ backgroundColor: '#0B0A0A' }}
          onClick={() => setSortModal(!sortModal)}
          ref={sortRef}
        >
          <span style={{ fontSize: '14px', color: '#CDD4E6' }}>{sort}</span>
          <Icon
            icon='mingcute:down-line'
            width={20}
          />
          {sortModal && (
            <div
              className='absolute top-12 z-50 p-3 flex flex-col gap-3 rounded-md items-start'
              style={{ width: '170px', backgroundColor: '#0B0A0A' }}
            >
              <div
                onClick={() => selectSort('Most Recent', 'date', 'desc')}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <span>Most Recent</span>
              </div>
              <div
                onClick={() => selectSort('Oldest', 'date', 'asc')}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <span>Oldest</span>
              </div>
              <div
                onClick={() => selectSort('Price: Low to High', 'price', 'asc')}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <span>Price: Low to High</span>
              </div>
              <div
                onClick={() =>
                  selectSort('Price: High to Low', 'price', 'desc')
                }
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
              >
                <span>Price: High to Low</span>
              </div>
            </div>
          )}
        </div> */}
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
              price={`${item.avg_nft_value}`}
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
