'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/small-logo.png';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Link from 'next/link';
import privateLogo from '@/public/vectors/private.svg';
import launchpadLogo from '@/public/vectors/launchpad.svg';
import marketplaceLogo from '@/public/vectors/marketplace.svg';
import localFont from 'next/font/local';
import ComingSoon from './ComingSoon';

const electronica = localFont({ src: '../fonts/Electronica.otf' });

const sidebarVariants = {
  hidden: { width: '72px' },
  visible: { width: '200px' },
};

export const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className='fixed left-0 top-0 h-full pt-3 bg-[#181818] z-40 text-white cursor-pointer hidden md:block '
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className='h-full flex flex-col justify-between'
          variants={sidebarVariants}
          initial='hidden'
          animate={isHovered ? 'visible' : 'hidden'}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className='flex pl-3 flex-col gap-5'>
            <div className='flex items-center gap-3'>
              <Link
                href={'/'}
                className='flex flex-row items-center'
              >
                <Image
                  src={logo}
                  alt='logo'
                  style={{ width: '54px', height: '64px' }}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className={`font-normal text-lg ${electronica.className}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      LAMPAPUY
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
            <div className='flex pl-3 flex-col gap-5'>
              <button
                onClick={openModal}
                className='flex items-center pt-[8px] gap-3'
              >
                <Image
                  src={launchpadLogo}
                  alt='logo'
                  width={28}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className='font-normal text-lg'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Launchpad
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <Link
                href='/explorer'
                className='flex items-center pt-[24px] gap-3'
              >
                <Image
                  src={marketplaceLogo}
                  alt='logo'
                  width={28}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className='font-medium text-lg'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Marketplace
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              <button
                onClick={openModal}
                className='flex items-center pt-[24px] gap-3'
              >
                <Image
                  src={privateLogo}
                  alt='private'
                  width={28}
                />
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      className='font-medium whitespace-nowrap'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Private Sale
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
          <div className='flex pl-5 flex-col p-3 gap-5'>
            <Link
              href='/'
              className='flex items-center pt-[8px] gap-3'
            >
              <Icon
                icon='octicon:verified-16'
                width={28}
                style={{ color: '#C4C4C4 ' }}
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className='font-medium text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    KYC/Audit
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link
              href='https://t.me/lampapuy'
              className='flex items-center pt-[24px] gap-3'
            >
              <Icon
                icon='mingcute:telegram-fill'
                width={28}
                style={{ color: '#C4C4C4 ' }}
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className='font-medium text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Telegram
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link
              href='https://discord.gg/lampapuy'
              className='flex items-center pt-[24px] gap-3'
            >
              <Icon
                icon='ic:baseline-discord'
                width={28}
                style={{ color: '#C4C4C4 ' }}
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className='font-medium text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Discord
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              href='/'
              className='flex items-center pt-[32px] pb-6 gap-3'
            >
              <Icon
                icon='simple-icons:linktree'
                width={28}
                style={{ color: '#C4C4C4 ' }}
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className='font-medium text-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Linktree
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoon
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Sidebar;
