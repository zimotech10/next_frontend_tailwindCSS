'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import ComingSoon from './ComingSoon';

const TabBar = ({ pathname, onFilledIconClick, onDashboardIconClick }: { pathname: string; onFilledIconClick: any; onDashboardIconClick: any }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'dashboard' | 'filled' | null>('dashboard');

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleIconClick = (icon: 'dashboard' | 'filled') => {
    if (icon === 'dashboard') onDashboardIconClick();
    else if (icon === 'filled') onFilledIconClick();
    setActiveIcon(icon);
  };

  return (
    <>
      <div className='flex flex-row justify-center md:justify-between pl-5 pr-10 items-center md:pt-20'>
        <div className='flex flex-row gap-1 items-center justify-between'>
          <Link
            href='/'
            className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${pathname === 'collections' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}
          >
            Collections
          </Link>
          <button
            className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${pathname === 'domains' ? 'bg-neutral-800' : 'hover:bg-neutral-800'}`}
            onClick={handleButtonClick}
          >
            Domains
          </button>
        </div>
        <div className='flex-row hidden gap-2 items-center md:flex'>
          <div
            style={{
              width: '44px',
              height: '40px',
              borderRadius: '3px',
              padding: '8px 10px',
              backgroundColor: activeIcon === 'dashboard' ? '#3d3d3d' : '#000000', // Highlight color
              display: 'flex',
              alignItems: 'center',
              gap: '10px', // Adjust gap if you have multiple children
              boxSizing: 'border-box', // Ensures padding is included in width and height
              cursor: 'pointer', // Change cursor to pointer
            }}
            onClick={() => handleIconClick('dashboard')}
          >
            <Icon icon='mage:dashboard' width={24} />
          </div>
          <div
            style={{
              width: '44px',
              height: '40px',
              borderRadius: '3px',
              padding: '8px 10px',
              backgroundColor: activeIcon === 'filled' ? '#3d3d3d' : '#000000', // Highlight color
              display: 'flex',
              alignItems: 'center',
              gap: '10px', // Adjust gap if you have multiple children
              boxSizing: 'border-box', // Ensures padding is included in width and height
              cursor: 'pointer', // Change cursor to pointer
            }}
            onClick={() => handleIconClick('filled')}
          >
            <Icon icon='line-md:grid-3-filled' width={24} style={{ color: 'grey' }} />
          </div>
        </div>
      </div>
      <ComingSoon isOpen={showModal} onClose={handleCloseModal} /> {/* Use the ComingSoonModal component */}
    </>
  );
};

export default TabBar;
