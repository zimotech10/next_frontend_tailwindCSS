'use client';
import localFont from 'next/font/local';
import useScreen from '@/hooks/useScreen';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });
const electronicaOutline = localFont({ src: '../../fonts/electronica-display-2.otf' });

const Lampapuy = () => {
  const isMobile = useScreen();
  return (
    <div className='flex flex-col bg-black text-center mt-14 px-4' id='lampapuy'>
      <div className='flex items-center justify-center'>
        <h1 className={`text-transparent text-[78px] sm:text-[5rem] uppercase text-[#F5F5F5] z-20 opacity-40 ${electronicaOutline.className}`}>
          Lampapuy is now on Solana
        </h1>
      </div>
      <div className='pt-0 z-10'>
        <div
          className={`font-normal text-lg text-center z-10 ${electronica.className}`}
          style={{
            background: 'linear-gradient(140deg, #FFEA7F 9.83%, #AB5706 95.76%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            fontSize: isMobile ? '18px' : '40px',
            color: 'transparent',
          }}
        >
          Lampapuy is now on Solana
        </div>
        <p className='mt-4 text-[#AFAFAF]'>
          Earn more sales at lampapuy.com by owning NFT.
          <br />
          Each Lampa will reduce the service fee by 2%
        </p>
        <button
          className='my-4 text-black font-bold text-base md:mb-12 md:mt-8'
          style={{
            background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
            borderRadius: '22px',
            width: '172px',
            height: '43px',
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Lampapuy;
