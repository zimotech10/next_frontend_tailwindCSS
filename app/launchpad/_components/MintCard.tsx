"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import solanaIcon from "@/public/images/solana-logo.png";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const ethnocentric = localFont({ src: "../../../fonts/ethnocentric.otf" });

const MintCard = (
  props: React.PropsWithChildren<{
    name: string;
    image: string;
    floor: number;
    items: number;
    live: boolean;
  }>
) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col w-56 md:w-72 p-2 md:p-3 gap-2 md:gap-3 items-center cursor-pointer">
      <Image
        src={props.image}
        width={isMobile ? 183 : 254}
        height={isMobile ? 185 : 257}
        alt="image"
        className="rounded-md"
      />
      <div
        className={`text-base md:text-xl text-center ${ethnocentric.className}`}
      >
        {props.name}
      </div>
      {props.live ? (
        <div
          className={`flex justify-center items-center rounded-md h-8 w-28 md:w-40 font-semibold py-1 px-2 text-xs md:text-base ${ibmSans.className}`}
          style={{
            color: "#50C24E",
            background:
              "linear-gradient(180deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.00) 100%)",
          }}
        >
          Live
        </div>
      ) : (
        <div
          className={`flex justify-center items-center rounded-md h-8 w-28 md:w-40 font-semibold py-1 px-2 text-xs md:text-base ${ibmSans.className}`}
          style={{
            color: "#FF856A",
            background:
              "linear-gradient(180deg, rgba(226, 226, 226, 0.06) 0%, rgba(226, 226, 226, 0.00) 100%)",
          }}
        >
          Sold Out
        </div>
      )}
      <div className="flex flex-row justify-center items-center gap-4 md:gap-6">
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-2xl font-bold">{props.items}</span>
          <span className="text-xs md:text-base font-normal text-gray-500">
            Items
          </span>
        </div>
        <div className="h-12 md:h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="67"
            viewBox="0 0 2 67"
            fill="none"
          >
            <path d="M1 0V66.6667" stroke="#353840" />
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center gap-1 text-lg md:text-2xl font-bold">
            <Image
              src={solanaIcon}
              width={isMobile ? 17.3 : 24}
              height={isMobile ? 16.3 : 22.5}
              alt="solana"
            />
            <span>{props.floor}</span>
          </div>
          <span className="text-xs md:text-base font-normal text-gray-500">
            Floor Price
          </span>
        </div>
      </div>
    </div>
  );
};

export default MintCard;
