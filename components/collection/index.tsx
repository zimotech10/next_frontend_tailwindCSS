import { Collection } from '@/models/Collection';
import { IBM_Plex_Sans } from 'next/font/google';
import Image from 'next/image';
import DisplayCard from './components/DisplayCard';

const ibmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const CollectionDetails: React.FC<Collection> = ({ name, description, floor, owners, items, logoImage, coverImage }) => {
  return (
    <div className='flex flex-col'>
      <div className='relative w-full'>
        <img src={coverImage} className='w-full' alt='cover' />
      </div>
      <div className='w-full flex justify-center md:-mt-12 -mt-4'>
        <DisplayCard name={name} description={description} floor={floor} owners={owners} items={items} image={String(logoImage)} />
      </div>
    </div>
  );
};

export default CollectionDetails;
