import AdvertisingImg from '@/public/images/creators/advertising.png';
import CustomWebsiteImg from '@/public/images/creators/custom-website.png';
import ProSupport from '@/public/images/creators/pro-support.png';
import DiscoverPlanImg from '@/public/images/creators/discover-plan.png';
import Vector from '@/public/images/Vector-green.png';
import localFont from 'next/font/local';
import Image from 'next/image';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });
const electronicaInLine = localFont({ src: '../../fonts/ElectronicaInline.otf' });

const Creators = () => {
  return (
    <div className='md:pl-28 md:pt-14'>
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
          HOW WE HELP CREATORS
        </div>
        <Image src={Vector} alt='vector'></Image>
      </div>
      <div className='flex flex-col pl-20 gap-20'>
        <div className='flex flex-row justify-between pr-[170px]'>
          <div className='flex flex-col'>
            <Image src={AdvertisingImg} alt='Advertising'></Image>
            <div className={`pt-6 text-3xl ${electronica.className}`}>ADVERTISING</div>
            <div className='pt-6 text-[#AFAFAF] text-lg w-[400px]'>
              With your email we create a Remote Digital Wallet to store your NFTs, and give you access on all devices
            </div>
          </div>
          <div className='flex flex-col'>
            <Image src={CustomWebsiteImg} alt='Custom Website'></Image>
            <div className={`pt-6 text-3xl ${electronica.className}`}>CUSTOM WEBSITE</div>
            <div className='pt-6 text-[#AFAFAF] text-lg w-[400px]'>
              With your email we create a Remote Digital Wallet to store your NFTs, and give you access on all devices
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-between pr-[170px]'>
          <div className='flex flex-col'>
            <Image src={ProSupport} alt='Pro Support'></Image>
            <div className={`pt-6 text-3xl ${electronica.className}`}>PRO SUPPORT</div>
            <div className='pt-6 text-[#AFAFAF] text-lg w-[400px]'>
              With your email we create a Remote Digital Wallet to store your NFTs, and give you access on all devices
            </div>
          </div>
          <button
            className='flex flex-col items-center justify-center my-4md:mb-12 md:mt-8'
            style={{
              background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
              borderRadius: '18px',
              width: '374px',
              height: '293px',
            }}
          >
            <Image src={DiscoverPlanImg} alt='DISCOVER PRO PLAN'></Image>
            <div className={`text-3xl w-[181px] text-black ${electronicaInLine.className}`}>DISCOVER PRO PLAN</div>
            <div className='text-[#0B0A0A] w-[400px]'>Simplify your Process</div>
            <div>
              <Icon icon='mdi:arrow-right' style={{ color: 'black', fontSize: '32px' }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creators;
