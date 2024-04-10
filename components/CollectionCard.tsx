"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import verifyIcon from "@/public/images/gold-verified.png";
import useScreen from "@/hooks/useScreen";

const ipmSans = IBM_Plex_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const CollectionCard = (
  props: React.PropsWithChildren<{
    name: string;
    image: string;
    coverImage: string;
    description: string;
    floor: string;
    average: string;
    isVerified: boolean;
  }>
) => {
  const isMobile = useScreen();
  return (
    <div
      className="flex flex-col items-center justify-center relative"
      style={{
        width: isMobile ? "166px" : "396px",
        background:
          "linear-gradient(99deg, rgba(84, 50, 0, 0.09) 4.83%, rgba(80, 48, 0, 0.21) 100%)",
        border: "0.5px solid rgba(212, 134, 48, 0.20)",
      }}
    >
      <Image
        src={props.coverImage}
        width={isMobile ? 163 : 396}
        height={isMobile ? 70 : 167}
        alt="cover"
      />
      <Image
        src={props.image}
        width={isMobile ? 34 : 81}
        height={isMobile ? 34 : 81}
        alt="profile"
        className="absolute top-12 md:top-32"
      />
      <div className="flex flex-col justify-center items-center p-2 pt-4 md:pt-10 md:p-4">
        <div
          className={`text-sm flex flex-row gap-1 items-center font-semibold md:text-2xl ${ipmSans.className}`}
        >
          <span>{props.name}</span>
          {props.isVerified && (
            <Image
              src={verifyIcon}
              width={isMobile ? 6 : 15}
              height={isMobile ? 6 : 15}
              alt="verify"
            />
          )}
        </div>
        <div className={`text-xs md:text-sm text-gray-400 text-center`}>
          {props.description}
        </div>
        <div
          className="flex w-full flex-row justify-between text-gray-400 pt-3 md:pt-6"
          style={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          <span>Floor:</span>
          <span>30d Avg Price:</span>
        </div>
        <div
          className="flex w-full flex-row justify-between text-xs md:text-sm font-semibold"
          style={{ color: "#D48630" }}
        >
          <span>{props.floor}</span>
          <span>{props.average}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
