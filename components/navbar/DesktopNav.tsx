import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectModal from "../modals/Connect";
import userSvg from "@/public/vectors/user.svg";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ibmSans = IBM_Plex_Sans({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const DesktopNav = (
  props: React.PropsWithChildren<{
    logo: string;
  }>
) => {
  const [connectModal, setConnectModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const wallet = useWallet();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleConnectModal = () => {
    setConnectModal(!connectModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full sticky py-5 px-12 top-0 z-40 text-base justify-between flex flex-row items-center pl-20 bg-[#181818] ${ibmSans.className}`}
    >
      {connectModal && (
        <ConnectModal
          handleConnectModal={handleConnectModal}
          isOpen={connectModal}
        />
      )}
      <div className="relative">
        <Icon
          icon="mingcute:search-line"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          width={20}
          height={20}
        />
        <input
          type="text"
          className="py-2 h-11 pl-10 pr-3 rounded-md"
          placeholder="Search"
          style={{ backgroundColor: "#262626", width: "491px" }}
        />
      </div>

      {wallet.connected ? (
        <div>
          <button ref={buttonRef} onClick={() => setDropdown(!dropdown)}>
            <Image src={userSvg} alt="user" width={48} height={48} />
          </button>
          <AnimatePresence>
            {dropdown && (
              <motion.div
                className="absolute right-60"
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Dropdown>
                  <Link href="/profile">Profile</Link>
                  <button
                    className="flex text-black rounded-3xl py-2 justify-center font-semibold items-center"
                    style={{
                      width: "156px",
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                    onClick={() => wallet.disconnect()}
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
          className="flex text-black rounded-3xl py-2 justify-center font-semibold items-center"
          style={{
            width: "156px",
            background:
              "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
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
