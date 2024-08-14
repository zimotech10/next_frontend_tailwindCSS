import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Image from 'next/image';
import solanaIcon from '../public/images/solana-logo.png';
import defaultImage from '../public/images/default.png'; // Import your default image
import useScreen from '@/hooks/useScreen';
import { NFT } from '@/models/NFT';
import Link from 'next/link';
import { getImageUrl } from '@/utils/getImageUrl';
import HeartIcon from '@/public/images/heart-filled.png';

const ItemCard: React.FC<NFT> = ({ name, uri, collection, price, mintAddress, gridType }) => {
  const isMobile = useScreen();
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (uri) {
      getImageUrl(uri).then(setImageUrl).catch(console.error);
    }
  }, [uri]);

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setShowButton(false);
    }
  }, [isHovered]);

  const imageStyle = {
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.3s ease',
    width: gridType === 1 ? (isMobile ? '139px' : '139px') : isMobile ? '139px' : '259px',
    height: gridType === 1 ? (isMobile ? '160px' : '130px') : isMobile ? '160px' : '250px',
  };

  const cardWidth = gridType === 1 ? (isMobile ? '160px' : '174px') : isMobile ? '160px' : '294px';

  return (
    <>
      {imageUrl && (
        <div
          className='h-full flex flex-col p-2 gap-1 md:gap-3 md:p-4 relative cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ backgroundColor: '#0A0A0A', width: cardWidth }}
        >
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              {collection && <div className='font-medium text-xs md:text-sm text-neutral-500'>{collection}</div>}
              <div className='font-medium text-xs md:text-base'>{name.length > 12 ? `${name.substring(0, 12)}...` : name}</div>
            </div>
            <div>
              <Icon icon='mingcute:more-2-line' />
            </div>
          </div>

          <div className='overflow-hidden' style={{ maxWidth: imageStyle.width }}>
            <img
              src={imageUrl}
              alt='image'
              style={imageStyle}
              onError={(e) => {
                e.currentTarget.src = defaultImage.src; // Replace with the default image if the original fails
              }}
            />
          </div>
          {showButton && (
            <Link
              href={{
                pathname: `/nfts/${name}`,
                query: {
                  uri: uri,
                  mintAddress: mintAddress,
                },
              }}
              className={` ${gridType === 1 ? 'md:w-[120px] md:text-[12px]' : 'md:w-[180px] md:text-[20px]'} 
                items-center flex flex-row gap-1 py-1 px-4 w-[120px] text-[12px] justify-center 
                font-semibold rounded-2xl text-black shadow-md absolute top-1/2 left-1/2 
                transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                transition: 'opacity 0.3s ease-in',
                opacity: isHovered ? 1 : 0,
                background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
              }}
            >
              <Icon icon='ph:lightning' style={{ color: 'black' }} />
              View Details
            </Link>
          )}
          {/* {showButton && (
            <div className='flex flex-row items-center gap-1 absolute top-[calc(50%-40px)] md:right-6 right-3'>
              <Icon
                icon='iconamoon:heart-bold'
                style={{
                  background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                }}
              />
              <span style={{ fontSize: '10px', color: '#AFAFAF' }}>1.2k</span>
            </div>
          )} */}
          {price && (
            <div className='flex flex-col pt-1 md:pt-1'>
              <div className='text-xs text-neutral-400'>Price</div>
              <div className='text-xs flex flex-row gap-2 md:gap-2 md:text-sm md:pt-1 pt-1'>
                <Image src={solanaIcon} alt='solana' style={{ width: '16.78px', height: '16.78px' }} />
                <span>{price} SOL</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ItemCard;
