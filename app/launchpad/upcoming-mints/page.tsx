import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import UpcomingCard from "../_components/UpcomingCard";
import { upcomingMints } from "@/stores/mockData";
import Link from "next/link";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const UpcomingMint = () => {
  return (
    <div className="p-2 md:p-20 flex flex-col">
      <div className="flex flex-row items-center gap-1 md:gap-3 pb-8 md:pb-16">
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
      <div className="flex flex-col justify-center items-center gap-8">
        {upcomingMints.map((upcomingMint) => (
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
              key={upcomingMint.id}
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

export default UpcomingMint;
