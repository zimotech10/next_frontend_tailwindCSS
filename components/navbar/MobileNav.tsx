import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectModal from "../modals/Connect";
import { motion, AnimatePresence } from "framer-motion";
import axiosClient from "@/api/axiosClient";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { CookieRepository } from "@/storages/cookie/cookie-repository";
import { AuthService } from "@/services/auth-service";

interface MobileNavProps {
  logo: string;
}

const MobileNav: React.FC<MobileNavProps> = (props) => {
  const [menu, setMenu] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const wallet = useWallet();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleConnectModal = () => {
    setConnectModal(!connectModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setMenu(false);
    }
  };


  const loginUser = async () => {
    try {
      const {data} = await AuthService.getAuthMessage();
      const messageToSign = data.message;
      if (!messageToSign) {
        return;
      }
      if (!wallet.connected) {
        return;
      }
      if (!wallet.signMessage) {
        return;
      }

      const encodedMessage = new TextEncoder().encode(messageToSign);
      const signedMessage = await wallet.signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      await AuthService.login({
        publicKey: wallet.publicKey!.toBase58(),
        signedMessage: signature
      }).then((response) => {
        console.log(response.data)
        const {accessToken, refreshToken} = response.data;
        CookieRepository.setAccessToken(accessToken);
        CookieRepository.setRefreshToken(refreshToken);
        setLoggedIn(true);
      }).catch((error) => {
        setLoggedIn(false);
      });
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if(!isLoggedIn && wallet.publicKey)
    {
      loginUser()
    }
  }, [isLoggedIn, wallet])

  const disConnectWallet = async () => {
    CookieRepository.removeAccessToken();
    CookieRepository.removeRefreshToken();
    await wallet.disconnect();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between p-3 z-50">
      {connectModal && (
        <ConnectModal
          handleConnectModal={handleConnectModal}
          isOpen={connectModal}
        />
      )}
      <div className="flex flex-row gap-1 items-center">
        <Image src={props.logo} width={132} height={48} alt="logo" />
        <Icon icon="mingcute:search-line" width={20} height={20} />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div
          className="p-1 flex items-center bg-white"
          style={{ borderRadius: "31px" }}
        >
          <Icon icon="solar:cart-bold" width={24} style={{ color: "black" }} />
        </div>
        <button ref={buttonRef} onClick={() => setMenu(!menu)}>
          <Icon icon="akar-icons:three-line-horizontal" />
        </button>
        <AnimatePresence>
          {menu && (
            <motion.div
              className="absolute right-48 top-14"
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Dropdown>
                <Link href="/launchpad">Launchpad</Link>
                <Link href="/launchpad">Sell/Buy</Link>
                <Link href="/launchpad">Private Sale</Link>
                {wallet.connected ? (
                  <button
                    className="flex text-black rounded-3xl py-2 justify-center font-semibold items-center"
                    style={{
                      width: "156px",
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                    onClick={() => disConnectWallet()}
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    className="flex text-black rounded-3xl py-2 justify-center font-semibold items-center"
                    style={{
                      width: "136px",
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                    onClick={() => handleConnectModal()}
                  >
                    Connect Wallet
                  </button>
                )}
              </Dropdown>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileNav;
