"use client";

import { useSearchParams } from "next/navigation";
import useScreen from "@/hooks/useScreen";
import { useState, useEffect } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { upcomingMints } from "@/stores/mockData";
import Image from "next/image";
import Accordion from "@/components/Accordion";

const getUpcomingMintById = (id: any) => {
  // Parse the ID as a number
  const mintId = parseInt(id);

  // Find the mint in the upcomingMints array by ID
  return upcomingMints.find((mint) => mint.id === mintId);
};

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const UpcomingMint = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const mint = getUpcomingMintById(id);
  const isMobile = useScreen();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (mint) {
      const calculateTimeLeft = () => {
        const launchDate = new Date(mint.date + "T" + mint.time);
        const difference = launchDate.getTime() - new Date().getTime();

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      };

      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
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
    <div className="flex flex-col items-center">
      {mint && (
        <div
          className="flex flex-col md:py-28"
          style={{ width: isMobile ? "360px" : "1005px" }}
        >
          <div
            className="flex flex-col md:flex-row items-center md:items-start"
            style={{ width: isMobile ? "360px" : "1005px" }}
          >
            <div
              className="flex flex-col gap-8 pt-10 pb-7 px-3 md:pt-6 md:px-6 w-full rounded-t-3xl md:rounded-t-none md:rounded-tl-3xl md:rounded-bl-3xl"
              style={{
                backgroundImage: `linear-gradient(0deg, #030404 9%, rgba(3, 4, 4, 0.64) 65.62%, rgba(3, 4, 4, 0.00) 100%), url(${mint.coverImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className={`flex flex-col md:flex-row md:justify-between md:items-center gap-8 ${ibmSans.className}`}
              >
                <h1 className="font-semibold text-xl text-white">Up Next</h1>
                <div className="flex flex-col" style={{ width: "227px" }}>
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
                      {formatDate(mint.date).dayName}
                    </span>
                    <span className="text-base font-semibold">
                      {formatDate(mint.date).dayOfMonth}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      {formatDate(mint.date).monthName}
                    </span>
                  </div>
                  <Image
                    src={mint.creatorImage}
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
                    {mint.name}
                  </h2>
                  <h2
                    className="texxt-base font-medium "
                    style={{ color: "#798694" }}
                  >
                    Tomorrow at {mint.time}
                  </h2>
                  <div className="flex flex-row gap-4">
                    <Image
                      src={mint.creatorImage}
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
                        {mint.creator}
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
            </div>
            <Image
              src={mint.mainImage}
              width={isMobile ? 335 : 280}
              height={isMobile ? 354 : 296}
              alt="nft"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col-reverse items-center md:justify-between md:items-start md:flex-row">
            <div
              className="flex-col flex my-5 gap-4 md:mx-8"
              style={{ width: isMobile ? "100%" : "500px" }}
            >
              <h1 className="font-normal text-xs" style={{ color: "#AFAFAF" }}>
                ABOUT
              </h1>
              <p className="font-normal text-base text-white">{mint.about}</p>
            </div>
            <button
              className="py-4 h-fit my-4 md:mr-2 text-black font-medium text-xl flex justify-center"
              style={{
                width: isMobile ? "294px" : "255px",
                background:
                  "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                borderRadius: "40px",
              }}
            >
              Visit Project Link
            </button>
          </div>
          <div style={{ width: isMobile ? "100%" : "529px" }}>
            <Accordion title="More about the project" content={mint.about} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMint;
