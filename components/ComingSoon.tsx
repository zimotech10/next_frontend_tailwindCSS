import React from 'react';
import { motion } from 'framer-motion';

type ComingSoonModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ComingSoon: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40'></div>

      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='absolute inset-0 bg-black opacity-75' onClick={onClose}></div>
        <motion.div
          className='relative p-8 bg-[#181818] rounded-lg shadow-lg flex flex-col items-center'
          style={{ border: '1px solid #FFC13B' }}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className='text-center text-white text-lg mb-2'>Lampapuy Exclusive NFT Marketplace on Solana</div>
          <div className='text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 text-transparent bg-clip-text'>COMING SOON</div>
        </motion.div>
      </div>
    </>
  );
};

export default ComingSoon;
