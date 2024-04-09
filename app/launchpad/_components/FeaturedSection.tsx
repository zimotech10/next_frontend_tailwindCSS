import React from "react";
import { IBM_Plex_Sans } from "next/font/google";
import FeaturedCard from "./FeaturedCard";
import { featuredMints } from "@/stores/mockData";
import featuredIcon from "@/public/vectors/featuredhead.svg";
import Image from "next/image";

const ibmSans = IBM_Plex_Sans({ weight: ["600"], subsets: ["latin"] });

const FeaturedSection = () => {
  return (
    <div className="flex flex-col pt-10 md:pt-20 gap-5 md:gap-14 p-5">
      <div className="flex flex-row items-center md:gap-3">
        <Image src={featuredIcon} height={32} width={32} alt="featured" />
        <span className={`text-2xl md:text-3xl ${ibmSans.className}`}>
          Featured in LampapuyNFT
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {featuredMints.map((featured) => (
          <FeaturedCard
            key={featured.id}
            name={featured.name}
            image={featured.image.src}
            socials={featured.social}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
