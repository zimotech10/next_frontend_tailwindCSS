import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import { pastMints } from "@/stores/mockData";
import MintCard from "./MintCard";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const PastSection = () => {
  return (
    <div className="flex flex-col pt-10 md:pt-20 gap-5 md:gap-14 p-5">
      <div className="flex flex-row items-center gap-1 md:gap-3">
        <Icon icon="fa:circle-o" width={24} style={{ color: "#FF856A" }} />
        <span className={`text-2xl md:text-3xl ${ibmSans.className}`}>
          Past Mint
        </span>
      </div>
      <div className="flex flex-row overflow-x-scroll overflow-y-hidden md:flex-wrap md:overflow-hidden md:gap-8 md:justify-center gap-3">
        {pastMints.map((pastMint) => (
          <MintCard
            key={pastMint.id}
            name={pastMint.name}
            image={pastMint.image.src}
            floor={pastMint.floor}
            items={pastMint.items}
            live={pastMint.live}
          />
        ))}
      </div>
    </div>
  );
};

export default PastSection;
