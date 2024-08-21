'use client';

import React, { useState, useEffect, useRef } from 'react';
import { IBM_Plex_Sans } from 'next/font/google';
import { useWallet } from '@solana/wallet-adapter-react';
import solanaIcon from '@/public/images/solana-logo.png';
import Image from 'next/image';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import redirectIcon from '@/public/vectors/redirect.svg';
import { formatAddress } from '@/hooks/useFormatAddress';
import { getWalletNFTs } from '@/utils/getWalletNFTs';
import ItemCard from '@/components/ItemCard';
import { NFT } from '@/models/NFT';
import { BigSpinner } from '@/components/Spinner';
import Notification from '@/components/profileNotification';
import Deposit from '@/components/Deposit';
import { ActivityApi } from '@/api/activityApi';

const ibmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function ProfilePage() {
  const wallet = useWallet();
  const address = wallet.publicKey?.toString();
  const [copied, setCopied] = useState(false);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState<
    'NFTs' | 'Offers' | 'On Sale' | 'Deposit' | 'Activity'
  >('NFTs');
  const [activities, setActivities] = useState<any[]>([]);
  const [sortModal, setSortModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [type, setType] = useState('all');
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
    try {
      setLoading(true);
      const { rows, totalCount } = await ActivityApi.getWalletActivity(
        limit,
        offset,
        type
      );
      if (rows) setActivities((prevActivities) => [...prevActivities, ...rows]);
      setTotalCount(totalCount);
      setLoading(false);
    } catch (error) {
      console.log('Error Fetching Activities:', error);
      setLoading(false);
    }
  };

  const handleExploreMore = () => {
    const newOffset = activities.length;
    setOffset(newOffset);
    fetchActivities(10, newOffset, type);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedTab == 'Activity') {
      setOffset(0);
      setActivities([]);
      fetchActivities(10, 0, type);
    }
  }, [selectedTab, , type]);

  useEffect(() => {
    if (address) {
      let category = '';
      if (selectedTab === 'NFTs') category = 'nfts';
      else if (selectedTab === 'Offers') category = 'offered';
      else if (selectedTab === 'On Sale') category = 'onSale';
      else return;
      setLoading(true);
      getWalletNFTs(category)
        .then((nfts: NFT[]) => {
          setNFTs(nfts);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching NFTs:', error);
          setNFTs([]);
          setLoading(false);
        });
    }
  }, [address, selectedTab]);

  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const openSolscan = (address: string | undefined) => {
    if (address) {
      const solscanUrl = `https://solscan.io/account/${address}`;
      window.open(solscanUrl, '_blank');
    }
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

  const formattedAddress = formatAddress(address);

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

    if (wallet.connected && loading) {
      return <BigSpinner />;
    }

    switch (selectedTab) {
      case 'NFTs':
        if (!nfts || nfts.length === 0) {
          return (
            <Notification
              message1='Nothing found'
              message2='No NFT Owned by this user'
              icon='pajamas:folder'
            />
          );
        }
        return (
          <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0'>
            {nfts.map((nft: NFT) => (
              <ItemCard
                key={nft.id}
                name={nft.name}
                image={nft.image}
                price={nft.price}
                mintAddress={nft.mintAddress?.toString()}
                symbol={nft.symbol}
              />
            ))}
          </div>
        );
      case 'Offers':
        if (!nfts || nfts.length === 0) {
          return (
            <Notification
              message1='No offers found'
              message2='Not sure if this user owns any collection'
              icon='pajamas:folder'
            />
          );
        }
        return (
          <>
            <div className=''>
              <p>Offered</p>
              <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0'>
                {nfts.map(
                  (nft: NFT) =>
                    nft.offered == 'Offered' && (
                      <ItemCard
                        key={nft.id}
                        name={nft.name}
                        image={nft.image}
                        price={nft.price}
                        mintAddress={nft.mintAddress?.toString()}
                        symbol={nft.symbol}
                      />
                    )
                )}
              </div>
            </div>
            <div className=''>
              <p>Received</p>
              <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0'>
                {nfts.map(
                  (nft: NFT) =>
                    nft.offered == 'Received' && (
                      <ItemCard
                        key={nft.id}
                        name={nft.name}
                        image={nft.image}
                        price={nft.price}
                        mintAddress={nft.mintAddress?.toString()}
                        symbol={nft.symbol}
                      />
                    )
                )}
              </div>
            </div>
          </>
        );
      case 'On Sale':
        if (!nfts || nfts.length === 0) {
          return (
            <Notification
              message1='No Sales found'
              message2='No active sale available'
              icon='pajamas:folder'
            />
          );
        }
        return (
          <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0'>
            {nfts.map((nft: NFT) => (
              <ItemCard
                key={nft.id}
                name={nft.name}
                image={nft.image}
                price={nft.price}
                mintAddress={nft.mintAddress?.toString()}
                symbol={nft.symbol}
              />
            ))}
          </div>
        );

      case 'Activity':
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
          <div className='flex w-full py-3 md:py-0'>
            {activities && activities.length !== 0 && (
              <div className='flex flex-col justify-center w-full'>
                <div className='flex justify-end'>
                  <div
                    className='flex flex-row items-center justify-center cursor-pointer w-fit relative py-2 h-11 px-3 md:px-8 rounded-2xl md:rounded-[32px] gap-2 md:gap-4 border-[1px] border-[#191C1F]'
                    style={{ backgroundColor: '#0B0A0A' }}
                    onClick={() => setSortModal(!sortModal)}
                    ref={sortRef}
                  >
                    <span style={{ fontSize: '14px', color: '#CDD4E6' }}>
                      {type.toUpperCase()}
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
                          onClick={() => selectSort('all')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>All</span>
                        </div>
                        <div
                          onClick={() => selectSort('list')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>List</span>
                        </div>
                        <div
                          onClick={() => selectSort('unlist')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Unlist</span>
                        </div>
                        <div
                          onClick={() => selectSort('offer')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Offer</span>
                        </div>
                        <div
                          onClick={() => selectSort('cancel offer')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Cancel Offer</span>
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
                          onClick={() => selectSort('auction')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Auction</span>
                        </div>
                        <div
                          onClick={() => selectSort('cancel auction')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Cancel Auction</span>
                        </div>
                        <div
                          onClick={() => selectSort('auction offer')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Auction Offer</span>
                        </div>
                        <div
                          onClick={() => selectSort('cancel auction offer')}
                          style={{
                            width: '100%',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                          }}
                        >
                          <span>Cancel Auction Offer</span>
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
                        <div className='grid grid-cols-12 text-[#AFAFAF] justify-between'>
                          <div className='col-span-1 py-2 text-center'>S/N</div>
                          <div className='col-span-2 py-2 text-center'>
                            Type
                          </div>
                          <div className='col-span-3 py-2 text-center'>
                            From
                          </div>
                          <div className='col-span-3 py-2 text-center'>To</div>
                          <div className='col-span-1 py-2 text-right'>
                            Price
                          </div>
                          <div className={`col-span-2 py-2 text-center`}>
                            Timestamp
                          </div>
                        </div>

                        <div className='py-6 '>
                          {activities.map((row: any, index: number) => (
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
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {activities && activities.length < totalCount && (
                  <div className='flex justify-center items-center'>
                    <button
                      className='w-fit px-16 py-4 border-white border rounded-full'
                      onClick={() => handleExploreMore()}
                    >
                      Explore more
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'Deposit':
        return <Deposit />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`md:py-20 md:pl-28 md:pr-20 p-4 ${ibmSans.className} flex flex-col gap-12`}
    >
      <div className='flex flex-row justify-center md:justify-end md:p-8 p-4 bg-[#4343434d] rounded-xl'>
        {wallet && address && (
          <div className='p-3 rounded-full bg-black flex flex-row items-center gap-2'>
            <Image
              src={solanaIcon}
              width={24}
              height={24}
              alt='solana'
            />
            <div>{formattedAddress}</div>
            <button
              onClick={() => copyToClipboard(address)}
              className='flex items-center'
            >
              <Icon
                icon={copied ? 'pajamas:task-done' : 'solar:copy-outline'}
                width={24}
              />
            </button>
            <button
              onClick={() => openSolscan(address)}
              className='flex items-center'
            >
              <Image
                src={redirectIcon}
                width={24}
                height={24}
                alt='solana'
              />
            </button>
          </div>
        )}
      </div>

      <div className='flex md:py-4 md:pl-8 bg-black text-white p-4'>
        <ul className='flex gap-8'>
          <li
            className={`${
              selectedTab === 'NFTs'
                ? ' bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('NFTs')}
          >
            NFTs
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
          <li
            className={`${
              selectedTab === 'On Sale'
                ? 'bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('On Sale')}
          >
            On Sale
          </li>
          <li
            className={`${
              selectedTab === 'Activity'
                ? 'bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Activity')}
          >
            Activity
          </li>
          <li
            className={`${
              selectedTab === 'Deposit'
                ? 'bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out'
                : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Deposit')}
          >
            Deposit
          </li>
        </ul>
      </div>
      {renderContent()}
    </div>
  );
}
