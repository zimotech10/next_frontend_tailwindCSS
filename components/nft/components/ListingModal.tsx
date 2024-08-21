import { useState } from 'react';
import { motion } from 'framer-motion';
import { ItemSummary } from '@/components/ItemSummary';
import { createAuction, listing } from '@/web3/contract';
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
import Notification from '@/components/Notification';
import PopUp from '@/components/PopUp';

type ListingType = 'listing-fixed' | 'listing-auction';
import { useRouter } from 'next/navigation';
import CoinSelect from '@/components/CoinSelect';
import coinList from '@/utils/coinInfoList';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Calendar from '@/components/Calendar';

interface ListingModalProps {
  name: string;
  image: string;
  mintAddress?: string | null;
  onClose: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  name,
  image,
  mintAddress,
  onClose,
}) => {
  const router = useRouter();
  const [listingType, setListingType] = useState<ListingType>('listing-fixed');
  const [fixedPrice, setFixedPrice] = useState<number | undefined>(undefined);
  const [minimumBid, setMinimumBid] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [expirationDate, setExpirationDate] = useState<string | undefined>('');
  const [expirationTime, setExpirationTime] = useState<string | undefined>('');
  const wallet = useAnchorWallet();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [modalVariant, setModalVariant] = useState<'error' | 'success'>(
    'success'
  );

  const [selectedCoin, setSelectedCoin] = useState(coinList[0]);

  const [notification, setNotification] = useState<{
    variant: 'default' | 'success' | 'warning' | 'danger';
    heading: string;
    content: string;
  } | null>(null);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixedPrice(Number(event.target.value));
  };

  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinimumBid(Number(event.target.value));
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationTime(event.target.value);
  };

  const convertToUnixTime = (date: any, time: any) => {
    try {
      const combinedDateTime = new Date(`${date}T${time}:00`);
      const unixTime = Math.floor(combinedDateTime.getTime() / 1000);
      return unixTime;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleListing = async () => {
    if (!wallet || !wallet.publicKey) {
      setNotification({
        variant: 'warning',
        heading: 'Please Connect Your Wallet',
        content:
          'Your offer has not been canceled. Please connect your wallet to proceed.',
      });
      return;
    }

    if (!fixedPrice) {
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

      const multiplier = new BN(10 ** selectedCoin.decimals);

      const price = new BN(fixedPrice).mul(multiplier);

      const expiry = null;

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );

      const treasuryMint = new web3.PublicKey(selectedCoin.address);
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await listing(
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
        router.refresh();
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Listing Failed!',
          content:
            'There was an issue with your listing. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Listing error:', error);
      setModalVariant('error');
      setNotification({
        variant: 'danger',
        heading: 'Error During Listing',
        content: 'An error occurred during the listing process.',
      });
    }

    setLoading(false);
    setIsModalOpen(true);
    onClose();
    router.back();
  };

  const handleCreateAuction = async () => {
    if (!wallet || !wallet.publicKey) {
      setNotification({
        variant: 'warning',
        heading: 'Connect Your Wallet',
        content: 'Please connect your wallet to proceed with the action.',
      });

      return;
    }

    if (!minimumBid) {
      setNotification({
        variant: 'warning',
        heading: 'Price Required',
        content: 'Please enter a price to continue.',
      });
      return;
    }

    if (!startDate || !startTime) {
      setNotification({
        variant: 'warning',
        heading: 'Start Time Required',
        content: 'Please enter a start time to proceed.',
      });
      return;
    }

    if (!expirationDate || !expirationTime) {
      setNotification({
        variant: 'warning',
        heading: 'Expiry Time Required',
        content: 'Please enter an expiry time to proceed.',
      });

      return;
    }

    setLoading(true);

    try {
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const price = new BN(minimumBid * web3.LAMPORTS_PER_SOL);
      const auctionStartTime = new anchor.BN(
        convertToUnixTime(startDate, startTime)
      );
      const auctionEndTime = new anchor.BN(
        convertToUnixTime(expirationDate, expirationTime)
      );

      const authority = new web3.PublicKey(
        process.env.NEXT_PUBLIC_AUTHORITY as string
      );
      console.log(selectedCoin.address);
      const treasuryMint = new web3.PublicKey(selectedCoin.address);
      const nftMint = new web3.PublicKey(mintAddress as string);

      const tx = await createAuction(
        program,
        wallet,
        authority,
        treasuryMint,
        nftMint,
        price,
        auctionStartTime,
        auctionEndTime
      );

      if (tx) {
        setModalVariant('success');
        setNotification({
          variant: 'success',
          heading: 'Auction Creation Successful!',
          content: 'Your auction has been created successfully.',
        });
      } else {
        setModalVariant('error');
        setNotification({
          variant: 'danger',
          heading: 'Auction Creation Failed!',
          content: 'There was an issue creating the auction.',
        });
      }
    } catch (error) {
      console.error('Auction Creating error:', error);
      setModalVariant('error');
      setNotification({
        variant: 'danger',
        heading: 'Error During Auction Creation',
        content: 'An error occurred during the auction creation process.',
      });
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
          <div className='flex flex-col gap-6 w-full md:w-[576px]'>
            <div className='text-base md:text-2xl'>
              Select your listing method
            </div>
            <div className='flex flex-col md:flex-row w-full md:w-[576px] p-4 gap-[10px] bg-[#0B0A0A] rounded-lg'>
              <motion.button
                onClick={() => setListingType('listing-fixed')}
                className='flex flex-col gap-1 justify-center items-center py-4 border w-full rounded-[22px]'
                animate={{
                  borderColor:
                    listingType === 'listing-fixed' ? '#FFEA7F' : '#0B0A0A',
                }}
                transition={{ duration: 0.3 }}
              >
                <span className='font-bold text-base'>Fixed Price</span>
                <span className='text-[#afafaf] font-normal text-sm'>
                  Sell NFT for a fixed price
                </span>
              </motion.button>
              <motion.button
                onClick={() => setListingType('listing-auction')}
                className='flex flex-col gap-1 justify-center items-center py-4 border w-full rounded-[22px]'
                animate={{
                  borderColor:
                    listingType === 'listing-auction' ? '#FFEA7F' : '#0B0A0A',
                }}
                transition={{ duration: 0.3 }}
              >
                <span className='font-bold text-base'>Auction</span>
                <span className='text-[#afafaf] font-normal text-sm'>
                  Start an Auction to sell NFT
                </span>
              </motion.button>
            </div>
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
                {listingType === 'listing-fixed' ? (
                  <div className='flex flex-col gap-[10px] w-full'>
                    <span className='font-semibold text-base'>Price</span>
                    <div className='text-[#afafaf] font-normal text-sm'>
                      Enter the price for 1 item (in {selectedCoin?.symbol}).
                    </div>
                    <div className='flex flex-row gap-3 items-center'>
                      <CoinSelect
                        selectedCoin={selectedCoin}
                        setSelectedCoin={setSelectedCoin}
                      />
                      <input
                        type='number'
                        className='p-2 border-[0.5px] outline-none bg-[#0B0A0A] text-white rounded-lg w-full'
                        placeholder='Enter Amount'
                        value={fixedPrice ?? ''}
                        onChange={handlePriceChange}
                        min={0}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col gap-[10px] w-full'>
                    <span className='font-semibold text-base'>Minimum Bid</span>
                    <div className='text-[#afafaf] font-normal text-sm'>
                      Set the minimum bid you want to consider.
                    </div>
                    <div className='flex flex-row gap-3 items-center'>
                      <CoinSelect
                        selectedCoin={selectedCoin}
                        setSelectedCoin={setSelectedCoin}
                      />
                      <input
                        type='number'
                        className='p-2 border-[0.5px] outline-none bg-[#0B0A0A] text-white rounded-lg w-full'
                        placeholder='Enter Amount'
                        value={minimumBid ?? ''}
                        onChange={handleBidChange}
                        min={0}
                      />
                    </div>
                    <span className='font-semibold text-base'>
                      Expiration Date
                    </span>
                    <div className='flex flex-col'>
                      <div className='text-[#afafaf] font-normal text-sm'>
                        Set the minimum bid Auction automatically start from
                        this date and the highest bidder wins.
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <input
                          type='date'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='DD-MM-YYYY'
                          value={startDate ?? ''}
                          onChange={handleStartDateChange}
                        />
                        <span>UTC</span>
                        <input
                          type='time'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='HH:MM'
                          value={startTime ?? ''}
                          onChange={handleStartTimeChange}
                        />
                      </div>
                      {/* <Calendar /> */}
                      <div className='text-[#afafaf] font-normal text-sm'>
                        End on this date and the highest bidder wins.
                      </div>
                      <div className='flex flex-row gap-2 items-center'>
                        <input
                          type='date'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='DD-MM-YYYY'
                          value={expirationDate ?? ''}
                          onChange={handleEndDateChange}
                        />
                        <span>UTC</span>
                        <input
                          type='time'
                          className='p-2 border-[0.5px] bg-[#0B0A0A] text-white rounded-lg w-fit cursor-pointer'
                          placeholder='HH:MM'
                          value={expirationTime ?? ''}
                          onChange={handleEndTimeChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ItemSummary
            usage={listingType}
            name={name}
            image={image}
          >
            {listingType === 'listing-fixed' ? (
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
                    Price:
                  </span>
                  <span className='text-base font-semibold'>
                    {fixedPrice} {selectedCoin.symbol}
                  </span>
                </div>
                <button
                  className={`my-2 py-3 rounded-full
                font-semibold ${
                  fixedPrice
                    ? 'bg-gradient-orange text-black'
                    : 'bg-none border'
                }`}
                  onClick={() => handleListing()}
                >
                  List NFT for Sale
                </button>
              </div>
            ) : (
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
                    Minimum Bid:
                  </span>
                  <span className='text-base font-semibold'>
                    {minimumBid} {selectedCoin.symbol}
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
                    minimumBid && expirationDate && expirationTime
                      ? 'bg-gradient-orange text-black'
                      : 'bg-none border'
                  }`}
                  onClick={() => handleCreateAuction()}
                >
                  Start Auction
                </button>
              </div>
            )}
          </ItemSummary>
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
