"use client";

import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import UpcomingCard from "./UpcomingCard";
import Link from "next/link";
import { upcomingMints } from "@/stores/mockData";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const UpcomingSection = () => {
  return (
    <div className="flex flex-col pt-10 md:pt-20 gap-5 md:gap-14 p-5">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1 md:gap-3">
          <Icon
            icon="uil:calender"
            width="28px"
            height="28px"
            style={{ color: "#FFB803" }}
          />
          <span className={`text-2xl md:text-3xl ${ibmSans.className}`}>
            Upcoming Mint
          </span>
        </div>
        <Link
          href="/launchpad/upcoming-mints"
          className="flex flex-row gap-3 items-center"
        >
          <span className="text-base font-medium text-white">View All</span>
          <Icon
            icon="ic:round-keyboard-arrow-right"
            width="24px"
            height="24px"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 md:gap-8">
        {upcomingMints.slice(0, 2).map((upcomingMint) => (
          <Link
            href={{
              pathname: `/launchpad/upcoming-mint/${encodeURIComponent(
                upcomingMint.name
              )}`,
              query: {
                id: upcomingMint.id,
              },
            }}
            key={upcomingMint.id}
          >
            <UpcomingCard
              time={upcomingMint.time}
              name={upcomingMint.name}
              date={upcomingMint.date}
              mainImage={upcomingMint.mainImage.src}
              coverImage={upcomingMint.coverImage.src}
              creator={upcomingMint.creator}
              creatorImage={upcomingMint.creatorImage.src}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSection;
