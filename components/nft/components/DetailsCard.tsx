import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import solanaIcon from '@/public/images/solana-logo.png';
import Image from 'next/image';
import Accordion from '@/components/Accordion';
import { formatAddress } from '@/hooks/useFormatAddress';
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  acceptBuy,
  cancelAuction,
  cancelBuy,
  cancelOfferFromAuction,
  instantBuy,
  unlisting,
  winPrize,
} from '@/web3/contract';
import { commitmentLevel, connection, PROGRAM_INTERFACE } from '@/web3/utils';
import * as anchor from '@coral-xyz/anchor';
import { web3 } from '@coral-xyz/anchor';
import { NATIVE_MINT } from '@solana/spl-token';
import { useRouter } from 'next/navigation';
import { ItemImage } from './ItemImage';
import { PublicKey } from '@metaplex-foundation/js';
import ConnectModal from '@/components/modals/Connect';
import HeartIcon from '@/public/images/heart-filled.png';

export const DetailsCard = (
  props: React.PropsWithChildren<{
    collection?: string;
    name: string;
    image: string;
    description?: string;
    listingPrice?: string;
    owner?: string;
    isOwner: boolean;
    attributes?: {
      traitType: string;
      value: string;
    }[];
    detailsProfile?: {
      creatorRoyaltyFee: string;
      itemContent: string;
    };
    listStatus?: number;
    isOffered?: boolean;
    offers?: any;
    creators?: any;
    mintAddress?: string | null;
    openListModal: () => void; // Add openModal prop
    openBuyModal: () => void; // Add openModal prop
  }>
) => {
  const wallet = useAnchorWallet();
  const router = useRouter();

  const [connectModal, setConnectModal] = useState(false);
  const handleConnectModal = () => {
    setConnectModal(!connectModal);
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
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await unlisting(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        alert('Unlisting successful!');
      } else {
        alert('Unlisting failed.');
      }
      router.push('/');
    } catch (error) {
      console.error('Unlisting error:', error);
    }
  };

  const handleInstantBuy = async () => {
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
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(props.mintAddress as string);
      const seller = new web3.PublicKey(props.owner as string);
      const creators = props.creators.map(
        (creator: string) => new PublicKey(creator)
      );
      const tx = await instantBuy(
        program,
        wallet as AnchorWallet,
        seller,
        authority,
        treasuryMint,
        nftMint,
        creators
      );

      if (tx) {
        alert('InstantBuy successful!');
      } else {
        alert('InstantBuy failed.');
      }
      router.push('/');
    } catch (error) {
      console.error('InstantBuy error:', error);
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
      const treasuryMint = NATIVE_MINT;
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
        alert('AcceptBuy successful!');
      } else {
        alert('AcceptBuy failed.');
      }
      router.push('/');
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
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelBuy(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        alert('Canceling Offer successful!');
      } else {
        alert('Canceling failed.');
      }
      router.push('/');
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
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelOfferFromAuction(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        alert('Cancelling Offer successful!');
      } else {
        alert('Cancelling failed.');
      }
      router.push('/');
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
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const tx = await cancelAuction(
        program,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint
      );

      if (tx) {
        alert('Cancelling Auction successful!');
      } else {
        alert('Cancelling Auction failed.');
      }
      router.push('/');
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
      const treasuryMint = NATIVE_MINT;
      const nftMint = new web3.PublicKey(props.mintAddress as string);

      const buyer = new web3.PublicKey(
        props.offers.reduce((max: any, offer: any) => {
          return offer.price > max.price ? offer : max;
        }).walletAddress
      );
      const creators = props.creators.map(
        (creator: string) => new PublicKey(creator)
      );
      const tx = await winPrize(
        program,
        buyer,
        wallet as AnchorWallet,
        authority,
        treasuryMint,
        nftMint,
        creators
      );

      if (tx) {
        alert('AcceptBuy successful!');
      } else {
        alert('AcceptBuy failed.');
      }
      router.push('/');
    } catch (error) {
      console.error('AcceptBuy error:', error);
    }
  };

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
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
        <div className='flex flex-col md:py-10 md:px-8 md:gap-12 gap-4 max-h-[700px]'>
          <ItemImage imageSrc={props.image} />
          {props.detailsProfile && (
            <Accordion title='Details'>
              <div className='flex md:flex-row flex-col md:gap-16 gap-4'>
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
              <div className='flex flex-row items-center gap-3'>
                <div className='flex flex-row gap-1 items-center'>
                  <span>3.1k</span>
                  <Image
                    src={HeartIcon}
                    alt='Heart Icon'
                  ></Image>
                </div>
              </div>
            </div>
          </div>
          {props.listingPrice && (
            <div className='flex flex-col gap-2'>
              <div className='font-normal text-sm text-[#AFAFAF]'>
                Listing Price
              </div>
              <div className='flex flex-row gap-1 items-center'>
                <Image
                  src={solanaIcon}
                  width={16}
                  height={16}
                  alt='solana'
                />
                <div className='font-semibold text-base'>
                  {props.listingPrice} SOL
                </div>
                <div className='font-semibold text-base '>($200)</div>
              </div>
            </div>
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
                <>
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
                </>
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
                <button
                  className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                  style={{ border: '1px solid #F88430', color: '#F88430' }}
                  onClick={() =>
                    props.listStatus == 1
                      ? handleCancelOffer()
                      : handleCancelOfferFromAuction()
                  }
                >
                  Cancel Offer
                </button>
              ) : (
                <>
                  {props.listStatus == 1 && (
                    <button
                      className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center font-semibold text-black'
                      style={{
                        background:
                          'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                      }}
                      onClick={() => handleInstantBuy()}
                    >
                      <Icon
                        icon='ph:lightning'
                        style={{ color: 'black' }}
                      />
                      Buy now for {props.listingPrice} SOL
                    </button>
                  )}
                  <button
                    className='w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl'
                    style={{ border: '2px solid #FFB703', color: '#F5F5F5' }}
                    onClick={props.openBuyModal}
                  >
                    Make an Offer
                  </button>
                </>
              )}
            </div>
          )}

          {props.description && (
            <Accordion title='Description'>{props.description}</Accordion>
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
          {props.attributes && (
            <Accordion title='Attributes'>
              <div className='flex flex-wrap gap-3 justify-center'>
                {props.attributes?.map((attribute, index) => (
                  <div
                    key={index}
                    className='flex flex-col gap-1 justify-center items-center  p-[1px] bg-gradient-to-r from-[#FFCA43] to-[#F88430] rounded-md'
                  >
                    <div className='bg-[#0b0a0a] rounded-md p-4'>
                      <div className='text-xs font-normal text-[#afafaf]'>
                        {attribute.traitType}
                      </div>
                      <div className='text-sm font-semibold'>
                        {attribute.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          )}
        </div>
      </div>
      {props.isOwner && props.offers.length !== 0 && (
        <div className='flex my-8'>
          <table className='w-full border-collapse border border-gray-300 py-8'>
            <thead>
              <tr>
                <th className='border border-gray-300 px-4 py-2'>From</th>
                <th className='border border-gray-300 px-4 py-2'>Price</th>
                {props.listStatus == 1 && (
                  <th className='border border-gray-300 px-4 py-2'>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.offers.map((row: any) => (
                <tr key={row.id}>
                  <td className='border border-gray-300 px-4 py-2'>
                    {row.walletAddress}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {row.offerPrice}
                  </td>
                  {props.listStatus == 1 && (
                    <td>
                      <button
                        className='py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black'
                        style={{
                          background:
                            'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                        }}
                        onClick={() => handleAcceptOffer(row.id)} // Call openModal when clicked
                      >
                        AcceptOffer
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
