"use client";

import React from "react";
import { pastMints } from "@/stores/mockData";
import Image from "next/image";
import useScreen from "@/hooks/useScreen";
import { ProgressBar } from "@/components/ProgressBar";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import solanaLogo from "@/public/images/solana-logo.png";
import { IBM_Plex_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import Accordion from "@/components/Accordion";
import { useSearchParams } from "next/navigation";

const ibmSans = IBM_Plex_Sans({
  weight: ["600", "400", "500"],
  subsets: ["latin"],
});

const getPastMintById = (id: any) => {
  const mintId = parseInt(id);

  return pastMints.find((mint) => mint.id === mintId);
};

const PastMint = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const pastMint = getPastMintById(id);
  const isMobile = useScreen();

  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options);
    const options2: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName = date.toLocaleDateString("en-US", options2);
    const dayOfMonth = date.getDate();

    return { dayName, monthName, dayOfMonth };
  };

  return (
    <div className="flex flex-col">
      {pastMint && (
        <div className="flex flex-col mb-5">
          <div className="relative flex-col">
            <img src={pastMint.coverImage.src} alt="bg" className="w-full" />
            <div
              className="absolute top-0 w-full h-full"
              style={{
                background:
                  "linear-gradient(0deg, #000 2.71%, rgba(0, 0, 0, 0.64) 26.76%, rgba(0, 0, 0, 0.00) 53.59%)",
              }}
            ></div>
          </div>
          <div className="flex flex-col w-full items-center md:justify-center md:items-start md:flex-row-reverse md:gap-14 md:-mt-28 z-20">
            <div className="flex flex-col gap-10 md:gap-6">
              <Image
                src={pastMint.image}
                width={isMobile ? 328 : 386}
                height={isMobile ? 354 : 444}
                alt="main"
              />
              <div className="flex flex-col font-black text-white text-base md:text-2xl">
                <div className="flex flex-row">
                  <div style={{ color: "#FFB803" }}>{pastMint.items}</div>/
                  {pastMint.totalItems}
                </div>
                <ProgressBar
                  current={pastMint.items}
                  total={pastMint.totalItems}
                />
              </div>
              <div
                className="flex flex-col px-3 py-4 md:py-3 gap-6"
                style={{
                  border: "1px solid #141414",
                  borderRadius: "12px",
                  background: "rgba(21, 21, 21, 0.50)",
                }}
              >
                <div className="flex flex-row justify-between items-center">
                  <div className={`flex flex-col gap-1 ${ibmSans.className}`}>
                    <div className="flex flex-row items-center gap-1">
                      <Image
                        src={solanaLogo}
                        width={24}
                        height={24}
                        alt="sol"
                      />
                      <div className="font-normal text-lg">
                        {pastMint.floor} SOL
                      </div>
                    </div>
                    <div
                      className="font-normal text-sm"
                      style={{ color: "#AFAFAF" }}
                    >
                      Floor Price
                    </div>
                  </div>
                  <button
                    className="py-3 md:py-4 flex justify-center font-semibold text-base md:text-xl text-black"
                    style={{
                      width: isMobile ? "129px" : "214px",
                      borderRadius: "40px",
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                  >
                    Secondary Market
                  </button>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-8 p-4"
              style={{ width: isMobile ? "100%" : "528px" }}
            >
              <div
                className="flex-col md:flex-row gap-8 items-center"
                style={{ display: isMobile ? "none" : "flex" }}
              >
                <div className="flex flex-row md:flex-col-reverse items-center gap-4 md:gap-3 w-fit rounded-2xl bg-black p-3  md:h-fit">
                  <div className="flex flex-col p-2 items-center">
                    <span className="text-xs font-medium">
                      {formatDate(pastMint.endsaleDate).dayName}
                    </span>
                    <span className="text-base font-semibold">
                      {formatDate(pastMint.endsaleDate).dayOfMonth}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      {formatDate(pastMint.endsaleDate).monthName}
                    </span>
                  </div>
                  <Image
                    src={pastMint.creatorImage}
                    alt="creator"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="px-2 py-1 rounded-md w-fit"
                    style={{
                      background: "rgba(0, 0, 0, 0.16)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span
                      className="text-xs font-medium"
                      style={{
                        background:
                          "-webkit-linear-gradient(280deg, #F88430 25.68%, #FFCA43 76.3%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Past Mint
                    </span>
                  </div>
                  <h2 className="text-xl font-medium text-white">
                    {pastMint.name}
                  </h2>
                  <h2
                    className="texxt-base font-medium "
                    style={{ color: "#798694" }}
                  >
                    Tomorrow at {pastMint.endsaletime}
                  </h2>
                  <div className="flex flex-row gap-4">
                    <Image
                      src={pastMint.creatorImage}
                      width={35}
                      height={35}
                      alt="creator"
                      style={{ borderRadius: "35px" }}
                    />
                    <div className="flex flex-col">
                      <span
                        className="font-normal text-xs"
                        style={{ color: "#E8E8E8" }}
                      >
                        Creator:
                      </span>
                      <span className="font-normal text-white text-sm">
                        {pastMint.creator}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <Icon
                      icon="fa6-brands:square-x-twitter"
                      width="18px"
                      height="18px"
                    />
                    <Icon icon="mdi:instagram" width="18px" height="18px" />
                    <Icon
                      icon="ic:baseline-facebook"
                      width="18px"
                      height="18px"
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex-col flex my-5 gap-4 md:mx-8"
                style={{ width: isMobile ? "100%" : "500px" }}
              >
                <h1
                  className="font-normal text-xs"
                  style={{ color: "#AFAFAF" }}
                >
                  ABOUT
                </h1>
                <p className="font-normal text-base text-white">
                  {pastMint.about}
                </p>
              </div>
              <Accordion
                title="More about the project"
                content={pastMint.about}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastMint;
