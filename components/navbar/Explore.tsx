import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ipmSans = IBM_Plex_Sans({
  weight: ["500"],
  subsets: ["latin"],
});

const Explore = () => {
  return (
    <div
      className={`w-72 flex flex-col gap-6 px-5 py-9 text-base text-neutral-400 rounded-md ${ipmSans.className}`}
      style={{
        backgroundColor: "#0B0A0A",
        boxShadow: "0px 5px 77px 0px rgba(7, 6, 24, 0.86)",
      }}
    >
      <div>NFT</div>
      <div>Collections</div>
      <div>Launchpad</div>
      <div>Auction</div>
    </div>
  );
};

export default Explore;
