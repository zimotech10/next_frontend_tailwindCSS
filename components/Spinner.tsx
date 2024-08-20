import React from 'react';

export const BigSpinner = () => {
  return (
    <div className='flex justify-center items-center select-none'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-4 border-t-4 border-gray-200'></div>
    </div>
  );
};

export const SmallSpinner = () => {
  return (
    <div className='flex justify-center items-center '>
      <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-gray-200'></div>
    </div>
  );
};
