'use client';

import React, { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import Image from 'next/image';
import logo from '@/public/big-logo.png';
import { IBM_Plex_Sans } from 'next/font/google';
import subsribesvg from '@/public/vectors/subscribe.svg';
import { socials } from '@/stores/constants';
import { motion } from 'framer-motion';
import useScreen from '@/hooks/useScreen';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Link from 'next/link';

const electronicaStencil = localFont({
  src: '../fonts/ElectronicaStencil.otf',
});

const electronica = localFont({ src: '../fonts/Electronica.otf' });

const ipmSans = IBM_Plex_Sans({
  weight: ['400', '600'],
  subsets: ['latin'],
});

const Footer = () => {
  const isMobile = useScreen();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  const apiKey = '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';

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': apiKey,
        },
        body: JSON.stringify({
          email: email,
          listIds: [2],
          attributes: {
            action: 'subscribe',
          },
        }),
      });

      if (response.ok) {
        setShowModal(true); // Show the modal when subscription is successful
        console.log('contact added!', email);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex flex-col p-4 footer:pl-7  footer:pb-[83px]  relative bg-black footer:mx-[103px]'>
      {showModal && (
        <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center font-inter z-40 modal'>
          <div className='w-9/12 footer:w-4/12 p-7 justify-center gap-2 footer:gap-4 items-center flex flex-col modal-card'>
            <p className='text-xl'>Thanks for subscribing!</p>
            <button className='modal-button w-full font-semibold footer:w-2/3 text-black py-2 px-3' onClick={closeModal}>
              Continue
            </button>
          </div>
        </div>
      )}
      <div className='flex flex-col footer:flex-row w-full footer:items-end items-center footer:justify-between'>
        <div className='flex flex-col items-center footer:items-start footer:w-1/2 footer:p-5'>
          <div className='flex items-center'>
            <Image src={logo} width={isMobile ? 50 : 74.77} height={isMobile ? 72 : 72.97} alt='logo' />
            <div
              className={`font-normal text-lg ${electronica.className}`}
              style={{
                background: 'linear-gradient(140deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                fontSize: isMobile ? '18px' : '22.5px',
                color: 'transparent',
              }}
            >
              {isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                  <div style={{ fontSize: '14px', color: 'white', fontWeight: '100', fontFamily: 'DM Sans, sans-serif' }}>Powered by</div>
                  <div>LAMPAPUY</div>
                </div>
              )}
              {!isMobile && 'LAMPAPUY'}
            </div>
          </div>

          <div className='text-xl pt-3 pb-5'>Subscribe to our newsletter</div>
          <div className='flex flex-col relative'>
            <form
              className='flex p-1'
              onSubmit={handleSubscribe}
              style={{
                width: '289px',
                position: 'relative', // Ensure positioning context for child elements
              }}
            >
              <input
                type='email'
                name='email'
                value={email}
                className='text-white bg-black placeholder-opacity-50 flex-grow'
                placeholder='Email address'
                onChange={handleInput}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: '19.53px',
                  letterSpacing: '-0.2px',
                  color: '#F5F5F5',
                }}
              />
              <button
                type='submit'
                className='text-black footer:h-[40px] footer:w-[50px] h-[38.21px] w-[50px]'
                style={{
                  background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                  marginLeft: '8px', // Add margin to ensure proper spacing
                  borderRadius: '8px 8px 0px 0px',
                }}
              >
                <Icon icon='ic:round-keyboard-arrow-right' />
              </button>
              <div
                style={{
                  width: '239px',
                  height: '0.8px',
                  backgroundColor: '#F5F5F5',
                  opacity: 0.1,
                  position: 'absolute',
                  top: '44px', // Distance from the top of the container
                  left: '0', // Aligns the line with the left edge of the container
                }}
              ></div>
            </form>
          </div>
        </div>
        <div className='flex flex-col gap-2 footer:p-5 px-5 items-center footer:items-start footer:pr-[160px] md:pt-0 pt-6'>
          <div
            className={`text-lg ${electronica.className}`}
            style={{
              background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            About
          </div>
          <div className='flex flex-row gap-12 footer:gap-16'>
            <Link
              href='https://bictory.foundation/'
              target='_blank'
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '18.15px',
                letterSpacing: '-0.2px',
                color: '#F5F5F5',
              }}
            >
              Partnership
            </Link>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '18.15px',
                letterSpacing: '-0.2px',
                color: '#F5F5F5',
              }}
            >
              FAQs
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '18.15px',
                letterSpacing: '-0.2px',
                color: '#F5F5F5',
              }}
            >
              Docs
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col-reverse footer:flex-row pt-7 justify-between'>
        <div className='flex flex-col footer:flex-row gap-2 footer:gap-10'>
          <div className='order-2 footer:order-1 flex flex-row footer:gap-10 gap-8 pb-5 footer:py-0 justify-center items-center'>
            <Link
              href='/'
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '19.53px',
                letterSpacing: '-0.2px',
                color: '#F5F5F5',
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href='/'
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '19.53px',
                letterSpacing: '-0.2px',
                color: '#F5F5F5',
              }}
            >
              Privacy Policy
            </Link>
          </div>

          {/* View Contract link, which will appear at the top on mobile and last on larger screens */}
          <Link
            href='/'
            className='order-1 footer:order-2 flex items-center justify-center pt-2 footer:pt-0 underline text-[#FFB703]'
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '36px',
              letterSpacing: '-0.24px', // Equivalent to -2% of font size (12px * 0.02 = 0.24px)
            }}
          >
            <Icon icon='system-uicons:chain' width='20px' height='20px' />
            {isMobile ? 'View Contract in Explorer' : 'View Contract'}
          </Link>
        </div>

        <div className='flex flex-col footer:flex-row justify-center gap-2 pt-2 items-center footer:pr-[70px]'>
          <div
            className='text-base footer:text-[22px] text-[16px]'
            style={{
              fontFamily: 'Forma DJR Banner, sans-serif', // Ensure the font is available or imported
              fontWeight: 400,
              lineHeight: '26.4px',
              letterSpacing: '2px',
              color: '#F5F5F5',
            }}
          >
            {isMobile ? 'Community:' : 'Follow Us'}
          </div>
          <div className='flex flex-row gap-3'>
            {socials.map((social) => (
              <motion.a href={social.link} key={social.id} target='_blank' whileHover={{ scale: 1.1 }}>
                <Image src={social.icon} width={isMobile ? 32 : 36} height={isMobile ? 32 : 36} alt='social' />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
