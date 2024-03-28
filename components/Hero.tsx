import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import star from "../public/images/gradient-star.png";

const electronica = localFont({ src: "../fonts/Electronica.otf" });

const imageStyle = {
  width: "60%",
};

const Hero = (
  props: React.PropsWithChildren<{
    heading: any;
    desription: string;
    buttonText: string;
    image: string;
  }>
) => {
  return (
    <div
      className="flex flex-col md:flex-row relative md:justify-between"
      id="hero"
    >
      <div className="flex p-5 md:p-0 items-center flex-row">
        <div className="flex flex-col md:pt-20 md:pl-28">
          <div className={`text-2xl md:text-5xl ${electronica.className}`}>
            {props.heading}
          </div>
          <div className="text-sm md:text-base md:w-80 text-neutral-500 mt-4">
            {props.desription}
          </div>
          <button
            className="flex justify-center my-4 text-black items-center font-bold text-base md:mb-12 md:mt-8"
            style={{
              background:
                "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
              borderRadius: "22px",
              width: "172px",
              height: "43px",
            }}
          >
            {props.buttonText}
          </button>
        </div>
        <div className="flex md:hidden w-20 h-fit">
          <Image src={star} objectFit="contain" alt="star" />
        </div>
      </div>
      <div
        className="relative flex items-center justify-end md:w-2/3"
        style={{ height: "100%" }}
      >
        <Image src={props.image} width={1000} height={1000} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
