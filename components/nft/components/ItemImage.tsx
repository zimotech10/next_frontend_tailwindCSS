import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

export const ItemImage = ({ imageSrc }: { imageSrc: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='relative flex justify-center items-center w-[232px] md:w-[571px] h-full md:py-8 md:px-6 p-[10px] md:p-0 rounded-xl border border-gray-300'>
        <img src={imageSrc} width={522} height={685} alt='display' />
        <button
          onClick={handleOpenModal}
          className='absolute md:bottom-10 bottom-3 flex items-center bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg'
        >
          <Icon icon='ic:baseline-search' />
          Expand
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className='relative' initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <img src={imageSrc} width={600} height={1370} alt='display' />
              <button
                onClick={handleCloseModal}
                className='absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black rounded-full px-2 py-1 flex items-center shadow-lg'
              >
                <Icon icon='ic:baseline-close' />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
