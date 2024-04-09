import React from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

interface Social {
  id: number;
  name: string;
  link: string;
  icon: string;
}

const FeaturedCard = (
  props: React.PropsWithChildren<{
    name: string;
    image: string;
    socials: Social[];
  }>
) => {
  return (
    <div className="flex flex-col w-40 md:w-72 p-2 md:p-4 gap-1 md:gap-3 items-center cursor-pointer relative">
      <Image src={props.image} alt="feature" width={265} height={233} />
      <div
        className="flex justify-center md:top-40 top-24 absolute items-center w-28 h-6 rounded-md md:w-44 md:h-11"
        style={{
          background: "rgba(0, 0, 0, 0.40)",
          backdropFilter: "blur(4.425076961517334px)",
        }}
      >
        TBA
      </div>
      <div className="font-semibold text-xs md:text-lg">{props.name}</div>
      <div className="flex flex-row gap-1 md:gap-3 justify-center">
        {props.socials.map((social) => (
          <a key={social.id} href={social.link}>
            <Icon icon={social.icon} width={18} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCard;
