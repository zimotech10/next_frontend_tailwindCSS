import React from "react";
import Image from "next/image";
import solanaLogo from "@/public/images/solana-logo.png";

interface DisplayCard {
  image: string;
  name: string;
  description: string;
  items: number;
  owners: number;
  floor: string;
}

const DisplayCard: React.FC<DisplayCard> = ({
  image,
  name,
  description,
  items,
  owners,
  floor,
}) => {
  return (
    <div
      className="flex py-4 px-2 flex-col md:flex-row bg-[#00000076] rounded-xl w-[356px] md:w-[1150px] items-center z-20 gap-1 md:gap-6 md:py-8 justify-center"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="w-[109px] md:w-[189px]">
        <Image src={image} width={189} height={189} alt="pfp" />
      </div>
      <div className="flex flex-col items-center md:items-start gap-8">
        <div className="font-bold text-lg md:text-2xl">{name}</div>
        <div className="flex flex-col gap-1 items-center text-center md:items-start md:text-start">
          <div className="font-semibold text-base">Description</div>
          <div className="font-normal text-sm">{description}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-3 gap-4 bg-black text-white p-4 rounded-lg w-full">
            <div className="flex flex-col items-center">
              <div className="text-lg md:text-3xl font-bold">{items}</div>
              <div className="text-lg">Items</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg md:text-3xl font-bold">{owners}</div>
              <div className="text-lg">Owners</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Image src={solanaLogo} width={20} height={20} alt="sol" />
                <div className="text-lg md:text-3xl font-bold">{floor}</div>
              </div>
              <div className="text-lg">Floor Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
