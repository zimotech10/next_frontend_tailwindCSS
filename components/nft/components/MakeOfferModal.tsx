import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import walletIcon from '@/public/images/wallet_logo.png';
import alertIcon from '@/public/images/gridicons_notice-outline.png';
import { listing, offer, offerToAuction } from '@/web3/contract';
import * as anchor from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';
import {
  connection,
  PROGRAM_ID,
  PROGRAM_INTERFACE,
  commitmentLevel,
} from '@/web3/utils';
import { web3 } from '@coral-xyz/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import PopUp from '@/components/PopUp';
import Notification from '@/components/Notification';
import useScreen from '@/hooks/useScreen';
import CoinSelect from '@/components/CoinSelect';
import coinList from '@/utils/coinInfoList';

interface MakeOfferModalProps {
  name: string;
  image: string;
  mintAddress?: string | null;
  listStatus?: number;
  listingPrice?: string | null;
  symbol?: string;
  onClose: () => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  name,
  image,
  mintAddress,
  listStatus,
  listingPrice,
  symbol,
  onClose,
}) => {
  const [offerPrice, setOfferPrice] = useState<number | undefined>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const wallet = useAnchorWallet();
  const [coin, setCoin] = useState<any>(coinList[0]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [modalVariant, setModalVariant] = useState<'error' | 'success'>(
    'success'
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const [notification, setNotification] = useState<{
    variant: 'default' | 'success' | 'warning' | 'danger';
    heading: string;
    content: string;
  } | null>(null);
  const isMobile = useScreen();

  useEffect(() => {
    try {
      if (symbol) {
        setCoin(coinList.find((coin) => coin.symbol === symbol));
      }
    } catch (error) {
      console.log(error);
    }
  }, [symbol]);
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

  const handlePriceChangeByPercent = (percent: string) => {
    if (percent == 'max') {
      setOfferPrice(Number(listingPrice));
    } else if (percent == '-5%') {
      setOfferPrice(Number(listingPrice) * 0.95);
    } else if (percent == '-10%') {
      setOfferPrice(Number(listingPrice) * 0.9);
    }
  };

  const handleOffer = async () => {
    if (!wallet || !wallet.publicKey) {
      setNotification({
        variant: 'warning',
        heading: 'Connect Your Wallet',
        content: 'Please connect your wallet to proceed with the action.',
      });
      return;
    }

    if (!offerPrice) {
      setNotification({
        variant: 'warning',
        heading: 'Price Required',
        content: 'Please enter a price to continue.',
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

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );
      const treasuryMint = new web3.PublicKey(coin.address);
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await offer(
        program,
        wallet,
        authority,
        treasuryMint,
        nftMint,
        price,
        expiry
      );

      if (tx) {
        setModalVariant('success');
        setNotification({
          variant: 'success',
          heading: 'Offer Successful!',
          content: 'Your offer has been successfully submitted.',
        });
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Offer Failed!',
          content:
            'There was an issue with your offer. Please try again later or contact support if the problem persists.',
        });
      }
    } catch (error) {
      console.error('Offer error:', error);
      setModalVariant('error');
      setNotification({
        variant: 'danger',
        heading: 'Error During Offer',
        content:
          'An error occurred while processing your offer. Please try again later or contact support if the issue persists.',
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
        content: 'Please enter a price to proceed.',
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

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );
      const treasuryMint = new web3.PublicKey(coin.address);
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await offerToAuction(
        program,
        wallet,
        authority,
        treasuryMint,
        nftMint,
        price
      );

      if (tx) {
        setModalVariant('success');
        setNotification({
          variant: 'success',
          heading: 'Offer Successful!',
          content: 'Your offer has been successfully submitted.',
        });
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Offer Failed!',
          content: 'Your offer could not be processed.',
        });
      }
    } catch (error) {
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

  const topHeight = isMobile ? '30px' : '70px';
  return (
    <>
      <PopUp
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        message={modalMessage}
        variant={modalVariant}
      />
      <div className='fixed inset-0 flex justify-center items-center z-50 md:p-16 p-8'>
        <div
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
          onClick={onClose}
        ></div>
        <motion.div
          className='relative bg-[#0B0A0A] p-4 md:p-16 rounded-lg shadow-lg max-w-[800px] w-full flex flex-col gap-6'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{ top: topHeight, maxHeight: '90vh', overflowY: 'hidden' }}
          ref={modalRef}
        >
          <button
            className='absolute top-4 right-4 text-white'
            onClick={onClose}
          >
            <div
              style={{
                backgroundColor: '#D3D3D3', // Light gray background
                borderRadius: '50%', // Circular shape
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px', // Adjust size as needed
                height: '24px',
                border: '2px solid black', // Black border around the circle
              }}
            >
              <Icon
                icon='mdi-close'
                style={{ color: 'black', fontSize: '16px' }}
              />
            </div>
          </button>
          <h2 className='text-3xl font-bold text-white'>Make an offer</h2>
          <p className='text-sm text-[#afafaf]'>
            You are making an offer for the GTU-NFT #3578
          </p>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col gap-4 w-full'>
              <div className='flex items-center'>
                <img
                  src={image}
                  alt={name}
                  className='w-20 h-20 md:w-24 md:h-24 rounded-md'
                />
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

              <div className='flex flex-col gap-2 pt-4'>
                <div className='flex justify-between'>
                  <span className='text-[#afafaf]'>
                    {listStatus == 1 ? `Maximum bid` : `Minimum bid`} :{' '}
                    {listingPrice} SOL
                  </span>
                  <a
                    className='flex gap-1 text-[#afafaf] cursor-pointer'
                    href='https://www.soldev.app/'
                  >
                    <Image
                      src={alertIcon}
                      alt='alertIcon'
                    ></Image>
                    What is SOL?
                  </a>
                </div>
                <div className='flex items-center justify-between gap-2 border border-[#353840] rounded-lg p-2'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={coin.image}
                      width={16}
                      height={16}
                      alt='solanaIcon'
                      style={{ width: '16px' }}
                    />
                    {listStatus == 1 ? (
                      <input
                        type='number'
                        className='bg-[#0B0A0A] text-white leading-9 outline-none md:w-[400px] w-[200px]'
                        placeholder='Enter Amount'
                        value={offerPrice}
                        onChange={handlePriceChange}
                        max={Number(listingPrice)}
                        min={0}
                      />
                    ) : (
                      <input
                        type='number'
                        className='bg-[#0B0A0A] text-white leading-9 outline-none md:w-[400px] w-[200px]'
                        placeholder='Enter Amount'
                        value={offerPrice}
                        onChange={handlePriceChange}
                        min={Number(listingPrice)}
                      />
                    )}
                  </div>
                  {listStatus == 1 && !isMobile && (
                    <div className='flex gap-2'>
                      <button
                        className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'
                        onClick={() => handlePriceChangeByPercent('max')}
                      >
                        Maximum
                      </button>
                      <button
                        className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'
                        onClick={() => handlePriceChangeByPercent('-5%')}
                      >
                        -5%
                      </button>
                      <button
                        className='bg-[#1a1a1a] text-white py-1 px-3 rounded-lg'
                        onClick={() => handlePriceChangeByPercent('-10%')}
                      >
                        -10%
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {listStatus == 1 && (
                <div className='flex flex-col gap-2 pt-4'>
                  <div className='flex justify-between'>
                    <span className='text-[#afafaf]'>Buy Now Price</span>
                    <div className='flex justify-center items-center gap-1'>
                      <Image
                        src={coin.image}
                        width={16}
                        height={16}
                        alt='solanaIcon'
                        style={{ width: '16px' }}
                      ></Image>
                      <div className='flex justify-center items-center'>
                        <span className='text-white'>{Number(offerPrice)}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-[#afafaf]'>Minimum offer (50%)</span>
                    <div className='flex justify-center items-center'>
                      <Image
                        src={walletIcon}
                        alt='walletIcon'
                      ></Image>
                      <span className='text-white'>
                        {Number(listingPrice) * 0.5}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='terms'
                />
                <label
                  htmlFor='terms'
                  className='text-sm text-[#afafaf] ml-2 cursor-pointer'
                >
                  I approve LampapuyMarket&apos;s Terms &amp; Condition
                </label>
              </div> */}

              <p className='w-full px-4 py-3 text-center text-[#FF856A] bg-[#260707] rounded-[14px] bg-opacity-40'>
                {listStatus == 1
                  ? `Price Must Be Lower Than Listing Price`
                  : `Price Must Be higher Than Current Price`}
              </p>

              <button
                className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                style={{
                  border: '2px solid #5E5E5E',
                  color: '#F5F5F5',
                }}
                onClick={listStatus == 1 ? handleOffer : handleOfferToAuction}
              >
                Make Offer
              </button>
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
