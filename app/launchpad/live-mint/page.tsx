"use client";

import React from "react";
import { liveMints } from "@/stores/mockData";
import Image from "next/image";
import useScreen from "@/hooks/useScreen";
import { ProgressBar } from "@/components/ProgressBar";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import solanaLogo from "@/public/images/solana-logo.png";
import { IBM_Plex_Sans } from "next/font/google";
import { useState, useEffect } from "react";
import Accordion from "@/components/Accordion";

const ibmSans = IBM_Plex_Sans({
  weight: ["600", "400", "500"],
  subsets: ["latin"],
});

const LiveMint = () => {
  const isMobile = useScreen();
  const liveMint = liveMints[0];
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date(
        liveMint.endsaleDate + "T" + liveMint.endsaletime
      );
      const difference = launchDate.getTime() - new Date().getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  });

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

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
      <div className="relative flex-col">
        <img src={liveMint.coverImage.src} alt="bg" className="w-full" />
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
            src={liveMint.image}
            width={isMobile ? 328 : 386}
            height={isMobile ? 354 : 444}
            alt="main"
          />
          <div className="flex flex-col font-black text-white text-base md:text-2xl">
            <div className="flex flex-row">
              <div style={{ color: "#FFB803" }}>{liveMint.items}</div>/
              {liveMint.totalItems}
            </div>
            <ProgressBar current={liveMint.items} total={liveMint.totalItems} />
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
                  <Image src={solanaLogo} width={24} height={24} alt="sol" />
                  <div className="font-normal text-lg">
                    {liveMint.floor} SOL
                  </div>
                </div>
                <div
                  className="font-normal text-sm"
                  style={{ color: "#AFAFAF" }}
                >
                  Floor Price
                </div>
              </div>
              <div className="px-4 py-2 border rounded-lg flex flex-row gap-6 items-center">
                <button onClick={handleDecrement}>
                  <Icon icon="ant-design:minus-outlined" />
                </button>
                <div>{count}</div>
                <button onClick={handleIncrement}>
                  <Icon icon="ant-design:plus-outlined" />
                </button>
              </div>
            </div>
            <div
              className={`flex flex-row justify-between ${ibmSans.className}`}
            >
              <button
                className="py-3 md:py-4 flex justify-center font-medium text-base md:text-xl text-black"
                style={{
                  width: isMobile ? "129px" : "164px",
                  borderRadius: "40px",
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                }}
              >
                Mint Now
              </button>
              <button
                className="py-3 md:py-4 flex justify-center font-medium text-white text-base md:text-xl"
                style={{
                  border: "2px solid #5E5E5E",
                  borderRadius: "40px",
                  width: isMobile ? "147px" : "164px",
                }}
              >
                View Collection
              </button>
            </div>
            <button
              className="py-3 md:py-4 flex flex-row gap-1 justify-center font-medium text-white text-base md:text-xl"
              style={{ border: "2px solid #ffff", borderRadius: "40px" }}
            >
              <Icon icon="solar:card-linear" width="24" height="24" />{" "}
              <span>Buy with credit card</span>
            </button>
          </div>
        </div>
        <div
          className="flex flex-col gap-8"
          style={{ width: isMobile ? "100%" : "528px" }}
        >
          <div
            className="flex-col md:flex-row gap-8 items-center"
            style={{ display: isMobile ? "none" : "flex" }}
          >
            <div className="flex flex-row md:flex-col-reverse items-center gap-4 md:gap-3 w-fit rounded-2xl bg-black p-3  md:h-fit">
              <div className="flex flex-col p-2 items-center">
                <span className="text-xs font-medium">
                  {formatDate(liveMint.endsaleDate).dayName}
                </span>
                <span className="text-base font-semibold">
                  {formatDate(liveMint.endsaleDate).dayOfMonth}
                </span>
                <span className="text-xs font-medium text-neutral-500">
                  {formatDate(liveMint.endsaleDate).monthName}
                </span>
              </div>
              <Image
                src={liveMint.creatorImage}
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
                  Upcoming
                </span>
              </div>
              <h2 className="text-xl font-medium text-white">
                {liveMint.name}
              </h2>
              <h2
                className="texxt-base font-medium "
                style={{ color: "#798694" }}
              >
                Tomorrow at {liveMint.endsaletime}
              </h2>
              <div className="flex flex-row gap-4">
                <Image
                  src={liveMint.creatorImage}
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
                    {liveMint.creator}
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
                <Icon icon="ic:baseline-facebook" width="18px" height="18px" />
              </div>
            </div>
          </div>
          <Accordion
            title="Whitelist Sale"
            content={
              <>
                <div className="flex justify-center">
                  <div className="flex flex-row items-center gap-4 md:gap-3 w-fit rounded-2xl bg-black p-3  md:h-fit">
                    <div className="flex flex-col p-2 items-center">
                      <span className="text-xs font-medium">
                        {formatDate(liveMint.whitelistSale).dayName}
                      </span>
                      <span className="text-base font-semibold">
                        {formatDate(liveMint.whitelistSale).dayOfMonth}
                      </span>
                      <span className="text-xs font-medium text-neutral-500">
                        {formatDate(liveMint.whitelistSale).monthName}
                      </span>
                    </div>
                    <Image
                      src={liveMint.creatorImage}
                      alt="creator"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </>
            }
          />
          <Accordion
            title="Public Sale"
            content={
              <>
                <div className="flex justify-center">
                  <div className="flex flex-row items-center gap-4 md:gap-3 w-fit rounded-2xl bg-black p-3  md:h-fit">
                    <div className="flex flex-col p-2 items-center">
                      <span className="text-xs font-medium">
                        {formatDate(liveMint.publicSale).dayName}
                      </span>
                      <span className="text-base font-semibold">
                        {formatDate(liveMint.publicSale).dayOfMonth}
                      </span>
                      <span className="text-xs font-medium text-neutral-500">
                        {formatDate(liveMint.publicSale).monthName}
                      </span>
                    </div>
                    <Image
                      src={liveMint.creatorImage}
                      alt="creator"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </>
            }
          />
          <Accordion
            title="Private Sale"
            content={
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between w-full items-center">
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#FFB703" }}
                  >
                    Unlimited
                  </div>
                  <div className="flex font-normal text-base flex-row gap-1">
                    <span>Price:</span>
                    <Image src={solanaLogo} width={24} height={24} alt="sol" />
                    <span>{liveMint.floor} SOL</span>
                  </div>
                </div>
                <div
                  className="flex flex-col py-3 items-center"
                  style={{
                    fill: "linear-gradient(270deg, rgba(0, 0, 0, 0.00) -8.83%, rgba(238, 216, 13, 0.05) 46.3%, rgba(0, 0, 0, 0.00) 106.39%)",
                    strokeWidth: "1px",
                    stroke: "rgba(238, 175, 13, 0.00)",
                  }}
                >
                  <span className="font-semibold text-sm text-white">
                    Ends In
                  </span>
                  <div
                    className="flex flex-col"
                    style={{ width: isMobile ? "218px" : "262px" }}
                  >
                    <div
                      className="flex flex-row items-center justify-between text-2xl"
                      style={{ color: "#EE6B0D" }}
                    >
                      <span>{timeLeft.days}</span>
                      <Icon
                        icon="entypo:dots-two-vertical"
                        height={14}
                        style={{ color: "#EE6B0D", opacity: "0.16" }}
                      />
                      <span>{timeLeft.hours}</span>
                      <Icon
                        icon="entypo:dots-two-vertical"
                        height={14}
                        style={{ color: "#EE6B0D", opacity: "0.16" }}
                      />
                      <span>{timeLeft.minutes}</span>
                      <Icon
                        icon="entypo:dots-two-vertical"
                        height={14}
                        style={{ color: "#EE6B0D", opacity: "0.16" }}
                      />
                      <span>{timeLeft.seconds}</span>
                    </div>
                    <div
                      className="flex flex-row text-xs justify-between font-semibold"
                      style={{ color: "#798694" }}
                    >
                      <h2>Days</h2>
                      <h2>Hrs</h2>
                      <h2>Mins</h2>
                      <h2>secs</h2>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <div
            className="flex-col flex my-5 gap-4 md:mx-8"
            style={{ width: isMobile ? "100%" : "500px" }}
          >
            <h1 className="font-normal text-xs" style={{ color: "#AFAFAF" }}>
              ABOUT
            </h1>
            <p className="font-normal text-base text-white">{liveMint.about}</p>
          </div>
          <Accordion title="More about the project" content={liveMint.about} />
        </div>
      </div>
    </div>
  );
};

export default LiveMint;
