import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({ weight: ["400"], subsets: ["latin"] });

const DomainCard = (
  props: React.PropsWithChildren<{
    name: string;
    isAvailable: boolean;
  }>
) => {
  return (
    <div
      className="flex flex-col p-3 md:p-5 gap-3 dm:gap-6"
      style={{ border: "1px solid #FFCF25", background: "#1E1E1E" }}
    >
      <div
        className="flex flex-col justify-center items-center w-32 h-32 md:w-60 md:h-60 relative"
        style={{ backgroundImage: "url('/images/domain-bg.png')" }}
      >
        {props.name}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div
            className="text-sm md:text-lg font-medium"
            style={{ color: "#E0E0E0" }}
          >
            {props.name}
          </div>
          <div className="text-xs md:text-sm">
            {props.isAvailable ? (
              <span style={{ color: "#3BF1A5" }}>Available</span>
            ) : (
              <span style={{ color: "red" }}>Not Available</span>
            )}
          </div>
        </div>
        <div>
          <Icon
            icon="material-symbols:bookmark-outline"
            width={24}
            style={{ color: "#667085" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DomainCard;
