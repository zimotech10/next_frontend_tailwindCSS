import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import solanaIcon from "@/public/images/solana-logo.png";
import Image from "next/image";
import Accordion from "@/components/Accordion";
import { formatAddress } from "@/hooks/useFormatAddress";

export const DetailsCard = (
  props: React.PropsWithChildren<{
    collection?: string;
    name: string;
    description?: string;
    listingPrice?: string;
    owner?: string;
    creator?: string;
    userType: "owner" | "user";
    attributes?: {
      trait_type: string;
      value: string;
    }[];
    openModal: () => void; // Add openModal prop
  }>
) => {
  return (
    <div className="flex flex-col md:py-10 md:px-8 md:gap-12 gap-4 w-full md:w-1/2">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between w-full">
          {props.collection && (
            <div className="p-[10px] rounded-full bg-[#101010] font-semibold text-base w-fit">
              {props.collection}
            </div>
          )}

          <div className="p-[10px] rounded-full bg-[#101010]">
            <Image src={solanaIcon} width={24} height={24} alt="solana" />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <span className="font-semibold text-2xl md:text-3xl">
            {props.name}
          </span>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row gap-1 items-center">
              <span>3.1k</span>
              <Icon icon="solar:heart-linear" />
            </div>
          </div>
        </div>
      </div>
      {props.listingPrice && (
        <div className="flex flex-col gap-2">
          <div className="font-normal text-sm text-[#AFAFAF]">
            Listing Price
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Image src={solanaIcon} width={24} height={24} alt="solana" />
            <div className="font-semibold text-base">{props.listingPrice}</div>
            <div className="font-normal text-sm text-[#AFAFAF]">($200)</div>
          </div>
        </div>
      )}

      {props.userType === "owner" ? (
        <div className="flex flex-col font-semibold text-base md:flex-row gap-2 w-full">
          <button
            className="py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black"
            style={{
              background:
                "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
            }}
            onClick={props.openModal} // Call openModal when clicked
          >
            List
          </button>
          <button
            className="w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
            style={{ border: "1px solid #F88430", color: "#F88430" }}
          >
            Transfer
          </button>
        </div>
      ) : (
        <div className="flex flex-col font-semibold text-base md:flex-row gap-2 w-full">
          <button
            className="py-3 w-full rounded-3xl flex flex-row items-center gap-1 justify-center text-black"
            style={{
              background:
                "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
            }}
          >
            <Icon icon="ph:lightning" style={{ color: "black" }} />
            Buy now for {props.listingPrice} SOL
          </button>
          <button
            className="w-full px-4 py-3 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
            style={{ border: "1px solid #F88430", color: "#F88430" }}
          >
            Make an Offer
          </button>
        </div>
      )}

      {props.description && (
        <Accordion title="Description">{props.description}</Accordion>
      )}
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-2">
          <div className="font-normal text-sm text-[#AFAFAF]">Creator:</div>
          <div className="font-semibold text-base">
            {formatAddress(props.creator)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-normal text-sm text-[#AFAFAF]">Owned by:</div>
          <div className="font-semibold text-base">
            {formatAddress(props.owner)}
          </div>
        </div>
      </div>
      {props.attributes && (
        <Accordion title="Attributes">
          <div className="flex flex-wrap gap-3 justify-center">
            {props.attributes?.map((attribute, index) => (
              <div
                key={index}
                className="flex flex-col px-3 py-2 border border-[#F88430] rounded-md gap-1 justify-center items-center w-[150px]"
              >
                <div className="text-xs font-normal text-[#afafaf]">
                  {attribute.trait_type}
                </div>
                <div className="text-sm font-semibold">{attribute.value}</div>
              </div>
            ))}
          </div>
        </Accordion>
      )}
    </div>
  );
};
