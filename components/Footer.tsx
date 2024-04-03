"use client";

import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import logo from "@/public/big-logo.png";
import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import subscribeImage from "@/public/images/subscribe.png";
import { socials } from "@/stores/constants";

const electronicaStencil = localFont({
  src: "../fonts/ElectronicaStencil.otf",
});

const ipmSans = IBM_Plex_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Footer = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

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

  const apiKey =
    "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";

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": apiKey,
        },
        body: JSON.stringify({
          email: email,
          listIds: [2],
          attributes: {
            action: "subscribe",
          },
        }),
      });

      if (response.ok) {
        setShowModal(true); // Show the modal when subscription is successful
        console.log("contact added!", email);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="flex flex-col p-4 md:p-16"
      style={{ background: "#121212" }}
    >
      {showModal && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center font-inter z-40 modal">
          <div className="w-9/12 md:w-4/12 p-7 justify-center gap-2 md:gap-4 items-center flex flex-col modal-card">
            <p className="text-xl">Thanks for subscribing!</p>
            <button
              className="modal-button w-full font-semibold md:w-2/3 text-black py-2 px-3"
              onClick={closeModal}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col">
          <Image
            src={logo}
            width={isMobile ? 200 : 400}
            height={isMobile ? 72 : 144}
            alt="logo"
          />
          <div
            className={`text-lg md:text-2xl ${electronicaStencil.className}`}
          >
            The first Community Coin of the Solana Ecosystem
          </div>
          <div
            className={`text-xs font-normal md:text-base ${ipmSans.className}`}
            style={{ color: "#DACBB6" }}
          >
            We strive to build Community-Oriented Projects around the $LPP Coin.
          </div>
          <div className="flex flex-col md:items-end md:flex-row py-7 md:py-14 md:gap-2">
            <div
              className={`text-base md:text-2xl font-semibold ${ipmSans.className}`}
            >
              Contact Us
            </div>
            <a
              href="mailto:DAO@Lampapuy.com"
              className="flex flex-row gap-1 items-center"
              style={{ color: "#D48630" }}
              target="_blank"
            >
              <Icon icon="tabler:mail" />
              <span className="text-base">DAO@Lampapuy.com</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-end relative md:ml-28">
          <Image
            src={subscribeImage}
            width={isMobile ? 118 : 214}
            height={isMobile ? 118 : 214}
            alt="subscribe"
            className="absolute right-0 bottom-12 md:bottom-24 md:right-24"
          />
          <form
            className="flex border md:mb-10 md:mt-44 p-1 justify-between"
            onSubmit={handleSubscribe}
            style={{
              borderRadius: "40px",
              border: "0.5px solid #FFEA7F",
              width: isMobile ? "356px" : "506px",
            }}
          >
            <input
              type="email"
              name="email"
              value={email}
              className="p-4 md:mr-0 text-white"
              placeholder="your@mail.com"
              onChange={handleInput}
              style={{
                background: "#121212",
                borderRadius: "40px",
                width: isMobile ? "full" : "340px",
              }}
            />
            <button
              type="submit"
              className="md:px-8 md:m-2 text-xs p-2 md:text-base text-gray-800 font-bold rounded-3xl md:p-4 uppercase "
              style={{ background: "#D48630" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-center gap-2 pt-2 items-center md:justify-between">
        <div
          className={`${ipmSans.className} font-normal md:text-sm text-xs`}
          style={{ color: "#BDBDBD" }}
        >
          All Rights Reseved Lampapuy © 2024
        </div>
        <div className="flex flex-row gap-3">
          {socials.map((social) => (
            <a
              href={social.link}
              key={social.id}
              target="_blank"
              className="hover:scale-105"
            >
              <Image
                src={social.icon}
                width={isMobile ? 32 : 36}
                height={isMobile ? 32 : 36}
                alt="social"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
