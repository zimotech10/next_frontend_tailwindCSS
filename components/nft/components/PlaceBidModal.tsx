import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import solanaIcon from '@/public/images/solana-logo.png';
import walletIcon from '@/public/images/wallet_logo.png';
import { ItemSummary } from '@/components/ItemSummary';
import { offer, offerToAuction } from '@/web3/contract';
import * as anchor from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';
import { connection, PROGRAM_ID, PROGRAM_INTERFACE, commitmentLevel } from '@/web3/utils';
import { web3 } from '@coral-xyz/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import alertIcon from '@/public/images/gridicons_notice-outline.png';
import Notification from '@/components/Notification';
import PopUp from '@/components/PopUp';

import { NATIVE_MINT } from '@solana/spl-token';

interface PlaceBidModalProps {
  name: string;
  image: string;
  mintAddress?: string | null;
  listStatus?: number;
  onClose: () => void;
}

export const PlaceBidModal: React.FC<PlaceBidModalProps> = ({ name, image, mintAddress, listStatus, onClose }) => {
  const [offerPrice, setOfferPrice] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(undefined);
  const [expirationTime, setExpirationTime] = useState<string | undefined>(undefined);
  const wallet = useAnchorWallet();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [modalVariant, setModalVariant] = useState<'error' | 'success'>('success');
  const modalRef = useRef<HTMLDivElement>(null);

  const [notification, setNotification] = useState<{ variant: 'default' | 'success' | 'warning' | 'danger'; heading: string; content: string } | null>(null);

  useEffect(() => {
    // Disable background scrolling when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      // Ensure scrolling is enabled when modal is unmounted
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.addEventListener('wheel', (event) => {
        if (modalRef.current) {
          event.preventDefault();
          modalRef.current.scrollBy({
            top: event.deltaY,
            behavior: 'smooth',
          });
        }
      });
    }
  }, [modalRef]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfferPrice(Number(event.target.value));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationTime(event.target.value);
  };

  const handleOffer = async () => {
    if (!wallet || !wallet.publicKey) {
      setNotification({
        variant: 'warning',
        heading: 'Connect Your Wallet',
        content: 'Please connect your wallet to proceed with this action.',
      });
      return;
    }

    if (!offerPrice) {
      setNotification({
        variant: 'warning',
        heading: 'Price Required',
        content: 'Please enter a price to proceed with the action.',
      });
      return;
    }

    setLoading(true);

    try {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const price = new BN(offerPrice * web3.LAMPORTS_PER_SOL);
      const expiry = null;

      const authority = new web3.PublicKey(process.env.NEXT_PUBLIC_AUTHORITY as string);
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await offer(program, wallet, authority, treasuryMint, nftMint, price, expiry);

      if (tx) {
        setModalVariant('success');
        setNotification({
          variant: 'success',
          heading: 'Offer Successful!',
          content: 'Your offer has been successfully processed.',
        });
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Offer Failed!',
          content: 'The offer could not be processed.',
        });
      }
    } catch (error) {
      console.error('Offer error:', error);
      setModalVariant('error');
      setNotification({
        variant: 'danger',
        heading: 'Offer Error',
        content: 'An error occurred while processing your offer.',
      });
    }

    setLoading(false);
    setIsModalOpen(true);
    onClose();
  };

  const handleOfferToAuction = async () => {
    if (!wallet || !wallet.publicKey) {
      setNotification({
        variant: 'warning',
        heading: 'Connect Your Wallet',
        content: 'Please connect your wallet to proceed with this action.',
      });
      return;
    }

    if (!offerPrice) {
      setNotification({
        variant: 'warning',
        heading: 'Price Required',
        content: 'Please enter a price to proceed with the action.',
      });
      return;
    }

    setLoading(true);

    try {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const price = new BN(offerPrice * web3.LAMPORTS_PER_SOL);

      const authority = new web3.PublicKey(process.env.NEXT_PUBLIC_AUTHORITY as string);
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await offerToAuction(program, wallet, authority, treasuryMint, nftMint, price);

      if (tx) {
        setModalVariant('success');
        setNotification({
          variant: 'success',
          heading: 'Offer Successful!',
          content: 'Your offer has been successfully processed.',
        });
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Offer Failed!',
          content: 'The offer could not be processed.',
        });
      }
    } catch (error) {
      console.error('Offer error:', error);
      setModalVariant('error');
      setNotification({
        variant: 'danger',
        heading: 'Offer Error',
        content: 'An error occurred while processing your offer.',
      });
    }

    setLoading(false);
    setIsModalOpen(true);
    onClose();
  };
  return (
    <>
      <PopUp isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} message={modalMessage} variant={modalVariant} />
      <div className='fixed inset-0 flex justify-center items-center z-50 p-16'>
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm' onClick={onClose}></div>
        <motion.div
          className='relative bg-[#0B0A0A] p-4 md:p-16 rounded-lg shadow-lg max-w-[800px] w-full flex flex-col gap-6'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{ top: '70px', maxHeight: '90vh', overflowY: 'hidden' }}
          ref={modalRef}
        >
          <button className='absolute top-4 right-4 text-white' onClick={onClose}>
            X
          </button>
          <h2 className='text-3xl font-bold text-white'>Place Bid</h2>
          <p className='text-sm text-[#afafaf]'>You are placing bid for the GTU-NFT #3578</p>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex items-center'>
                <img src={image} alt={name} className='w-20 h-20 md:w-24 md:h-24 rounded-md' />
                <div className='ml-4'>
                  <h3 className='text-lg font-bold text-white'>{name}</h3>
                  <p className='text-sm text-[#afafaf]'>#{3578}</p>
                  <p className='text-sm text-[#afafaf]'>Artist: Coco</p>
                </div>
              </div>
              <div className='flex justify-between'>
                <span className='text-[#afafaf]'>Quantity:</span>
                <span className='text-white font-bold'>x1</span>
              </div>

              <div
                style={{
                  width: '84%',
                  height: '0.8px',
                  backgroundColor: '#F5F5F5',
                  opacity: 0.1,
                  position: 'absolute',
                  top: '320px', // Distance from the top of the container
                }}
              ></div>

              <div className='flex flex-col gap-2 pt-4'>
                <div className='flex justify-between'>
                  <span className='text-[#afafaf]'>Maximum bid: 30 SOL</span>
                  <div className='flex gap-1'>
                    <Image src={alertIcon} alt='alertIcon'></Image>
                    <span className='text-[#afafaf]  cursor-pointer'>What is SOL?</span>
                  </div>
                </div>
                <div className='flex items-center justify-between gap-2 border border-[#353840] rounded-lg p-2 mt-2'>
                  <div className='flex items-center gap-2'>
                    <Image src={solanaIcon} width={24} height={24} alt='sol' />
                    <input type='number' className='bg-[#0B0A0A] text-white rounded-lg' placeholder='Enter Amount' onChange={handlePriceChange} />
                  </div>
                  <div className='flex gap-2'>
                    <button className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'>Maximum</button>
                    <button className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'>-5%</button>
                    <button className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'>-10%</button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2 mt-2'>
                <span className='text-[#afafaf]'>Enter expiry time</span>
                <div className='flex gap-2'>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input type='date' className='p-2 bg-[#0B0A0A] text-white rounded-lg w-full border border-[#353840]' onChange={handleDateChange} />
                    <Icon
                      icon='mdi:calendar'
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <input type='time' className='p-2 bg-[#0B0A0A] text-white rounded-lg w-full border border-[#353840]' onChange={handleTimeChange} />
                    <Icon
                      icon='mdi:clock-time-four'
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        color: 'white',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '84%',
                  height: '0.8px',
                  backgroundColor: '#F5F5F5',
                  opacity: 0.1,
                  position: 'absolute',
                  top: '525px', // Distance from the top of the container
                }}
              ></div>

              <div className='flex items-center mt-2'>
                <input type='checkbox' id='terms' />
                <label htmlFor='terms' className='text-sm text-[#afafaf] ml-2 cursor-pointer'>
                  I approve LampapuyMarket&apos;s Terms &amp; Condition
                </label>
              </div>

              <button
                className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                style={{
                  border: '2px solid #5E5E5E',
                  color: '#F5F5F5',
                }}
                onClick={listStatus == 1 ? handleOffer : handleOfferToAuction}
              >
                Place a Bid
              </button>

              <p className='flex flex-col text-center text-[#afafaf] mt-4'>
                <span>Your Balance:</span>
                <div className='flex justify-center items-center gap-1'>
                  <Image src={solanaIcon} alt='solanaIcon' style={{ width: '20px' }}></Image>
                  <span className='text-white'>0.35 SOL ($1050.67)</span>
                </div>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      {notification && (
        <div className='fixed top-4 right-4 z-50'>
          <Notification
            variant={notification.variant}
            heading={notification.heading}
            content={notification.content}
            onClose={() => setNotification(null)} // Remove notification after it disappears
          />
        </div>
      )}
    </>
  );
};
