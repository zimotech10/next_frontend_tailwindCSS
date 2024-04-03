import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Image from "next/image";
import solanaIcon from "../public/images/solana-logo.png";

const ItemCard = (
  props: React.PropsWithChildren<{
    name: string;
    image: string;
    collection: string;
    price: string;
  }>
) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 300); // Adjust the delay for the button to appear
      return () => clearTimeout(timeout);
    } else {
      setShowButton(false);
    }
  }, [isHovered]);

  const imageStyle = {
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  return (
    <div
      className="w-40 md:w-72 flex flex-col p-2 gap-1 md:gap-3 md:p-4 relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="font-medium text-xs md:text-sm text-neutral-500">
            {props.collection}
          </div>
          <div className="font-medium text-xs md:text-base">{props.name}</div>
        </div>
        <div>
          <Icon icon="mingcute:more-2-line" />
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{ maxWidth: isMobile ? "139px" : "259px" }}
      >
        <Image
          src={props.image}
          width={isMobile ? 139 : 259}
          height={isMobile ? 160 : 299}
          alt="image"
          style={imageStyle}
        />
      </div>
      {showButton && (
        <button
          className="absolute bottom-14 items-center left-1/2 flex flex-row gap-1 transform -translate-x-1/2 -translate-y-1/2 py-1 px-4 font-semibold rounded-2xl text-black shadow-md"
          style={{
            transition: "opacity 0.3s ease-in",
            opacity: isHovered ? 1 : 0,
            background:
              "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
          }}
          onClick={() => {
            // Handle button click
          }}
        >
          <Icon icon="ph:lightning" style={{ color: "black" }} />
          Buy Now
        </button>
      )}
      {showButton && (
        <div className="flex flex-row items-center gap-1 absolute top-20 right-6">
          <Icon
            icon="iconamoon:heart-bold"
            style={{
              color: "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
            }}
          />
          <span style={{ fontSize: "10px", color: "#AFAFAF" }}>1.2k</span>
        </div>
      )}
      <div className="flex flex-col">
        <div className="text-xs text-neutral-400">Price</div>
        <div className="text-xs flex flex-row gap-1 md:text-sm">
          <Image src={solanaIcon} width={17} height={17} alt="solana" />
          <span>{props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
