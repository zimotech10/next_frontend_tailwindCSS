"use client";

import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import useScreen from "@/hooks/useScreen";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function CreateCollectionPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discord, setDiscord] = useState("");
  const [x, setX] = useState("");
  const [selectedOption, setSelectedOption] = useState("LaunchPad");
  const [collectionImage, setCollectionImage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [formstep, setFormstep] = useState("collection-info");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollectionImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isMobile = useScreen();

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className}`}>
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex flex-row items-center md:gap-4 gap-2">
          <Icon icon="mingcute:arrow-left-line" width={30} />
          <span className="text-xl md:text-2xl font-bold">
            New Collection Submission
          </span>
        </Link>

        <AnimatePresence mode="wait">
          {formstep === "collection-info" && (
            <motion.div
              key="collection-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:p-14 self-center gap-4 md:gap-6"
              style={{ width: isMobile ? "100%" : "720px" }}
            >
              <div className="flex flex-col text-center md:text-start">
                <h2 className="text-white text-lg font-bold">
                  Collection Information
                </h2>
                <h4 className="text-gray-400 text-sm">
                  This information will be displayed publicly.
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Name*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Description*</label>
                <textarea
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Description"
                  required
                />
              </div>
              <div className="flex flex-col items-start text-white">
                <label className="mb-2 font-semibold">Collection Type</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Secondary Listing"
                      checked={selectedOption === "Secondary Listing"}
                      onChange={() => setSelectedOption("Secondary Listing")}
                      className="form-radio text-orange-500"
                    />
                    <span>Secondary Listing</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="LaunchPad"
                      checked={selectedOption === "LaunchPad"}
                      onChange={() => setSelectedOption("LaunchPad")}
                      className="form-radio text-orange-500"
                    />
                    <span>LaunchPad</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Discord*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Discord"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">X*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="https://x.com/username"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Website*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="https://yourwebsite.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">
                  Featured Collection Image*
                </label>
                <h4 className="text-gray-400 text-sm">466 x 466 suggested</h4>
                {collectionImage ? (
                  <div className="w-full h-[332px] md:h-[281px]">
                    <Image
                      src={collectionImage}
                      width={704}
                      height={281}
                      alt="collectionImage"
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col w-full h-[332px] md:h-[281px] justify-center items-center bg-[#20232799] rounded-lg relative"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files && files.length)
                        handleImageUpload({
                          target: { files },
                        } as ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="image-upload"
                      className="w-full h-full hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="absolute w-full h-full flex flex-col justify-center items-center gap-3"
                    >
                      <span>Now Upload or Drag&Drop File</span>
                      <span className="cursor-pointer px-2 py-1 rounded border border-white">
                        Select Image
                      </span>
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Thumbnail*</label>
                <h4 className="text-gray-400 text-sm">466 x 466 suggested</h4>
                {thumbnail ? (
                  <div className="w-full h-[332px] md:h-[281px]">
                    <Image
                      src={thumbnail}
                      width={704}
                      height={281}
                      alt="thumbnail"
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col w-full h-[332px] md:h-[281px] justify-center items-center bg-[#20232799] rounded-lg relative"
                    onClick={() =>
                      document.getElementById("thumbnail-upload")?.click()
                    }
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files && files.length)
                        handleThumbnailUpload({
                          target: { files },
                        } as ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      id="thumbnail-upload"
                      className="w-full h-full hidden"
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="absolute w-full h-full flex flex-col justify-center items-center gap-3"
                    >
                      <span>Now Upload or Drag&Drop File</span>
                      <span className="cursor-pointer px-2 py-1 rounded border border-white">
                        Select Image
                      </span>
                    </label>
                  </div>
                )}
              </div>
              <button
                className="py-4 w-full rounded-3xl flex justify-center text-sm font-medium text-black"
                style={{
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                }}
                onClick={() => {
                  setFormstep("minting-info");
                }}
              >
                Next
              </button>
            </motion.div>
          )}

          {formstep === "minting-info" && (
            <motion.div
              key="minting-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:p-14 self-center gap-4 md:gap-6"
              style={{ width: isMobile ? "100%" : "720px" }}
            >
              <div className="flex flex-col text-center md:text-start">
                <h2 className="text-white text-lg font-bold">
                  Minting Information
                </h2>
                <h4 className="text-gray-400 text-sm">Details about minting</h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">
                  Total Number of Items*
                </label>
                <input
                  type="number"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">SOL Wallet ID*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="SOL Wallet ID"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Mint Date*</label>
                <div className="flex flex-row gap-2">
                  <input
                    type="date"
                    className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md "
                    required
                  />
                  <input
                    type="time"
                    className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md "
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                <button
                  className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                  style={{ border: "1px solid #F88430", color: "#F88430" }}
                  onClick={() => {
                    setFormstep("collection-info");
                  }}
                >
                  Back
                </button>
                <button
                  className="py-4 w-full rounded-3xl flex justify-center text-sm font-medium text-black"
                  style={{
                    background:
                      "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                  }}
                  onClick={() => {
                    setFormstep("personal-info");
                  }}
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {formstep === "personal-info" && (
            <motion.div
              key="personal-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:p-14 self-center gap-4 md:gap-6"
              style={{ width: isMobile ? "100%" : "720px" }}
            >
              <div className="flex flex-col text-center md:text-start">
                <h2 className="text-white text-lg font-bold">Contact</h2>
                <h4 className="text-gray-400 text-sm">
                  This information won&apos;t be shared publicly.
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Name</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Discord</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Discord ID"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">SOL Wallet ID</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="SOL Wallet ID"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Notes</label>
                <textarea
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Notes"
                />
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-3">
                <button
                  className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                  style={{ border: "1px solid #F88430", color: "#F88430" }}
                  onClick={() => {
                    setFormstep("minting-info");
                  }}
                >
                  Back
                </button>
                <button
                  className="py-4 w-full rounded-3xl flex justify-center text-sm font-medium text-black"
                  style={{
                    background:
                      "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                  }}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
