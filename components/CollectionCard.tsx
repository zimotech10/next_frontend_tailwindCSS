'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IBM_Plex_Sans } from 'next/font/google';
import verifyIcon from '@/public/images/gold-verified.png';
import useScreen from '@/hooks/useScreen';
import { BigSpinner, SmallSpinner } from '@/components/Spinner';
import { Collection } from '@/models/Collection';

const ipmSans = IBM_Plex_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const CollectionCard: React.FC<Collection> = ({
  name,
  image,
  coverImage,
  description,
  floor,
  average,
  isVerified,
  gridType,
}) => {
  const isMobile = useScreen();
  const [coverImgLoading, setCoverImgLoading] = useState(true);
  const [profileImgLoading, setProfileImgLoading] = useState(true);

  // Determine styles based on gridType
  const cardWidth =
    gridType === 1
      ? isMobile
        ? '166px'
        : '220px'
      : isMobile
      ? '166px'
      : '396px';
  const coverImgWidth =
    gridType === 1
      ? isMobile
        ? '163px'
        : '220px'
      : isMobile
      ? '163px'
      : '396px';
  const coverImgHeight =
    gridType === 1
      ? isMobile
        ? '70px'
        : '130px'
      : isMobile
      ? '70px'
      : '167px';
  const profileImgSize =
    gridType === 1 ? (isMobile ? 34 : 40) : isMobile ? 34 : 81;

  return (
    <div
      className='flex flex-col items-center justify-start relative h-[280px] md:h-[418px]'
      style={{
        width: cardWidth,
        background:
          'linear-gradient(99deg, rgba(84, 50, 0, 0.09) 4.83%, rgba(80, 48, 0, 0.21) 100%)',
        border: '0.5px solid rgba(212, 134, 48, 0.20)',
      }}
    >
      {coverImgLoading && (
        <div
          className='absolute inset-0 flex items-center justify-center'
          style={{
            width: coverImgWidth,
            height: coverImgHeight,
          }}
        >
          <div className='loader'></div> {/* Add your spinner styling here */}
        </div>
      )}
      <img
        src={coverImage}
        alt='cover'
        style={{
          width: coverImgWidth,
          height: coverImgHeight,
          backgroundColor: 'transparent',
          display: coverImgLoading ? 'none' : 'block',
        }}
        onLoad={() => setCoverImgLoading(false)}
        onError={() => setCoverImgLoading(false)} // Hide spinner on error
      />
      {profileImgLoading && (
        <div
          className={`absolute ${
            gridType === 1 ? 'top-14 md:top-[80px]' : 'top-14 md:top-32'
          } flex items-center justify-center`}
          style={{
            width: profileImgSize,
            height: profileImgSize,
            borderRadius: '8px',
          }}
        >
          <div className='loader'>
            {isMobile ? <SmallSpinner /> : <BigSpinner />}
          </div>{' '}
          {/* Add your spinner styling here */}
        </div>
      )}
      <img
        src={image}
        width={profileImgSize}
        height={profileImgSize}
        alt='profile'
        className={`absolute top-14 ${
          gridType === 1 ? 'md:top-[110px]' : 'md:top-36'
        } rounded-[8px]`}
        onLoad={() => setProfileImgLoading(false)}
        onError={() => setProfileImgLoading(false)} // Hide spinner on error
        style={{
          display: profileImgLoading ? 'none' : 'block',
        }}
      />
      <div
        className={`flex flex-col absolute top-20 md:top-44 justify-center p-2 pt-2 ${
          gridType === 1 ? 'md:pt-0' : 'md:pt-10'
        }  md:p-4 w-full items-center`}
      >
        <div
          className={`text-sm flex flex-row gap-1 items-center font-semibold pt-[18px] ${
            gridType === 1 ? 'md:pt-[0px]' : 'md:pt-[18px]'
          } md:text-2xl ${ipmSans.className}`}
        >
          <span>{name}</span>
          {isVerified && (
            <Image
              src={verifyIcon}
              width={isMobile ? 6 : 15}
              height={isMobile ? 6 : 15}
              alt='verify'
            />
          )}
        </div>
        <div className={`text-xs md:text-sm text-gray-400 text-center pt-2`}>
          {description}
        </div>
      </div>
      <div className='flex flex-col absolute bottom-6 w-full px-4'>
        <div
          className='flex w-full flex-row justify-between text-gray-400 text-xs md:text-sm'
          style={{ fontSize: isMobile ? '10px' : '12px' }}
        >
          <span>Floor:</span>
          <span>30d Avg Price:</span>
        </div>
        <div
          className='flex w-full flex-row justify-between text-xs md:text-sm font-semibold'
          style={{ color: '#D48630' }}
        >
          <span>{floor} SOL</span>
          <span>{average} SOL</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
