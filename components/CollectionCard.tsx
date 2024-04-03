import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";

const ipmSans = IBM_Plex_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const CollectionCard = (
  props: React.PropsWithChildren<{
    name: string;
    image: string;
    coverImage: string;
    description: string;
    floor: string;
    average: string;
    isVerified: boolean;
  }>
) => {
  const [isMobile, setIsMobile] = useState(false);
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
      className="flex flex-col items-center justify-center relative"
      style={{
        width: isMobile ? "166px" : "396px",
        background:
          "linear-gradient(99deg, rgba(84, 50, 0, 0.09) 4.83%, rgba(80, 48, 0, 0.21) 100%)",
        border: "0.5px solid rgba(212, 134, 48, 0.20)",
      }}
    >
      <Image
        src={props.coverImage}
        width={isMobile ? 163 : 396}
        height={isMobile ? 70 : 167}
        alt="cover"
      />
      <Image
        src={props.image}
        width={isMobile ? 34 : 81}
        height={isMobile ? 34 : 81}
        alt="profile"
        className="absolute top-5"
      />
      <div className="flex flex-col justify-center items-center p-2 md:p-4">
        <div
          className={`text-sm font-semibold md:text-2xl ${ipmSans.className}`}
        >
          {props.name}
        </div>
        <div className={`text-xs md:text-sm text-gray-600 text-center`}>
          {props.description}
        </div>
        <div
          className="flex flex-row justify-between text-gray-600"
          style={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          <span>Floor:</span>
          <span>30d Avg Price:</span>
        </div>
        <div
          className="flex flex-row justify-between text-xs md:text-sm font-semibold"
          style={{ color: "#D48630" }}
        >
          <span>{props.floor}</span>
          <span>{props.average}</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
