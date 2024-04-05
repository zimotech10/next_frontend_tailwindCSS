import React from "react";
import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

export const LiveMint = () => {
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
    </div>
  );
};
