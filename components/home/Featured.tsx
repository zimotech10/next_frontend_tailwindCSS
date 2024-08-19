import FeaturedCard from './FeaturedItem';
import Vector from '@/public/images/Vector-brown.png';
import Image from 'next/image';
import localFont from 'next/font/local';

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
  return (
    <div className='md:pl-28 md:pt-14'>
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
      <div className='flex md:flex-row flex-col items-center justify-center gap-16 pr-12'>
        {featuredItems.map((item, index) => (
          <FeaturedCard
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            image={`${item.image}`}
            coverImage={`${item.baseImage}`}
            isVerified={item.isVerified}
            gridType={0}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
