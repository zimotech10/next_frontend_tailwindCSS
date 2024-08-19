import LaunchItem from './LaunchItem';
import Vector from '@/public/images/Vector-pink.png';
import Image from 'next/image';
import localFont from 'next/font/local';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });
const launchesItems = [
  {
    image: '/images/upcoming1.png',
    timeLeft: '1D: 22: 3-M LEFT',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
  },
  {
    image: '/images/upcoming2.png',
    timeLeft: '1D: 22: 3-M LEFT',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
  },
  {
    image: '/images/upcoming3.png',
    timeLeft: '20TH MAY',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
  },
  {
    image: '/images/upcoming4.png',
    timeLeft: '20TH MAY',
    heading: 'Jues Fles',
    description: 'Blipmaps are a collection of 444 randomly generated NFTs on the blockchain.',
  },
];

const UpComing = () => {
  return (
    <div className='md:pl-28'>
      <div className='flex flex-row'>
        <Image src={Vector} alt='vector'></Image>
        <div
          className={`text-[24px] md:text-[32px]  ${electronica.className}`}
          style={{
            lineHeight: '55.6px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          }}
        >
          UPCOMING LAUNCHES
        </div>
        <Image src={Vector} alt='vector'></Image>
      </div>
      <div className='flex md:flex-row flex-col items-center justify-center gap-16'>
        {launchesItems.map((item, index) => (
          <LaunchItem
            key={index}
            timeLeft={item.timeLeft}
            heading={item.heading}
            description={item.description}
            image={item.image}
            imgWidth={259}
            imgHeight={302}
          />
        ))}
      </div>
    </div>
  );
};

export default UpComing;
