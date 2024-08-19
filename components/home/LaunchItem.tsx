import Image from 'next/image';
import localFont from 'next/font/local';

const electronica = localFont({ src: '../../fonts/Electronica.otf' });

const LaunchItem = (
  props: React.PropsWithChildren<{
    timeLeft: string;
    heading: string;
    description: string;
    image: string;
    imgWidth: number;
    imgHeight: number;
  }>
) => {
  return (
    <div className='flex flex-col justify-center items-center pt-6 bg-[#1a1a1a] text-white rounded-[24px] overflow-hidden w-72 shadow-lg'>
      <div className={`relative  ${electronica.className}`}>
        <Image src={props.image} alt='Image' width={props.imgWidth} height={props.imgHeight} className='object-cover' />
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-center py-2 px-4 rounded-md w-[200px]'>
          <span className='font-bold'>{props.timeLeft}</span>
        </div>
      </div>
      <h3 className='pt-6'>{props.heading}</h3>
      <p className={`w-[259px] text-center text-[#AFAFAF] pt-3`}>{props.description}</p>
    </div>
  );
};

export default LaunchItem;
