'use client';
import { useEffect, useState } from 'react';
import { commitmentLevel, connection, PROGRAM_INTERFACE } from '@/web3/utils';
import * as anchor from '@coral-xyz/anchor';
import { BN } from '@coral-xyz/anchor';
import { NATIVE_MINT } from '@solana/spl-token';
import { deposit } from '@/web3/contract';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import createAxiosClient from '@/api/axiosClient';
import Notification from './Notification';

export default function Deposit() {
  const wallet = useWallet();
  const [depositAmount, setDepositAmount] = useState(1);
  const [notification, setNotification] = useState<{ variant: 'default' | 'success' | 'warning' | 'danger'; heading: string; content: string } | null>(null);
  const handleDepositAmountChange = (e: any) => {
    setDepositAmount(Number(e.target.value));
  };
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        if (wallet.connected) {
          const axiosClient = await createAxiosClient();
          const response = await axiosClient.get('/deposit');
          setAmount(response.data.amount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAmount();
  }, [wallet.connected]);

  const handleDeposit = async () => {
    try {
      if (!wallet?.publicKey) {
        return;
      }
      const provider = new anchor.AnchorProvider(connection, wallet as AnchorWallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new anchor.Program(PROGRAM_INTERFACE, provider);

      const authority = new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_AUTHORITY as string);
      const treasuryMint = NATIVE_MINT;

      const tx = await deposit(program, wallet as AnchorWallet, authority, treasuryMint, new anchor.BN(depositAmount * LAMPORTS_PER_SOL));

      if (tx) {
        setNotification({
          variant: 'success',
          heading: 'Deposit Successful!',
          content: 'Your deposit has been completed successfully.',
        });
      } else {
        setNotification({
          variant: 'danger',
          heading: 'Deposit Failed!',
          content: 'There was an issue with depositing',
        });
      }
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };
  return (
    <div className='flex mx-[20px] md:p-20 md:ml-[41px] md:mt-[41px] md:mb-[40px] md:mr-[20px] justify-center'>
      <div className='flex flex-col gap-4'>
        <p className='flex justify-center items-center'>Deposited Amount: {amount}</p>
        <div className='flex flex-row w-full gap-4'>
          <p className='me-2'>Deposit Amount</p>
          <input
            className='bg-black text-white text-[20px] leading-6 outline-none border rounded-md border-white p-3'
            type='number'
            value={depositAmount}
            onChange={(e) => handleDepositAmountChange(e)}
          />
        </div>
        <div className='flex flex-row w-full justify-end gap-2'>
          <button
            className='flex text-black rounded-3xl py-2 justify-center font-semibold items-center'
            style={{
              width: '156px',
              background: 'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
            }}
            onClick={() => handleDeposit()}
          >
            Deposit
          </button>
          <button
            className='flex text-black rounded-3xl py-2 justify-center font-semibold items-center'
            style={{
              width: '156px',
              background: 'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
            }}
          >
            Cancel
          </button>
        </div>
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
    </div>
  );
}
