'use client';
import React, { useEffect, useState } from 'react';
const options = [
  { value: '12312', label: 'SOL', image: '/images/solana-logo.png' },
  { value: 'USDT', label: 'USDT', image: '/images/usdt-logo.png' },
  { value: 'USDC', label: 'USDC', image: '/images/usdc-logo.png' },
  { value: 'WIF', label: 'WIF', image: '/images/wif-logo.png' },
  { value: 'JUP', label: 'JUP', image: '/images/jup-logo.png' },
];

const CoinSelect = ({
  selectedCoin,
  setSelectedCoin,
}: {
  selectedCoin: any;
  setSelectedCoin: any;
}) => {
  useEffect(() => {
    setSelectedCoin(options[0]);
  }, []);
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
          <span>{selectedCoin.label}</span>
        </div>
      </div>
      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-[#0b0a0a] border rounded-lg shadow-lg'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSelectedCoin(option);
                setIsOpen(false);
              }}
              className='flex items-center p-2 cursor-pointer hover:bg-gray-700 hover:rounded-lg'
            >
              <img
                src={option.image}
                alt=''
                className='w-6 h-6 mr-2'
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinSelect;
