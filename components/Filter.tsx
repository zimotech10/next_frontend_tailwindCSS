"use client";

import { useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import Checkbox from "./Checkbox";
import collectionImg from "@/public/images/collection.png";
import verifiedImg from "@/public/images/gold-verified.png";
import Image from "next/image";

const ipmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface AccordionState {
  statusOpen: boolean;
  blockchainOpen: boolean;
  priceOpen: boolean;
  backgroundOpen: boolean;
  collectionOpen: boolean;
}

const Filter = () => {
  const [accordionState, setAccordionState] = useState<AccordionState>({
    statusOpen: false,
    blockchainOpen: false,
    priceOpen: false,
    backgroundOpen: false,
    collectionOpen: false,
  });

  const toggleAccordion = (accordion: keyof AccordionState) => {
    setAccordionState({
      ...accordionState,
      [accordion]: !accordionState[accordion],
    });
  };

  const collection = [
    {
      id: 1,
      name: "Jues Fles",
      img: collectionImg,
      isVerified: true,
    },
    {
      id: 2,
      name: "Jues Fles",
      img: collectionImg,
      isVerified: true,
    },
    {
      id: 3,
      name: "Jues Fles",
      img: collectionImg,
      isVerified: false,
    },
    {
      id: 4,
      name: "Jues Fles",
      img: collectionImg,
      isVerified: true,
    },
  ];

  return (
    <div
      className={`flex flex-col gap-6 rounded-md border-neutral-800 md:border-none md:rounded-none bg-black ${ipmSans.className}`}
      style={{ width: "250px", padding: "14px" }}
    >
      <div className="font-normal text-sm">Filter/Type</div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion("statusOpen")}
        >
          <span className="font-bold text-sm">Status</span>
          <Icon
            icon={
              accordionState.statusOpen
                ? "majesticons:minus"
                : "majesticons:plus"
            }
            width={20}
            style={{ color: "#4b4b4b" }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.statusOpen ? "h-auto" : "h-0"
          }`}
        >
          <Checkbox label="Buy Now" />
          <Checkbox label="Fixed Price" />
          <Checkbox label="Auction" />
          <Checkbox label="Has Offer" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion("blockchainOpen")}
        >
          <span className="font-bold text-sm">Blockchain</span>
          <Icon
            icon={
              accordionState.blockchainOpen
                ? "majesticons:minus"
                : "majesticons:plus"
            }
            width={20}
            style={{ color: "#4b4b4b" }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.blockchainOpen ? "h-auto" : "h-0"
          }`}
        >
          <Checkbox label="All Network" />
          <Checkbox label="Solana" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion("priceOpen")}
        >
          <span className="font-bold text-sm">Price</span>
          <Icon
            icon={
              accordionState.priceOpen
                ? "majesticons:minus"
                : "majesticons:plus"
            }
            width={20}
            style={{ color: "#4b4b4b" }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.priceOpen ? "h-auto" : "h-0"
          }`}
        >
          <div
            className="px-4 py-2 rounded-md w-full"
            style={{ backgroundColor: "#0B0A0A" }}
          >
            Solana(SOL)
          </div>
          <div className="flex flex-row justify-center gap-3 items-center">
            <input
              type="number"
              name=""
              id=""
              placeholder="min"
              className="px-4 py-2 rounded-md w-fit"
              style={{ backgroundColor: "#0B0A0A", width: "88px" }}
            />
            <span>to</span>
            <input
              type="number"
              name=""
              id=""
              placeholder="max"
              className="px-4 py-2 rounded-md w-fit"
              style={{ backgroundColor: "#0B0A0A", width: "88px" }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion("backgroundOpen")}
        >
          <span className="font-bold text-sm">Background</span>
          <Icon
            icon={
              accordionState.backgroundOpen
                ? "majesticons:minus"
                : "majesticons:plus"
            }
            width={20}
            style={{ color: "#4b4b4b" }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.backgroundOpen ? "h-auto" : "h-0"
          }`}
        >
          <Checkbox label="Blue" />
          <Checkbox label="Grayance" />
          <Checkbox label="Green" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => toggleAccordion("collectionOpen")}
        >
          <span className="font-bold text-sm">Collection</span>
          <Icon
            icon={
              accordionState.collectionOpen
                ? "majesticons:minus"
                : "majesticons:plus"
            }
            width={20}
            style={{ color: "#4b4b4b" }}
          />
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            accordionState.collectionOpen ? "h-auto" : "h-0"
          }`}
        >
          {collection.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-row gap-1 items-center"
            >
              <Image
                src={collection.img}
                width={30}
                height={30}
                alt="collection"
                className="rounded-md"
              />
              <span className="font-semibold text-base">{collection.name}</span>
              {collection.isVerified && (
                <Image
                  src={verifiedImg}
                  width={18}
                  height={18}
                  alt="verified"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
