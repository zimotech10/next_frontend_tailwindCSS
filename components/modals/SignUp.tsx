"use client";

import React from "react";
import Modal from "@/components/Modal";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Image from "next/image";
import phantomLogo from "@/public/images/phantom-logo.svg";
import cryptoXlogo from "@/public/images/crypto-x-logo.png";

interface SignUpProps {
  handleConnectModal: () => void;
  isOpen: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ handleConnectModal, isOpen }) => {
  return (
    <Modal handleConnectModal={handleConnectModal} isOpen>
      <div className="flex flex-col p-0 md:p-6 gap-6 md:gap-5">
        <div className="flex flex-col md:px-6 gap-8 md:gap-4">
          <div className="flex flex-col">
            <span className="font-semibold text-lg pb-3 md:text-2xl">
              Are you new here?
            </span>
            <span
              className="font-normal text-sm md:text-lg"
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
            className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center rounded-3xl"
            style={{ border: "1px solid #F5F5F5" }}
          >
            <Image src={phantomLogo} width={32} height={32} alt="logo" />
            <div className="flex flex-col items-start gap-2">
              <span className="font-semibold text-sm text-white">
                Connect Phantom Wallet
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
              src={cryptoXlogo}
              width={32}
              height={32}
              alt="logo"
              className="rounded-lg"
            />
            <div className="flex flex-col gap-2 items-start">
              <span className="font-semibold text-sm text-white">
                Connect Crypto X
              </span>
              <span
                className="font-normal text-xs"
                style={{ color: "#AFAFAF" }}
              >
                Mobile wallet provider for Solana
              </span>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
