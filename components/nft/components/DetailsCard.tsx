import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Image from 'next/image';
import Accordion from '@/components/Accordion';
import { formatAddress } from '@/hooks/useFormatAddress';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  acceptBuy,
  cancelAuction,
  cancelBuy,
  cancelOfferFromAuction,
  unlisting,
  winPrize,
} from '@/web3/contract';
import { commitmentLevel, connection, PROGRAM_INTERFACE } from '@/web3/utils';
import * as anchor from '@coral-xyz/anchor';
import { web3 } from '@coral-xyz/anchor';
import { useRouter } from 'next/navigation';
import { ItemImage } from './ItemImage';
import { PublicKey } from '@metaplex-foundation/js';
import ConnectModal from '@/components/modals/Connect';
import useScreen from '@/hooks/useScreen';
import CountdownTimer from '@/components/CountdownTimer';
import Notification from '@/components/profileNotification';
import coinList from '@/utils/coinInfoList';
import { BigSpinner } from '@/components/Spinner';
import { ActivityApi } from '@/api/activityApi';

export const DetailsCard = (
  props: React.PropsWithChildren<{
    collection?: string;
    name: string;
    image: string;
    description?: string;
    listingPrice?: string | null;
    owner?: string;
    isOwner: boolean;
    attributes?: any[];
    detailsProfile?: {
      creatorRoyaltyFee: string;
      itemContent: string;
    };
    listStatus?: number;
    isOffered?: boolean;
    offers?: any;
    creators?: any;
    symbol?: string;
    mintAddress?: string | null;
    startTime?: number;
    endTime?: number;
    openListModal: () => void; // Add openModal prop
    openOfferModal: () => void; // Add openModal prop
    openBuyModal: () => void; // Add openModal prop
  }>
) => {
  const wallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [coin, setCoin] = useState<any>(coinList[0]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [type, setType] = useState('');

  const [connectModal, setConnectModal] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [isWinner, setIsWinner] = useState(false);
  const [notification, setNotification] = useState<{
    variant: 'default' | 'success' | 'warning' | 'danger';
    heading: string;
    content: string;
  } | null>(null);
  const handleConnectModal = () => {
    setConnectModal(!connectModal);
  };
  const [selectedTab, setSelectedTab] = useState<'Activities' | 'Offers'>(
    'Activities'
  );

  const [sortModal, setSortModal] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const selectSort = (method: string) => {
    setType(method);
    setSortModal(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setSortModal(false);
    }
  };

  const fetchActivities = async (
    limit: number,
    offset: number,
    type: string
  ) => {
    const newActivities = await ActivityApi.getNFTActivity(
      String(props.mintAddress),
      limit,
      offset,
      type
    );
    setActivities((prevActivities) => [...prevActivities, ...newActivities]);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedTab == 'Activities' && props.mintAddress) {
      setOffset(0);
      setActivities([]);
      fetchActivities(limit, 0, type);
    }
  }, [selectedTab, props.mintAddress, type]);

  useEffect(() => {
    try {
      if (props.symbol) {
        setCoin(coinList.find((coin) => coin.symbol === props.symbol));
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.symbol]);

  useEffect(() => {
    try {
      if (props.offers && props.offers.length != 0) {
        const topOffer = props.offers.reduce(
          (maxOffer: any, currentOffer: any) => {
            return currentOffer.offerPrice > maxOffer.offerPrice
              ? currentOffer
              : maxOffer;
          }
        );
        setIsWinner(topOffer.walletAddress == wallet?.publicKey.toString());
      }
    } catch (err) {
      console.log(err);
      setIsWinner(false);
    }
  }, [props.offers]);

  const handleExploreMore = () => {
    const newOffset = activities.length;
    setOffset(newOffset);
    fetchActivities(limit, newOffset, type);
  };

  const handleUnlisting = async () => {
    try {
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
      const treasuryMint = new PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await unlisting(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Unlisting Successful!',
          content: 'Your NFT has been successfully unlisted.',
        });
        setTimeout(() => {
          router.refresh();
        }, 6000);
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Unlisting Failed!',
          content: 'There was an issue unlisting your NFT.',
        });
      }
    } catch (error) {
      console.error('Unlisting error:', error);
    }
  };

  const handleAcceptOffer = async (id: number) => {
    try {
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
      const treasuryMint = new web3.PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const buyer = new web3.PublicKey(
        props.offers.find((offer: any) => offer.id === id).walletAddress
      );
      const creators = props.creators.map(
        (creator: string) => new PublicKey(creator)
      );
      const tx = await acceptBuy(
        program,
        buyer,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint,
        creators
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'AcceptBuy Successful!',
          content: 'Your purchase was completed successfully',
        });
        router.refresh();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'AcceptBuy Failed!',
          content: 'There was an issue completing your purchase.',
        });
      }
    } catch (error) {
      console.error('AcceptBuy error:', error);
    }
  };

  const handleCancelOffer = async () => {
    try {
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
      const treasuryMint = new web3.PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelBuy(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Canceling Offer Successful!',
          content: 'Your offer has been successfully canceled.',
        });
        router.refresh();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Canceling Failed!',
          content: 'Your offer could not be canceled. ',
        });
      }
    } catch (error) {
      console.error('Canceling error:', error);
    }
  };

  const handleCancelOfferFromAuction = async () => {
    try {
      if (!wallet?.publicKey) {
        handleConnectModal();
        return;
      }
      if (isWinner) {
        setNotification({
          variant: 'danger',
          heading: 'Failed!',
          content: 'You are the top bidder. You can’t cancel your offer.',
        });

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
      const treasuryMint = new web3.PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelOfferFromAuction(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Cancelling Offer Successful!',
          content: 'Your offer has been successfully canceled.',
        });

        router.refresh();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Cancelling Offer Failed!',
          content: 'Your offer could not be canceled.',
        });
      }
    } catch (error) {
      console.error('Cancelling error:', error);
    }
  };

  const handleCancelAuction = async () => {
    try {
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
      const treasuryMint = new web3.PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelAuction(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Cancelling Auction Successful!',
          content: 'Your auction has been successfully canceled.',
        });
        router.refresh();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Cancelling Auction Failed!',
          content: 'Your auction could not be canceled.',
        });
      }
    } catch (error) {
      console.error('Cancelling Auction error:', error);
    }
  };

  const handleWinPrize = async () => {
    try {
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
      const treasuryMint = new web3.PublicKey(String(coin?.address));
      const nftMint = new web3.PublicKey(props.mintAddress as string);
      const seller = new web3.PublicKey(props.owner as string);

      const creators = props.creators.map(
        (creator: string) => new PublicKey(creator)
      );
      const tx = await winPrize(
        program,
        wallet as AnchorWallet,
        seller,
        authority,
        treasuryMint,
        nftMint,
        creators
      );

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'WinPrize Successful!',
          content: 'Congratulations! Your prize has been won successfully.',
        });
        router.refresh();
      } else {
        setNotification({
          variant: 'danger',
          heading: 'WinPrize Failed!',
          content: 'There was an issue with claiming your prize.',
        });
      }
    } catch (error) {
      console.error('WinPrize error:', error);
    }
  };

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };

  const timeOffset = (isoString: string) => {
    const offerTime = new Date(isoString);
    const offerUnixTime = Math.floor(offerTime.getTime() / 1000);
    const currentUnixTime = Math.floor(Date.now() / 1000);

    const differenceInSeconds = currentUnixTime - offerUnixTime;

    const days = Math.floor(differenceInSeconds / (3600 * 24));
    const hours = Math.floor((differenceInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    if (days != 0) {
      return `${days} days ago`;
    } else if (hours != 0) {
      return `${hours} hours ago`;
    } else if (minutes != 0) {
      return `${minutes} mins ago`;
    } else return `a minute ago`;
  };

  const isMobile = useScreen();

  const renderContent = () => {
    if (!wallet) {
      return (
        <Notification
          message1='Connect wallet to see your profile page'
          message2=''
          icon='pajamas:folder'
        />
      );
    }

    if (loading) {
      return <BigSpinner />;
    }

    switch (selectedTab) {
      case 'Activities':
        if (!activities || activities.length === 0) {
          return (
            <Notification
              message1='Nothing found'
              message2='No Activities of This NFT'
              icon='pajamas:folder'
            />
          );
        }
        return (
          <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0'>
            {activities && activities.length !== 0 && (
              <div className='flex flex-col justify-center w-full'>
                <div className='flex justify-end'>
                  <div
                    className='flex flex-row items-center cursor-pointer w-fit relative py-2 h-11 px-3 md:px-8 rounded-2xl md:rounded-[32px] gap-2 md:gap-4 border-[1px] border-[#191C1F]'
                    style={{ backgroundColor: '#0B0A0A' }}
                    onClick={() => setSortModal(!sortModal)}
                    ref={sortRef}
                  >
                    <span style={{ fontSize: '14px', color: '#CDD4E6' }}>
                      {type}
                    </span>
                    <Icon
                      icon='mingcute:down-line'
                      width={20}
                    />
                    {sortModal && (
                      <div
                        className='absolute top-12 z-50 p-3 flex flex-col gap-3 rounded-md items-start'
                        style={{ width: '170px', backgroundColor: '#0B0A0A' }}
                      >
                        <div
                          onClick={() => selectSort('buy')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Instant Buy</span>
                        </div>
                        <div
                          onClick={() => selectSort('accept offer')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Accept Offer</span>
                        </div>
                        <div
                          onClick={() => selectSort('win prize')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Win Prize</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {activities && activities.length !== 0 && (
                    <div className='my-8 md:pl-16 pl-4'>
                      <div className='w-full py-8'>
                        {isMobile ? (
                          ''
                        ) : (
                          <div className='grid grid-cols-12 text-[#AFAFAF] justify-between'>
                            <div className='col-span-1 py-2 text-center'>
                              S/N
                            </div>
                            <div className='col-span-2 py-2 text-center'>
                              Type
                            </div>
                            <div className='col-span-3 py-2 text-center'>
                              From
                            </div>
                            <div className='col-span-3 py-2 text-center'>
                              To
                            </div>
                            <div className='col-span-1 py-2 text-right'>
                              Price
                            </div>
                            <div className={`col-span-2 py-2 text-center`}>
                              Timestamp
                            </div>
                          </div>
                        )}
                        <div className='py-6 '>
                          {activities.map((row: any, index: number) =>
                            isMobile ? (
                              <div
                                key={row.id}
                                className='bg-black text-white p-4 rounded-lg max-w-sm gap-4 md:gap-0 border border-[#333] mb-6 py-6'
                              >
                                <div className='flex justify-between items-center'>
                                  <div className='flex items-center'>
                                    <span className='font-semibold'>
                                      {row.type}
                                    </span>
                                  </div>
                                </div>
                                <div className='mt-4'>
                                  <p>From</p>
                                  <p className='text-white'>
                                    {formatAddress(row.from)}
                                  </p>
                                </div>
                                <div className='mt-4'>
                                  <p>From</p>
                                  <p className='text-white'>
                                    {formatAddress(row.to)}
                                  </p>
                                </div>
                                <div className='flex justify-between items-center mt-4'>
                                  <div className='flex items-center gap-1'>
                                    <Image
                                      src={coin.image}
                                      alt='solana'
                                      width={18}
                                      height={18}
                                    ></Image>
                                    <span className='text-white text-lg'>
                                      {' '}
                                      {row.price}
                                    </span>
                                  </div>
                                  <p className='text-gray-500'>
                                    {timeOffset(row.updatedAt)}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                key={row.id}
                                className='grid grid-cols-12 gap-4 md:gap-0 rounded-lg border border-[#333] mb-6 py-6'
                              >
                                <div className='col-span-12 md:col-span-1 py-2 text-center'>
                                  {index + 1}
                                </div>
                                <div className='col-span-12 md:col-span-2 py-2 text-center'>
                                  {row.type}
                                </div>
                                <div className='col-span-12 md:col-span-3 py-2 text-center'>
                                  {formatAddress(row.from)}
                                </div>
                                <div className='col-span-12 md:col-span-3 py-2 text-center'>
                                  {formatAddress(row.to)}
                                </div>
                                <div className='col-span-12 md:col-span-1 py-2 text-right'>
                                  {row.price}
                                </div>
                                <div className={`col-span-2 py-2 text-center`}>
                                  {timeOffset(row.updatedAt)}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex justify-center items-center'>
                  <button
                    className='w-fit px-16 py-4 border-white border rounded-full'
                    onClick={() => handleExploreMore()}
                  >
                    Explore more
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'Offers':
        if (!props.offers || props.offers.length === 0) {
          return (
            <Notification
              message1='Nothing found'
              message2='No Offers of This NFT'
              icon='pajamas:folder'
            />
          );
        }
        return (
          <>
            {props.offers && props.offers.length !== 0 && (
              <div className='my-8 md:pl-16 pl-4'>
                <div className='w-full py-8'>
                  {isMobile ? (
                    ''
                  ) : (
                    <div className='grid grid-cols-12 text-[#AFAFAF] justify-between'>
                      <div className='col-span-1 py-2 text-center'>S/N</div>
                      <div className='col-span-5 py-2 text-center'>From</div>
                      <div className='col-span-2 py-2 text-right'>Price</div>
                      <div
                        className={`${
                          props.listStatus == 1 ? 'col-span-2' : 'col-span-3'
                        } py-2 text-center`}
                      >
                        Timestamp
                      </div>
                      {props.listStatus == 1 && props.isOwner && (
                        <div className='col-span-2 py-2 text-center'>
                          Action
                        </div>
                      )}
                    </div>
                  )}
                  <div className='py-6 '>
                    {props.offers.map((row: any, index: number) =>
                      isMobile ? (
                        <div
                          key={row.id}
                          className='bg-black text-white p-4 rounded-lg max-w-sm gap-4 md:gap-0 border border-[#333] mb-6 py-6'
                        >
                          <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                              <span className='font-semibold'>
                                Offer Received
                              </span>
                            </div>
                            {props.listStatus == 1 && props.isOwner && (
                              <button
                                className='bg-transparent border border-green-400 text-green-400 rounded-lg px-4 py-1'
                                onClick={() => handleAcceptOffer(row.id)}
                              >
                                Accept
                              </button>
                            )}
                          </div>
                          <div className='mt-4'>
                            <p>From</p>
                            <p className='text-white'>
                              {formatAddress(row.walletAddress)}
                            </p>
                          </div>
                          <div className='flex justify-between items-center mt-4'>
                            <div className='flex items-center gap-1'>
                              <Image
                                src={coin.image}
                                alt='solana'
                                width={18}
                                height={18}
                              ></Image>
                              <span className='text-white text-lg'>
                                {' '}
                                {row.offerPrice} {props.symbol}
                              </span>
                            </div>
                            <p className='text-gray-500'>
                              {timeOffset(row.updatedAt)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={row.id}
                          className='grid grid-cols-12 gap-4 md:gap-0 rounded-lg border border-[#333] mb-6 py-6'
                        >
                          <div className='col-span-12 md:col-span-1 py-2 text-center'>
                            {index + 1}
                          </div>
                          <div className='col-span-12 md:col-span-5 py-2 text-center'>
                            {row.walletAddress}
                          </div>
                          <div className='col-span-12 md:col-span-2 py-2 text-right'>
                            {row.offerPrice}
                          </div>
                          <div
                            className={`${
                              props.listStatus == 1
                                ? 'col-span-2'
                                : 'col-span-3'
                            } py-2 text-center`}
                          >
                            {timeOffset(row.updatedAt)}
                          </div>
                          {props.listStatus == 1 && props.isOwner && (
                            <div className='col-span-12 md:col-span-2 text-center'>
                              <button
                                className='py-2 px-6 rounded-3xl text-white border-[1px] border-[#AFAFAF] md:w-auto w-full'
                                onClick={() => handleAcceptOffer(row.id)}
                              >
                                Accept
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col w-full h-full justify-center'>
      {connectModal && (
        <ConnectModal
          handleConnectModal={handleConnectModal}
          isOpen={connectModal}
        />
      )}
      <div className='w-full mb-4'>
        <button
          className='hover:underline md:pl-[160px] flex items-center gap-1'
          onClick={handleBackClick}
        >
          <Icon icon='mdi:arrow-left'></Icon>
          Back
        </button>
      </div>
      <div className='flex md:flex-row flex-col justify-center'>
        <div className='flex flex-col md:py-10 md:px-8 md:gap-12 gap-4 max-h-[800px]'>
          <div className='md:px-0 px-16'>
            <ItemImage imageSrc={props.image} />
          </div>
          {props.detailsProfile && (
            <Accordion title='Details'>
              <div className='flex md:flex-row flex-col md:gap-16 gap-4 pb-4'>
                <div>
                  Creator Royalty Fee : {props.detailsProfile.creatorRoyaltyFee}
                  %
                </div>
                <div>Item Content : {props.detailsProfile.itemContent}</div>
              </div>
            </Accordion>
          )}
        </div>
        <div className='flex flex-col md:py-10 md:px-8 md:gap-12 gap-4 w-full md:w-1/2'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='font-semibold text-2xl md:text-3xl'>
                {props.name}
              </span>
            </div>
          </div>
          {props.listingPrice ? (
            <div className='flex flex-col gap-2'>
              <div className='font-normal text-sm text-[#AFAFAF]'>
                Listing Price
              </div>
              <div className='flex flex-row gap-1 items-center'>
                <Image
                  src={String(coin?.image)}
                  width={16}
                  height={16}
                  alt='solana'
                />
                <div className='font-semibold text-base'>
                  {props.listingPrice} {props.symbol}
                </div>
              </div>
            </div>
          ) : null}
          {props.listStatus == 2 &&
            props.startTime != 0 &&
            props.endTime != 0 && (
              <CountdownTimer
                startTime={props.startTime}
                endTime={props.endTime}
              />
            )}
          {props.isOwner ? (
            <div className='flex flex-col font-semibold text-base md:flex-row gap-2 w-full'>
              {props.listStatus == 1 ? (
                <button
                  className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                  style={{
                    background:
                      'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                  }}
                  onClick={() => handleUnlisting()} // Call openModal when clicked
                >
                  Unlist
                </button>
              ) : props.listStatus == 2 ? (
                props.startTime &&
                props.startTime * 1000 > new Date().getTime() ? (
                  <button
                    className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                    style={{
                      background:
                        'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                    }}
                    onClick={() => handleCancelAuction()} // Call openModal when clicked
                  >
                    Cancel Auction
                  </button>
                ) : (
                  props.offers.length == 0 && (
                    <button
                      className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                      style={{
                        background:
                          'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                      }}
                      onClick={() => handleCancelAuction()} // Call openModal when clicked
                    >
                      Cancel Auction
                    </button>
                  )
                )
              ) : (
                <>
                  <button
                    className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                    style={{
                      background:
                        'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                    }}
                    onClick={props.openListModal} // Call openModal when clicked
                  >
                    List
                  </button>
                  <button
                    className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                    style={{ border: '1px solid #F88430', color: '#F88430' }}
                  >
                    Transfer
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className='flex flex-col font-semibold text-base md:flex-row gap-2 w-full'>
              {props.isOffered ? (
                props.listStatus == 1 ? (
                  <button
                    className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                    style={{ border: '1px solid #F88430', color: '#F88430' }}
                    onClick={() => handleCancelOffer()}
                  >
                    Cancel Offer
                  </button>
                ) : (
                  props.listStatus == 2 &&
                  (props.endTime &&
                  new Date().getTime() - props.endTime * 1000 > 0 ? (
                    isWinner ? (
                      <button
                        className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                        style={{
                          background:
                            'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                        }}
                        onClick={() => handleWinPrize()} // Call openModal when clicked
                      >
                        Win Prize
                      </button>
                    ) : (
                      <button
                        className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                        style={{
                          border: '1px solid #F88430',
                          color: '#F88430',
                        }}
                        onClick={() => handleCancelOfferFromAuction()}
                      >
                        Cancel Offer Auction
                      </button>
                    )
                  ) : (
                    props.startTime &&
                    props.endTime &&
                    props.startTime * 1000 < new Date().getTime() &&
                    new Date().getTime() < props.endTime * 1000 && (
                      <button
                        className={`py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center font-semibold text-black 
                        ${
                          loading
                            ? 'opacity-75 cursor-not-allowed'
                            : 'hover:bg-opacity-90 active:bg-opacity-80'
                        }`}
                        style={{
                          background:
                            'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                        }}
                        onClick={props.openOfferModal}
                      >
                        Place a bid
                      </button>
                    )
                  ))
                )
              ) : props.listStatus == 1 ? (
                <>
                  <button
                    className={`py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center font-semibold text-black 
                                ${
                                  loading
                                    ? 'opacity-75 cursor-not-allowed'
                                    : 'hover:bg-opacity-90 active:bg-opacity-80'
                                }`}
                    style={{
                      background:
                        'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                    }}
                    onClick={props.openBuyModal}
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? (
                      <span className='animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full'></span>
                    ) : (
                      <>
                        <Icon
                          icon='ph:lightning'
                          style={{ color: 'black' }}
                        />
                        Buy now for {props.listingPrice} {props.symbol}
                      </>
                    )}
                  </button>
                  <button
                    className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                    style={{
                      border: '2px solid #FFB703',
                      color: '#F5F5F5',
                    }}
                    onClick={props.openOfferModal}
                  >
                    Make an offer
                  </button>
                </>
              ) : (
                props.startTime &&
                props.endTime &&
                props.startTime * 1000 < new Date().getTime() &&
                new Date().getTime() < props.endTime * 1000 && (
                  <button
                    className={`py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center font-semibold text-black 
                    ${
                      loading
                        ? 'opacity-75 cursor-not-allowed'
                        : 'hover:bg-opacity-90 active:bg-opacity-80'
                    }`}
                    style={{
                      background:
                        'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                    }}
                    onClick={props.openOfferModal}
                  >
                    Place a bid
                  </button>
                )
              )}
            </div>
          )}

          {props.description && (
            <Accordion title='Description'>
              <div className='pb-4'>{props.description}</div>
            </Accordion>
          )}
          <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col gap-2'>
              <div className='font-normal text-sm text-[#AFAFAF]'>Creator:</div>
              {props.creators &&
                props.creators.map((creator: any, index: number) => (
                  <div
                    key={index}
                    className='font-semibold text-base'
                  >
                    {formatAddress(creator)}
                  </div>
                ))}
            </div>
            <div className='flex flex-col gap-2'>
              <div className='font-normal text-sm text-[#AFAFAF]'>
                Owned by:
              </div>
              <div className='font-semibold text-base'>
                {formatAddress(props.owner)}
              </div>
            </div>
          </div>
          {props.attributes?.length ? (
            <Accordion title='Attributes'>
              <div className='flex flex-wrap gap-3 pb-5 justify-center'>
                {props.attributes?.map((attribute, index) => (
                  <div
                    key={index}
                    className='flex flex-col w-1/4 gap-1 justify-center items-center p-[1px] bg-gradient-to-r from-[#FFCA43] to-[#F88430] rounded-md'
                  >
                    <div className='flex flex-col w-full h-full items-center justify-center bg-[#0b0a0a] rounded-md p-4'>
                      <div className='text-xs font-normal text-[#afafaf]'>
                        {attribute.trait_type}
                      </div>
                      <div className='text-sm font-semibold'>
                        {attribute.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='flex md:py-4 md:pl-8 mt-20 bg-black text-white p-4'>
        <ul className='flex gap-8'>
          <li
            className={`${
              selectedTab === 'Activities'
                ? ' bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Activities')}
          >
            Activities
          </li>
          <li
            className={`${
              selectedTab === 'Offers'
                ? ' bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Offers')}
          >
            Offers
          </li>
        </ul>
      </div>
      {renderContent()}
    </div>
  );
};
