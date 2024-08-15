'use client';

import React, { useState, useEffect } from 'react';
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

const ibmSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function ProfilePage() {
  const wallet = useWallet();
  const address = wallet.publicKey?.toString();
  const [copied, setCopied] = useState(false);
  const [collections, setCollections] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [deposit, setDeposit] = useState([]);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'NFTs' | 'Offers' | 'On Sale' | 'Deposit'>('NFTs');

  useEffect(() => {
    if (address && selectedTab === 'NFTs') {
      getWalletNFTs()
        .then((nfts: NFT[]) => {
          setNFTs(nfts);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching NFTs:', error);
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

  const formattedAddress = formatAddress(address);

  const renderContent = () => {
    if (!wallet) {
      return <Notification message1='Connect wallet to see your profile page' message2='' icon='pajamas:folder' />;
    }

    if (wallet.connected && loading) {
      return <BigSpinner />;
    }

    switch (selectedTab) {
      case 'NFTs':
        if (!nfts || nfts.length === 0) {
          return <Notification message1='Nothing found' message2='No NFT Owned by this user' icon='pajamas:folder' />;
        }
        return (
          <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0 justify-center'>
            {nfts.map((nft: NFT) => (
              <ItemCard key={nft.id} name={nft.name} image={nft.image} price={nft.price} mintAddress={nft.mintAddress?.toString()} />
            ))}
          </div>
        );
      case 'Offers':
        return <Notification message1='No offers found' message2='Not sure if this user owns any collection' icon='pajamas:folder' />;
      case 'On Sale':
        return <Notification message1='No Sales found' message2='No active sale available' icon='pajamas:folder' />;
      case 'Deposit':
        return <Notification message1='' message2='No data found' icon='pajamas:folder' />;
      default:
        return null;
    }
  };

  return (
    <div className={`md:py-20 md:pl-28 md:pr-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
      <div className='flex flex-row justify-center md:justify-end md:p-8 p-4 bg-[#4343434d] rounded-xl'>
        {wallet && address && (
          <div className='p-3 rounded-full bg-black flex flex-row items-center gap-2'>
            <Image src={solanaIcon} width={24} height={24} alt='solana' />
            <div>{formattedAddress}</div>
            <button onClick={() => copyToClipboard(address)} className='flex items-center'>
              <Icon icon={copied ? 'pajamas:task-done' : 'solar:copy-outline'} width={24} />
            </button>
            <button onClick={() => openSolscan(address)} className='flex items-center'>
              <Image src={redirectIcon} width={24} height={24} alt='solana' />
            </button>
          </div>
        )}
      </div>

      <div className='flex md:py-4 md:pl-8 bg-black text-white p-4'>
        <ul className='flex gap-8'>
          <li
            className={`${
              selectedTab === 'NFTs' ? ' bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out' : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('NFTs')}
          >
            NFTs
          </li>
          <li
            className={`${
              selectedTab === 'Offers' ? ' bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out' : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Offers')}
          >
            Offers
          </li>
          <li
            className={`${
              selectedTab === 'On Sale' ? 'bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out' : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('On Sale')}
          >
            On Sale
          </li>
          <li
            className={`${
              selectedTab === 'Deposit' ? 'bg-gradient-to-r from-[#1f1f1f] to-[#2B2B2B] shadow-lg transform scale-105 transition duration-300 ease-in-out' : ''
            } rounded-full px-6 py-2 cursor-pointer`}
            onClick={() => setSelectedTab('Deposit')}
          >
            Deposit
          </li>
        </ul>
      </div>
      {renderContent()}
      {!wallet ? (
        <div className='flex text-neutral-500 text-xl justify-center'>
          <p>Connect wallet to see your profile page</p>
        </div>
      ) : wallet.connected && loading ? (
        <BigSpinner />
      ) : (
        <div className='flex gap-4 md:gap-6 flex-wrap py-3 md:py-0 justify-center'>
          {!nfts || nfts.length === 0 ? (
            <div className='text-neutral-500 text-xl'>Connect wallet to see your profile page</div>
          ) : (
            nfts &&
            nfts.map((nft: NFT) => <ItemCard key={nft.id} name={nft.name} image={nft.image} price={nft.price} mintAddress={nft.mintAddress?.toString()} />)
          )}
        </div>
      )}
    </div>
  );
}
