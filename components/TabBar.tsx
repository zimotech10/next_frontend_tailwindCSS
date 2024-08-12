'use client';

import Link from 'next/link';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
const TabBar = ({ pathname }: { pathname: string }) => {
  return (
    <div className='flex flex-row justify-center md:justify-between pt-10 pl-5 pr-10 items-center md:pt-20'>
      <div className='flex flex-row gap-1 items-center justify-between'>
        <Link
          href='/'
          className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${pathname === 'collections' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}
        >
          Collections
        </Link>
        <Link
          href='/domains'
          className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${pathname === 'domains' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}
        >
          Domains
        </Link>
      </div>
      <div className='flex-row hidden gap-2 items-center md:flex'>
        <div
          style={{
            width: '44px',
            height: '40px',
            borderRadius: '3px',
            padding: '8px 10px',
            backgroundColor: '#252424',
            display: 'flex',
            alignItems: 'center',
            gap: '10px', // Adjust gap if you have multiple children
            boxSizing: 'border-box', // Ensures padding is included in width and height
          }}
        >
          <Icon icon='mage:dashboard' width={24} />
        </div>
        <div className='flex items-center pl-[24px]'>
          <Icon icon='line-md:grid-3-filled' width={24} style={{ color: 'grey' }} />
        </div>
      </div>
    </div>
  );
};

export default TabBar;
