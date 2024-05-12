"use client";

import React from "react";
import Modal from "@/components/Modal";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import phantomLogo from "@/public/images/phantom-logo.svg";
import solfareLogo from "@/public/images/solfare.png";
import localFont from "next/font/local";
import { IBM_Plex_Sans } from "next/font/google";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const electronica = localFont({ src: "../../fonts/Electronica.otf" });
const ibmSans = IBM_Plex_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

interface SignUpProps {
  handleConnectModal: () => void;
  isOpen: boolean;
}

const ConnectModal: React.FC<SignUpProps> = ({
  handleConnectModal,
  isOpen,
}) => {
  const [modalContent, setModalContent] = useState("initial");

  const updateModalContent = (content: string) => {
    setModalContent(content);
  };

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <Modal handleConnectModal={handleConnectModal} isOpen>
      <AnimatePresence mode="wait">
        {modalContent === "initial" && (
          <motion.div
            key="content-initial"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col p-0 md:p-6 gap-6 md:gap-5"
          >
            <div className="flex flex-col md:px-6 gap-8 md:gap-4">
              <div className="flex flex-col">
                <span className="font-semibold text-lg pb-3 md:text-2xl">
                  Are you new here?
                </span>
                <span
                  className={`font-normal text-sm md:text-lg ${ibmSans.className}`}
                  style={{ color: "#AFAFAF" }}
                >
                  Welcome to LampapuyNFT Marketplace! <br />
                  Create a crypto wallet to explore.
                </span>
              </div>
              <button
                className="py-4 w-full rounded-3xl flex justify-center text-sm font-medium text-black"
                style={{
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                }}
                onClick={() => updateModalContent("getStarted")}
              >
                Get Started
              </button>
            </div>
            <div className="flex flex-row gap-14 items-center self-center">
              <Icon icon="pepicons-pencil:line-x" width="64" height="64" />
              <span>Or</span>
              <Icon icon="pepicons-pencil:line-x" width="64" height="64" />
            </div>
            <div className="flex flex-col gap-6">
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                style={{ border: "1px solid #F5F5F5" }}
                onClick={() => handleConnectModal()}
              >
                <WalletMultiButtonDynamic>Connect</WalletMultiButtonDynamic>
              </button>
            </div>
          </motion.div>
        )}
        {modalContent === "getStarted" && (
          <motion.div
            key="content-getStarted"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col p-0 md:p-6 gap-6 md:gap-5"
          >
            <div className="flex flex-col md:px-6 gap-4 md:gap-4">
              <h1 className={`${electronica.className} text-lg md:text-2xl`}>
                Welcome LAMPAS
              </h1>
              <span
                className={`${ibmSans.className} font-normal text-xs md:text-xl`}
                style={{ color: "#AFAFAF" }}
              >
                LampapuyNFT supports Solana and Solana networks. Please select a
                wallet provider or blockchain you want to setup with.
              </span>
            </div>
            <div className="flex flex-col md:px-4 gap-6">
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
                style={{ border: "1px solid #F88430" }}
                onClick={() => updateModalContent("newbie")}
              >
                <div className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-sm text-white">
                    Uhmm... I’m Newbie
                  </span>
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#AFAFAF" }}
                  >
                    Guide me through creating my first wallet
                  </span>
                </div>
              </button>
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
                style={{ border: "1px solid #F5F5F5" }}
              >
                <Image src={phantomLogo} width={32} height={32} alt="logo" />
                <div className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-sm text-white">
                    Install Phantom Wallet
                  </span>
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#AFAFAF" }}
                  >
                    Web and mobile wallet provider for Solana
                  </span>
                </div>
              </button>
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
                style={{ border: "1px solid #F5F5F5" }}
              >
                <Image
                  src={solfareLogo}
                  width={32}
                  height={32}
                  alt="logo"
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-2 items-start">
                  <span className="font-semibold text-sm text-white">
                    Install Solfare
                  </span>
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#AFAFAF" }}
                  >
                    Mobile and Web wallet provider for Solana
                  </span>
                </div>
              </button>
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                style={{ border: "1px solid #F88430", color: "#F88430" }}
                onClick={() => {
                  updateModalContent("initial");
                }}
              >
                Back
              </button>
            </div>
          </motion.div>
        )}
        {modalContent === "newbie" && (
          <motion.div
            key="content-newbie"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col p-0 md:p-6 gap-6 md:gap-5"
          >
            <h1 className={`${electronica.className} text-lg md:text-2xl`}>
              What are Wallets?
            </h1>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              1 of 3
            </span>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              In practical terms we’re talking about a simple Chrome/Firefox
              extension or a mobile wallet that is protected by a unique private
              key. This key gives only you access to your wallet on your devices
              and should only be known to you.
            </span>
            <span
              className={`${ibmSans.className} font-normal flex flex-col text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              You should keep this key in a secure place. Losing or forgetting
              private keys means you will no longer have access to that wallet.
              <span style={{ color: "#F88430", textDecoration: "underline" }}>
                Read more on Wallets and Private keys.
              </span>
            </span>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                style={{ border: "1px solid #F88430", color: "#F88430" }}
                onClick={() => {
                  updateModalContent("getStarted");
                }}
              >
                Previous
              </button>
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                style={{
                  color: "black",
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                }}
                onClick={() => {
                  updateModalContent("settingWallet");
                }}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
        {modalContent === "settingWallet" && (
          <motion.div
            key="content-settingWallet"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col p-0 md:p-6 gap-6 md:gap-5"
          >
            <h1 className={`${electronica.className} text-lg md:text-2xl`}>
              Setting up a wallet
            </h1>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              2 of 3
            </span>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              Now, select a blockchain network you’d like to use on LampapuyNFT.
              Remember to keep your private keys and passwords safe.
            </span>
            <div className="flex flex-col gap-4">
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
                style={{ border: "1px solid #F5F5F5" }}
              >
                <Image src={phantomLogo} width={32} height={32} alt="logo" />
                <div className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-sm text-white">
                    Install Phantom Wallet
                  </span>
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#AFAFAF" }}
                  >
                    Web and mobile wallet provider for Solana
                  </span>
                  <div
                    className="flex flex-row gap-2 text-xs"
                    style={{ color: "#FFB703" }}
                  >
                    <span>*Web, Mobile</span>
                    <span>*No KYC needed</span>
                  </div>
                </div>
              </button>
              <button
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
                style={{ border: "1px solid #F5F5F5" }}
              >
                <Image
                  src={solfareLogo}
                  width={32}
                  height={32}
                  alt="logo"
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-2 items-start">
                  <span className="font-semibold text-sm text-white">
                    Install Solfare Wallet
                  </span>
                  <span
                    className="font-normal text-xs"
                    style={{ color: "#AFAFAF" }}
                  >
                    Mobile and Web wallet provider for Solana
                  </span>
                  <div
                    className="flex flex-row gap-2 text-xs"
                    style={{ color: "#FFB703" }}
                  >
                    <span>*Web, Mobile</span>
                    <span>*No KYC needed</span>
                  </div>
                </div>
              </button>
              <button
                className="text-sm font-semibold text-center"
                style={{
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
                onClick={() => updateModalContent("finalConnect")}
              >
                I have completed Setup, Start
              </button>
            </div>
          </motion.div>
        )}
        {modalContent === "finalConnect" && (
          <motion.div
            key="content-finalConnect"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col p-0 md:p-6 gap-6 md:gap-5 w-full"
          >
            <h1 className={`${electronica.className} text-lg md:text-2xl`}>
              You made it, great!
            </h1>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              3 of 3
            </span>
            <span
              className={`${ibmSans.className} font-normal text-xs md:text-base`}
              style={{ color: "#AFAFAF" }}
            >
              How about you show off that new wallet of yours by connecting to
              LampapuyNFT first!
            </span>
            <button
              className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
              style={{ border: "1px solid #F5F5F5" }}
              onClick={() => handleConnectModal()}
            >
              <WalletMultiButtonDynamic className="w-full">
                Connect
              </WalletMultiButtonDynamic>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default ConnectModal;
