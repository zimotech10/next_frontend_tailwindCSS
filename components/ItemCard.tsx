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
  return (
    <div
      className="w-40 md:w-72 flex flex-col p-2 gap-1 md:gap-3 md:p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div>
        <Image
          src={props.image}
          width={isMobile ? 139 : 259}
          height={isMobile ? 160 : 299}
          alt="image"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-xs text-neutral-400">Price</div>
        <div className="text-xs flex flex-col gap-1 md:text-sm">
          <Image src={solanaIcon} width={17} height={17} alt="solana" />
          <span>{props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
