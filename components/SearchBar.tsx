'use client';

import yellowVector from '@/public/vectors/yellow-img.svg';
import Image from 'next/image';
import { IBM_Plex_Sans } from 'next/font/google';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { ChangeEvent, useState } from 'react';

const ibmSans = IBM_Plex_Sans({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const SearchBar = (props: any) => {
  const { placeholder, setSearchParam, setOrderBy, setOrderDir } = props;
  const [sort, setSort] = useState('Price: Low to High');
  const [sortModal, setSortModal] = useState(false);

  const selectSort = (method: string, orderBy: string, orderDir: string) => {
    setSort(method);
    setOrderBy(orderBy);
    setOrderDir(orderDir);
    setSortModal(false);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-2 items-center md:gap-4 py-2 pl-5 md:py-8 ${ibmSans.className}`}
    >
      <div className='flex flex-row gap-2 md:gap-4 items-center justify-center'>
        {/* <Image src={yellowVector} width={36} height={36} alt='vector' /> */}
        <div className='relative'>
          <Icon
            icon='mingcute:search-line'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
            width={20}
            height={20}
          />
          <input
            type='text'
            className='w-72 md:w-96 py-2 h-11 pl-10 pr-3 rounded-md text-sm'
            placeholder={placeholder}
            style={{ backgroundColor: '#0B0A0A' }}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div
        className='flex flex-row items-center cursor-pointer w-fit relative py-2 h-11 px-3 rounded-2xl md:rounded-md gap-2 md:gap-4'
        style={{ backgroundColor: '#0B0A0A' }}
        onClick={() => setSortModal(!sortModal)}
      >
        <span style={{ fontSize: '14px', color: '#CDD4E6' }}>{sort}</span>
        <Icon
          icon='mingcute:down-line'
          width={20}
        />
        {sortModal && (
          <div
            className='absolute top-12 z-50 p-3 flex flex-col gap-3 rounded-md items-start'
            style={{ width: '170px', backgroundColor: '#0B0A0A' }}
          >
            <div
              className='w-full'
              onClick={() => selectSort('Most Recent', 'date', 'desc')}
            >
              Most Recent
            </div>
            <div
              className='w-full'
              onClick={() => selectSort('Oldest', 'date', 'asc')}
            >
              Oldest
            </div>
            <div
              className='w-full'
              onClick={() => selectSort('Price: Low to High', 'price', 'asc')}
            >
              Price: Low to High
            </div>
            <div
              className='w-full'
              onClick={() => selectSort('Price: High to Low', 'price', 'desc')}
            >
              Price: High to Low
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
