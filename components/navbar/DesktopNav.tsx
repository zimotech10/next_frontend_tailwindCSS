import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import solanaIcon from "../../public/images/solana-logo.png";
import Dropdown from "./Dropdown";

const ipmSans = IBM_Plex_Sans({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const DesktopNav = (
  props: React.PropsWithChildren<{
    logo: string;
  }>
) => {
  const [hoveredItem, setHoveredItem] = useState("");

  const handleHover = (item: string) => {
    setHoveredItem(item);
  };

  return (
    <div
      className={`w-full sticky py-5 px-12 top-0 z-40 text-base justify-between flex flex-row items-center ${ipmSans.className}`}
    >
      <a href="/">
        <Image src={props.logo} width={150} height={150} alt="logo" />
      </a>
      <div className="relative">
        <Icon
          icon="mingcute:search-line"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          width={20}
          height={20}
        />
        <input
          type="text"
          className="w-56 py-2 h-11 pl-10 pr-3 rounded-md"
          placeholder="Search"
          style={{ backgroundColor: "#262626" }}
        />
      </div>
      <div
        className="px-8 flex flex-row items-center gap-1 font-semibold cursor-pointer "
        onMouseEnter={() => handleHover("explore")}
        onMouseLeave={() => handleHover("")}
      >
        Explore
        <Icon
          icon={
            hoveredItem === "explore"
              ? "mingcute:up-line"
              : "mingcute:down-line"
          }
        />
        {hoveredItem === "explore" && (
          <div
            className={`top-16 absolute ${hoveredItem ? "visible" : "hidden"}`}
          >
            <Dropdown>
              <div>NFT</div>
              <div>Collections</div>
              <div>Launchpad</div>
              <div>Auction</div>
            </Dropdown>
          </div>
        )}
      </div>
      <div
        className="px-8 flex flex-row items-center gap-1 font-semibold cursor-pointer "
        onMouseEnter={() => handleHover("creator")}
        onMouseLeave={() => handleHover("")}
      >
        Creator
        <Icon
          icon={
            hoveredItem === "creator"
              ? "mingcute:up-line"
              : "mingcute:down-line"
          }
        />
        {hoveredItem === "creator" && (
          <div className={`top-16 absolute `}>
            <Dropdown>
              <div>Apply as Launchpad</div>
              <div>Submit a collection</div>
              <div>Get Verified with AssureDefi</div>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="px-8 flex flex-row items-center gap-1 font-bold cursor-pointer ">
        <span className="bg-gradient-to-br from-amber-300 to-orange-400 bg-clip-text text-transparent">
          Reward
        </span>
        <Icon icon="noto:fire" />
      </div>
      <button className="w-32 flex justify-center py-2 rounded-3xl border ">
        Create
      </button>
      <div
        className="px-3 py-2 rounded-2xl flex flex-row items-center gap-1 font-medium cursor-pointer"
        onMouseEnter={() => handleHover("solana")}
        onMouseLeave={() => handleHover("")}
        style={{
          backgroundColor: "#141414",
        }}
      >
        Solana
        <Image src={solanaIcon} width={20} height={20} alt="solana" />
        <Icon
          icon={
            hoveredItem === "solana" ? "mingcute:up-line" : "mingcute:down-line"
          }
        />
      </div>
      <button
        className="flex text-black rounded-3xl py-2 justify-center font-semibold items-center"
        style={{
          width: "156px",
          background: "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default DesktopNav;
