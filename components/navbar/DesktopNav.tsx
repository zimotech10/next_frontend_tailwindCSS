import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { IBM_Plex_Sans } from 'next/font/google';
import { useWallet } from '@solana/wallet-adapter-react';
import ConnectModal from '../modals/Connect';
import userSvg from '@/public/vectors/user.svg';
import Image from 'next/image';
import Dropdown from './Dropdown';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { CookieRepository } from '@/storages/cookie/cookie-repository';
import { AuthService } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

const ibmSans = IBM_Plex_Sans({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const DesktopNav = (
  props: React.PropsWithChildren<{
    logo: string;
  }>
) => {
  const [connectModal, setConnectModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const wallet = useWallet();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleConnectModal = () => {
    setConnectModal(!connectModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setDropdown(false);
    }
  };
  const loginCalled = useRef(false);
  const loginUser = async () => {
    if (loginCalled.current) return; // Prevent multiple calls
    loginCalled.current = true;
    try {
      const { data } = await AuthService.getAuthMessage();
      const messageToSign = data.message;
      if (!messageToSign) {
        loginCalled.current = false;
        return;
      }
      if (!wallet.connected) {
        loginCalled.current = false;
        return;
      }
      if (!wallet.signMessage) {
        loginCalled.current = false;
        return;
      }

      const encodedMessage = new TextEncoder().encode(messageToSign);
      const signedMessage = await wallet.signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      await AuthService.login({
        publicKey: wallet.publicKey!.toBase58(),
        signedMessage: signature,
      })
        .then((response) => {
          const { accessToken, refreshToken } = response.data;
          CookieRepository.setAccessToken(accessToken);
          CookieRepository.setRefreshToken(refreshToken);
          setLoggedIn(true);
          router.push('/');
        })
        .catch((error) => {
          loginCalled.current = false;
          setLoggedIn(false);
        });
    } catch (error) {
      loginCalled.current = false;
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !CookieRepository.getAccessToken() && !CookieRepository.getRefreshToken() && wallet.publicKey && !loginCalled.current) {
      loginUser();
    }
  }, [isLoggedIn, wallet]);

  const disConnectWallet = async () => {
    CookieRepository.removeAccessToken();
    CookieRepository.removeRefreshToken();
    await wallet.disconnect();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full h-[71px] sticky py-5 px-16 top-0 z-40 text-base justify-between flex flex-row items-center pl-20 bg-[#181818] ${ibmSans.className}`}
    >
      {connectModal && <ConnectModal handleConnectModal={handleConnectModal} isOpen={connectModal} />}
      <div className='relative' style={{ left: '23px' }}>
        <Icon icon='mingcute:search-line' className='absolute left-[20px] top-1/2 transform -translate-y-1/2' width={20} height={20} />
        <input type='text' className='py-2 h-11 pl-10 pr-3 rounded-md' style={{ backgroundColor: '#262626', width: '491px' }} />
      </div>

      {wallet.connected ? (
        <div>
          <button ref={buttonRef} onClick={() => setDropdown(!dropdown)}>
            <Image src={userSvg} alt='user' width={48} height={48} />
          </button>
          <AnimatePresence>
            {dropdown && (
              <motion.div
                className='absolute right-60'
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Dropdown>
                  <Link
                    href='/profile'
                    onClick={() => setDropdown(!dropdown)}
                  >
                    Profile
                  </Link>
                  <button
                    className='flex text-black rounded-3xl py-2 justify-center font-semibold items-center'
                    style={{
                      width: '156px',
                      background: 'linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)',
                    }}
                    onClick={() => disConnectWallet()}
                  >
                    Disconnect Wallet
                  </button>
                </Dropdown>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <button
          className=' text-black rounded-3xl py-2 justify-center font-semibold items-center'
          style={{
            width: '136px',
            height: '34px',
            background: 'linear-gradient(175deg, #FFEA7F 9.83%, #AB5706 95.76%)',
            fontFamily: 'IBM Plex Sans',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '18.2px',
          }}
          onClick={() => handleConnectModal()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default DesktopNav;
