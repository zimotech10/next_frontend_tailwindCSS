import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import solanaIcon from '@/public/images/solana-logo.png';
import walletIcon from '@/public/images/wallet_logo.png';
import alertIcon from '@/public/images/gridicons_notice-outline.png';
import { ItemSummary } from '@/components/ItemSummary';
import { instantBuy, offer, offerToAuction } from '@/web3/contract';
import * as anchor from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';
import {
  connection,
  PROGRAM_ID,
  PROGRAM_INTERFACE,
  commitmentLevel,
} from '@/web3/utils';
import { web3 } from '@coral-xyz/anchor';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import PopUp from '@/components/PopUp';
import Notification from '@/components/Notification';
import useScreen from '@/hooks/useScreen';

import { NATIVE_MINT } from '@solana/spl-token';
import { useRouter } from 'next/navigation';
import { PublicKey } from '@solana/web3.js';
import coinList from '@/utils/coinInfoList';

interface BuyModalProps {
  name: string;
  image: string;
  mintAddress?: string | null;
  owner?: string;
  creators?: any;
  listingPrice?: string | null;
  symbol?: string;
  onClose: () => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({
  name,
  image,
  mintAddress,
  creators,
  owner,
  listingPrice,
  symbol,
  onClose,
}) => {
  const [offerPrice, setOfferPrice] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const wallet = useAnchorWallet();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [connectModal, setConnectModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<'error' | 'success'>(
    'success'
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const [coin, setCoin] = useState<any>(coinList[0]);

  const [notification, setNotification] = useState<{
    variant: 'default' | 'success' | 'warning' | 'danger';
    heading: string;
    content: string;
  } | null>(null);
  const isMobile = useScreen();

  const router = useRouter();

  const handleConnectModal = () => {
    setConnectModal(!connectModal);
  };

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

  const handleInstantBuy = async () => {
    try {
      setLoading(true);
      if (!wallet?.publicKey) {
        handleConnectModal();
        return;
      }
      const provider = new anchor.AnchorProvider(
        connection,
        wallet as AnchorWallet,
        {
          preflightCommitment: commitmentLevel,
        }
      );

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(mintAddress as string);
      const seller = new web3.PublicKey(owner as string);
      const creatorList = creators.map(
        (creator: string) => new PublicKey(creator)
      );
      const tx = await instantBuy(
        program,
        wallet as AnchorWallet,
        seller,
        authority,
        treasuryMint,
        nftMint,
        creatorList
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Instant Buy Successful!',
          content: 'Your purchase was completed successfully.',
        });
        router.refresh();
        router.back();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Instant Buy Failed',
          content: 'Instant Buy transaction could not be completed.',
        });
      }
    } catch (error) {
      console.error('InstantBuy error:', error);
    } finally {
      setLoading(false);
    }
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
          <h2 className='text-3xl font-bold text-white'>Buy NFT</h2>
          <p className='text-sm text-[#afafaf]'>You are Buying {name} #3578</p>

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
              <div className='flex justify-between pt-4'>
                <span className='text-[#afafaf] italic'>Quantity:</span>
                <span className='text-white font-bold'>x1</span>
              </div>

              <div className='flex flex-col gap-2 pt-2'>
                <div className='flex justify-between'>
                  <span className='text-[#afafaf]'>Price:</span>
                  <div className='flex justify-center items-center gap-1'>
                    <Image
                      src={coin.image}
                      width={16}
                      height={16}
                      alt='solanaIcon'
                      style={{ width: '16px' }}
                    ></Image>
                    <div className='flex justify-center items-center'>
                      <span className='text-white'>{Number(listingPrice)}</span>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <span className='text-[#afafaf]'>Marketplace Fee;</span>
                  <div className='flex justify-center items-center gap-1'>
                    <Image
                      src={solanaIcon}
                      alt='solanaIcon'
                      style={{ width: '16px' }}
                    ></Image>
                    <div className='flex justify-center items-center'>
                      <span className='text-white'>
                        {Number(listingPrice) * 0.02}(2%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '60%',
                  height: '0.8px',
                  left: '20%',
                  backgroundColor: '#F5F5F5',
                  opacity: 0.1,
                  position: 'absolute',
                  top: '450px', // Distance from the top of the container
                }}
              ></div>

              <button
                className='w-full px-4 py-3 md:px-10 mt-8 flex flex-row gap-2 items-center justify-center rounded-3xl'
                style={{
                  border: '2px solid #5E5E5E',
                  color: '#F5F5F5',
                }}
                onClick={handleInstantBuy}
              >
                Buy Now for {listingPrice} {symbol}
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
