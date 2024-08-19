import Image from 'next/image';
import localFont from 'next/font/local';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });

const TopCollectionItem = (
  props: React.PropsWithChildren<{
    id: number;
    name: string;
    image: string;
    imgWidth: number;
    imgHeight: number;
  }>
) => {
  return (
    <div className='flex items-center pt-6 bg-[#1a1a1a] text-white rounded-[8px] overflow-hidden w-96 h-24  shadow-lg p-4 space-x-4'>
      <div className='text-sm font-bold'>{props.id}</div>
      <Image src={props.image} alt='Image' width={props.imgWidth} height={props.imgHeight} className='object-cover' />
      <div className='flex flex-col flex-grow'>
        <div className='flex items-center space-x-2'>
          <span className='font-semibold text-[18px]'>Antisocial Ape Club: YKTV</span>
        </div>
        <div className='flex items-center space-x-2 mt-1'>
          <span className='text-lg font-bold'>960.62</span>
          <Icon icon='cryptocurrency:sol' className='text-blue-500 w-5 h-5' />
          <span className='text-gray-400 text-sm'>Floor Price</span>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <Icon icon='mdi:check-circle-outline' className='text-orange-500 w-5 h-5' />
        <div className='text-red-500 font-bold text-lg'>-18%</div>
      </div>
    </div>
  );
};

export default TopCollectionItem;
