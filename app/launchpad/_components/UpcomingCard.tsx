"use client";

import React, { useState, useEffect } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Image from "next/image";
import useScreen from "@/hooks/useScreen";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const UpcomingCard = (
  props: React.PropsWithChildren<{
    date: string;
    time: string;
    name: string;
    creator: string;
    creatorImage: string;
    mainImage: string;
    coverImage: string;
  }>
) => {
  const isMobile = useScreen();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date(props.date + "T" + props.time);
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
    <div
      className="flex flex-col md:flex-row items-center md:items-start"
      style={{ width: isMobile ? "360px" : "1005px" }}
    >
      <div
        className="flex flex-col gap-8 pt-10 pb-8 px-3 md:pt-6 md:px-6 w-full rounded-t-3xl md:rounded-t-none md:rounded-tl-3xl md:rounded-bl-3xl"
        style={{
          backgroundImage: `url(${props.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "#181A1E",
        }}
      >
        <div
          className={`flex flex-col md:flex-row md:justify-between md:items-center gap-8 ${ibmSans.className}`}
        >
          <h1 className="font-semibold text-xl text-white">Up Next</h1>
          <div className="flex flex-col">
            <div
              className="flex flex-row items-center gap-3 text-2xl"
              style={{ color: "#17CA69" }}
            >
              <span>{timeLeft.days}</span>
              <Icon
                icon="entypo:dots-two-vertical"
                height={14}
                style={{ color: "#17CA69", opacity: "0.16" }}
              />
              <span>{timeLeft.hours}</span>
              <Icon
                icon="entypo:dots-two-vertical"
                height={14}
                style={{ color: "#17CA69", opacity: "0.16" }}
              />
              <span>{timeLeft.minutes}</span>
              <Icon
                icon="entypo:dots-two-vertical"
                height={14}
                style={{ color: "#17CA69", opacity: "0.16" }}
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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-row md:flex-col-reverse items-center gap-4 md:gap-3 w-fit rounded-2xl bg-black p-3  md:h-fit">
            <div className="flex flex-col p-2 items-center">
              <span className="text-xs font-medium">
                {formatDate(props.date).dayName}
              </span>
              <span className="text-base font-semibold">
                {formatDate(props.date).dayOfMonth}
              </span>
              <span className="text-xs font-medium text-neutral-500">
                {formatDate(props.date).monthName}
              </span>
            </div>
            <Image
              src={props.creatorImage}
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
            <h2 className="text-xl font-medium text-white">{props.name}</h2>
            <h2
              className="texxt-base font-medium "
              style={{ color: "#798694" }}
            >
              Tomorrow at {props.time}
            </h2>
            <div className="flex flex-row gap-4">
              <Image
                src={props.creatorImage}
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
                  {props.creator}
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
      </div>
      <Image
        src={props.mainImage}
        width={isMobile ? 335 : 280}
        height={isMobile ? 354 : 296}
        alt="nft"
        className="rounded-md"
      />
    </div>
  );
};

export default UpcomingCard;
