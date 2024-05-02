import { Collection } from "@/models/Collection";
import { NFT } from "@/models/NFT";
import React from "react";

interface Profile {
  name: string;
  username: string;
  image: string;
  address: string;
  about: string;
  socials: {
    x: string;
    facebook: string;
    instagram: string;
  };
  nfts: NFT[];
  collections: Collection[];
}

const ProfileCard = () => {
  return (
    <div
      className="flex flex-col md:flex-row rounded-xl p-4 md:p-0 md:px-20 md:py-12 gap-6 items-center"
      style={{
        background: "rgba(0, 0, 0, 0.70)",
        backdropFilter: "blur(12px)",
      }}
    ></div>
  );
};

export default ProfileCard;
