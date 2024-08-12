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

  const apiKey =
    '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';

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
    <div className='flex flex-col p-4 md:p-16 relative bg-black md:mx-36'>
      {showModal && (
        <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center font-inter z-40 modal'>
          <div className='w-9/12 md:w-4/12 p-7 justify-center gap-2 md:gap-4 items-center flex flex-col modal-card'>
            <p className='text-xl'>Thanks for subscribing!</p>
            <button
              className='modal-button w-full font-semibold md:w-2/3 text-black py-2 px-3'
              onClick={closeModal}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className='flex flex-col md:flex-row w-full md:items-end items-center md:justify-between'>
        <div className='flex flex-col items-center md:items-start md:w-1/2 md:p-5'>
          <Image
            src={logo}
            width={isMobile ? 200 : 288}
            height={isMobile ? 72 : 144}
            alt='logo'
          />
          <div className='text-xl pb-5 md:ml-4'>
            Subscribe to our newsletter
          </div>
          <div className='flex flex-col relative'>
            <form
              className='flex p-1'
              onSubmit={handleSubscribe}
              style={{
                width: '289px',
              }}
            >
              <input
                type='email'
                name='email'
                value={email}
                className='p-4 md:mr-0 text-white bg-black'
                placeholder='your@mail.com'
                onChange={handleInput}
              />
              <button
                type='submit'
                className='p-2 w-full text-black rounded-e-xl'
                style={{
                  background:
                    'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                }}
              >
                <Icon icon='ic:round-keyboard-arrow-right' />
              </button>
            </form>
          </div>
        </div>
        <div className='flex flex-col gap-2 md:p-5 px-5 items-center md:items-start'>
          <div
            className={`text-lg ${electronica.className}`}
            style={{
              background:
                'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            About
          </div>
          <div className='flex flex-row gap-12 md:gap-16'>
            <Link
              href='https://bictory.foundation/'
              target='_blank'
            >
              Partnership
            </Link>
            <div>FAQs</div>
            <div>Docs</div>
          </div>
        </div>
      </div>
      <div className='flex flex-col-reverse md:flex-row justify-between'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-10'>
          <div className='flex flex-row md:gap-10 gap-8 py-5 md:py-0 justify-center items-center'>
            <Link href='/'>Terms & Conditions</Link>{' '}
            <Link href='/'>Privacy Policy</Link>
          </div>
          <Link
            href='/'
            className='flex items-center justify-center underline text-[#FFB703]'
          >
            <Icon icon='system-uicons:chain' />
            View Contract
          </Link>
        </div>
        <div className='flex flex-col md:flex-row justify-center gap-2 pt-2 items-center'>
          <div className='text-base'>Follow Us:</div>
          <div className='flex flex-row gap-3'>
            {socials.map((social) => (
              <motion.a
                href={social.link}
                key={social.id}
                target='_blank'
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={social.icon}
                  width={isMobile ? 32 : 36}
                  height={isMobile ? 32 : 36}
                  alt='social'
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
