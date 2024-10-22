'use client';
import React, { useState } from 'react';
import coinList from '@/utils/coinInfoList';

const CoinSelect = ({
  selectedCoin,
  setSelectedCoin,
}: {
  selectedCoin: any;
  setSelectedCoin: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative inline-block w-full'>
      <div
        className='flex items-center justify-between w-full p-2 border rounded-lg cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex items-center'>
          <img
            src={selectedCoin.image}
            alt=''
            className='w-6 h-6 mr-2'
          />
          <span>{selectedCoin.symbol}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-[#0b0a0a] border rounded-lg shadow-lg'>
          {coinList.map((coin) => (
            <div
              key={coin.address}
              onClick={() => {
                setSelectedCoin(coin);
                setIsOpen(false);
              }}
              className='flex items-center p-2 cursor-pointer hover:bg-gray-700 hover:rounded-lg'
            >
              <img
                src={coin.image}
                alt=''
                className='w-6 h-6 mr-2'
              />
              <span>{coin.symbol}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinSelect;
