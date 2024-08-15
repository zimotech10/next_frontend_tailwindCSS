import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import solanaIcon from '@/public/images/solana-logo.png';
import { ItemSummary } from '@/components/ItemSummary';
import { offer, offerToAuction } from '@/web3/contract';
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
import PopUp from '@/components/PopUp';

import { NATIVE_MINT } from '@solana/spl-token';

interface OfferModalProps {
  name: string;
  image: string;
  mintAddress?: string | null;
  listStatus?: number;
  onClose: () => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  name,
  image,
  mintAddress,
  listStatus,
  onClose,
}) => {
  const [offerPrice, setOfferPrice] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [expirationDate, setExpirationDate] = useState<string | undefined>(
    undefined
  );
  const [expirationTime, setExpirationTime] = useState<string | undefined>(
    undefined
  );
  const wallet = useAnchorWallet();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [modalVariant, setModalVariant] = useState<'error' | 'success'>(
    'success'
  );

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
      alert('Please connect your wallet.');
      return;
    }

    if (!offerPrice) {
      alert('Please enter a price.');
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
      const treasuryMint = NATIVE_MINT;
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
        // alert('Offer successful!');
      } else {
        setModalVariant('error');
        alert('Offer failed.');
      }
    } catch (error) {
      console.error('Offer error:', error);
      setModalVariant('error');
      alert('An error occurred during offer.');
    }

    setLoading(false);
    setIsModalOpen(true);
    onClose();
  };

  const handleOfferToAuction = async () => {
    if (!wallet || !wallet.publicKey) {
      alert('Please connect your wallet.');
      return;
    }

    if (!offerPrice) {
      alert('Please enter a price.');
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
      const treasuryMint = NATIVE_MINT;
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
        // alert('Offer successful!');
      } else {
        setModalVariant('error');
        alert('Offer failed.');
      }
    } catch (error) {
      console.error('Offer error:', error);
      setModalVariant('error');
      alert('An error occurred during offer.');
    }

    setLoading(false);
    setIsModalOpen(true);
    onClose();
  };
  return (
    <>
      <PopUp
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        message={modalMessage}
        variant={modalVariant}
      />
      <div className='fixed inset-0 flex justify-center items-center z-50 p-4'>
        <div
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
          onClick={onClose}
        ></div>
        <motion.div
          className='relative bg-[#0B0A0A] p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 md:gap-9 max-h-full overflow-y-auto'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className='absolute top-4 right-4 text-white'
            onClick={onClose}
          >
            X
          </button>
          <div className='flex flex-col gap-6 w-full md:w-[576px]'>
            <div className='text-base md:text-2xl'>Offer</div>
            <div className='flex flex-col md:flex-row gap-6 justify-center items-center w-full'>
              <div className='w-[240px] flex justify-center items-center p-[14px] border rounded-md'>
                <img
                  src={image}
                  alt='nftItem'
                  width={240}
                  height={200}
                />
              </div>
              <div className='flex flex-col gap-8 w-full'>
                <div className='flex flex-col gap-[10px] w-full'>
                  <span className='font-semibold text-base'>
                    Enter Offer Price
                  </span>

                  <div className='flex flex-row gap-3 items-center'>
                    <Image
                      src={solanaIcon}
                      width={24}
                      height={24}
                      alt='sol'
                    />
                    <input
                      type='number'
                      className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-full'
                      placeholder='Enter Amount'
                      onChange={handlePriceChange}
                    />
                  </div>
                  {/* {listStatus == 1 && (
                    <>
                      <span className='font-semibold text-base'>
                        Expiration Date
                      </span>
                      <div className='text-[#afafaf] font-normal text-sm'>
                        Set your offer expiration date.
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <input
                          type='date'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='DD-MM-YYYY'
                          value={expirationDate ?? ''}
                          onChange={handleDateChange}
                        />
                        <span>UTC</span>
                        <input
                          type='time'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='HH:MM'
                          value={expirationTime ?? ''}
                          onChange={handleTimeChange}
                        />
                      </div>
                    </>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <ItemSummary
            usage={'buy-fixed'}
            name={name}
            image={image}
          >
            <div className='flex flex-col w-full'>
              <div className='flex flex-row justify-between w-full'>
                <span className='font-normal text-[#afafaf] text-sm'>
                  Quantity:
                </span>
                <span className='text-base font-semibold'>x1</span>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <span className='font-normal text-[#afafaf] text-sm'>
                  Platform Fee:
                </span>
                <span className='text-base font-semibold'>2%</span>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <span className='font-normal text-[#afafaf] text-sm'>
                  Offer Price:
                </span>
                <span className='text-base font-semibold'>
                  {offerPrice} SOL
                </span>
              </div>
              <div className='flex flex-row justify-between w-full'>
                <span className='font-normal text-[#afafaf] text-sm'>
                  Expiration Date:
                </span>
                <span className='text-base font-semibold'>
                  {expirationDate} {expirationTime} UTC
                </span>
              </div>
              <button
                className={`my-2 py-3 rounded-full font-semibold ${
                  expirationDate && expirationTime
                    ? 'bg-gradient-orange text-black'
                    : 'bg-none border'
                }`}
                onClick={listStatus == 1 ? handleOffer : handleOfferToAuction}
              >
                Offer
              </button>
            </div>
          </ItemSummary>
        </motion.div>
      </div>
    </>
  );
};
