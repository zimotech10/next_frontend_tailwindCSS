import localFont from 'next/font/local';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
const electronica = localFont({ src: '../../fonts/Electronica.otf' });

const GetStarted = () => {
  return (
    <div id='getStarted' className='mx-4 md:ml-28 md:mr-12 md:mt-14 rounded-[24px] md:h-[314px] h-[556px] pt-[68px] md:pl-10 pl-6'>
      <div className={`${electronica.className} text-black md:text-4xl text-2xl w-[454px] `}>
        GET STARTED.
        <br /> PICK A DOMAIN NAME
      </div>
      <div className='relative pt-5'>
        <Icon icon='mingcute:search-line' className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500' width={20} height={20} />
        <input
          type='text'
          className='w-72 md:w-96 py-2 h-[66px] pl-10 pr-3 rounded-xl text-sm outline-none'
          placeholder={'Search Domain name'}
          style={{ backgroundColor: '#0B0A0A' }}
        />
      </div>
    </div>
  );
};

export default GetStarted;
