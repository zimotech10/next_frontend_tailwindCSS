import React from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { liveMints } from "@/stores/mockData";
import MintCard from "./MintCard";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

export const LiveSection = () => {
  return (
    <div className="flex flex-col pt-10 md:pt-20 gap-5 md:gap-14 p-5">
      <div className="flex flex-row items-center md:gap-3">
        <Icon
          icon="material-symbols-light:rocket-launch-outline"
          style={{ color: "#DD407F" }}
          width={32}
        />
        <span className={`text-2xl md:text-3xl ${ibmSans.className}`}>
          Live Mint
        </span>
      </div>
      <div className="flex flex-row overflow-x-scroll overflow-y-hidden md:flex-wrap md:overflow-hidden md:gap-8 md:justify-center gap-3">
        {liveMints.map((liveMint) => (
          <MintCard
            key={liveMint.id}
            name={liveMint.name}
            image={liveMint.image.src}
            floor={liveMint.floor}
            items={liveMint.items}
            live={liveMint.live}
          />
        ))}
      </div>
    </div>
  );
};
