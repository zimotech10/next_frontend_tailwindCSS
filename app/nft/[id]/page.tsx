"use client";
import { IBM_Plex_Sans } from "next/font/google";
import { NFTDetail } from "@/components/nft";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function NFTPage() {
  <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col gap-12`}>
    <NFTDetail userType="user" />
  </div>;
}
