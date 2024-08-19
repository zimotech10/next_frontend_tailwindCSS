'use client';
import React, { useState, useRef } from 'react';
import TopCollectionItem from './TopCollectionItem';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Vector from '@/public/images/Vector-red.png';
import Image from 'next/image';
import localFont from 'next/font/local';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });
const featuredItems = [
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
  {
    name: 'Antisocial Ape Club:YKTV',
    image: '/images/collection-avatar-1.png',
    price: 960.62,
    isVerified: true,
  },
];

const TopCollection = () => {
  const [sort, setSort] = useState('Most Recent');
  const [sortModal, setSortModal] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const selectSort = (method: string, orderBy: string, orderDir: string) => {
    setSort(method);
    setSortModal(false);
  };
  return (
    <div className='md:pl-28 md:pt-14'>
      <div className='flex md:flex-row flex-col gap-8 items-center md:mt-0 mt-10'>
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
            TOP COLLECTION
          </div>
          <Image src={Vector} alt='vector'></Image>
        </div>
        <div
          className='flex flex-row items-center cursor-pointer w-fit relative py-2 h-11 px-3 md:px-8 rounded-2xl md:rounded-[32px] gap-2 md:gap-4 border-[1px] border-[#191C1F]'
          style={{ backgroundColor: '#0B0A0A' }}
          onClick={() => setSortModal(!sortModal)}
          ref={sortRef}
        >
          <span style={{ fontSize: '14px', color: '#CDD4E6' }}>{sort}</span>
          <Icon icon='mingcute:down-line' width={20} />
          {sortModal && (
            <div className='absolute top-12 z-50 p-3 flex flex-col gap-3 rounded-md items-start' style={{ width: '170px', backgroundColor: '#0B0A0A' }}>
              <div onClick={() => selectSort('Most Recent', 'date', 'desc')} style={{ width: '100%', cursor: 'pointer', pointerEvents: 'auto' }}>
                <span>Most Recent</span>
              </div>
              <div onClick={() => selectSort('Oldest', 'date', 'asc')} style={{ width: '100%', cursor: 'pointer', pointerEvents: 'auto' }}>
                <span>Oldest</span>
              </div>
              <div onClick={() => selectSort('Price: Low to High', 'price', 'asc')} style={{ width: '100%', cursor: 'pointer', pointerEvents: 'auto' }}>
                <span>Price: Low to High</span>
              </div>
              <div onClick={() => selectSort('Price: High to Low', 'price', 'desc')} style={{ width: '100%', cursor: 'pointer', pointerEvents: 'auto' }}>
                <span>Price: High to Low</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-wrap md:flex-row flex-col items-center justify-center gap-16 pt-8'>
        {featuredItems.map((item, index) => (
          <TopCollectionItem key={index} id={index + 1} name={item.name} image={`${item.image}`} imgWidth={96} imgHeight={21} />
        ))}
      </div>
      <div className='flex justify-center pt-8'>
        <button
          className='px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
          style={{
            border: '2px solid #FFB703',
            color: '#F5F5F5',
          }}
        >
          Explore Collection
        </button>
      </div>
    </div>
  );
};

export default TopCollection;