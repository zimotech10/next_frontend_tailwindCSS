import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify-icon/react/dist/iconify.js';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='rounded-md mb-4' style={{ background: '#0B0A0A' }}>
      <div className='flex justify-between items-center cursor-pointer p-4' onClick={() => setIsOpen(!isOpen)}>
        <div className='flex gap-3'>
          {props.title === 'Description' && <Icon icon='mdi:menu' className='pt-[6px]' />}
          {props.title === 'Attributes' && <Icon icon='mdi-tag-outline' className='pt-[6px]' />}
          {props.title === 'Details' && <Icon icon='mdi:format-list-bulleted' className='pt-[6px]' />}
          <h2 className='text-lg font-semibold'>{props.title}</h2>
        </div>
        <svg className={`w-6 h-6 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </svg>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='px-4'
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
