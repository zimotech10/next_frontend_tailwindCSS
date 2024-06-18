"use client";

import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { IBM_Plex_Sans } from "next/font/google";
import useScreen from "@/hooks/useScreen";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type FormStep = "collection-info" | "minting-info" | "personal-info";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function SubmitCollectionPage() {
  // Collection Information
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discord, setDiscord] = useState("");
  const [x, setX] = useState("");
  const [website, setWebsite] = useState("");
  const [collectionImage, setCollectionImage] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("LaunchPad");
  const [isCollectionInfoValid, setIsCollectionInfoValid] = useState(false);

  // Minting Information
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [walletId, setWalletId] = useState("");
  const [mintDate, setMintDate] = useState("");
  const [mintTime, setMintTime] = useState("");
  const [isMintingInfoValid, setIsMintingInfoValid] = useState(false);

  // Personal Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(false);

  const [formstep, setFormstep] = useState<FormStep>("collection-info");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCollectionImage(reader.result as string);
        validateCollectionInfo();
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
        validateCollectionInfo();
      };
      reader.readAsDataURL(file);
    }
  };

  const validateCollectionInfo = () => {
    if (
      name.trim() &&
      description.trim() &&
      discord.trim() &&
      x.trim() &&
      website.trim() &&
      collectionImage &&
      thumbnail
    ) {
      setIsCollectionInfoValid(true);
    } else {
      setIsCollectionInfoValid(false);
    }
  };

  const validateMintingInfo = () => {
    if (
      totalItems !== null &&
      totalItems > 0 &&
      walletId.trim() &&
      mintDate.trim() &&
      mintTime.trim()
    ) {
      setIsMintingInfoValid(true);
    } else {
      setIsMintingInfoValid(false);
    }
  };

  const validatePersonalInfo = () => {
    if (fullName.trim() && email.trim() && phone.trim()) {
      setIsPersonalInfoValid(true);
    } else {
      setIsPersonalInfoValid(false);
    }
  };

  const isMobile = useScreen();

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className}`}>
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex flex-row items-center md:gap-4 gap=2">
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateCollectionInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Description*</label>
                <textarea
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    validateCollectionInfo();
                  }}
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
                  value={discord}
                  onChange={(e) => {
                    setDiscord(e.target.value);
                    validateCollectionInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">X*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="https://x.com/username"
                  value={x}
                  onChange={(e) => {
                    setX(e.target.value);
                    validateCollectionInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Website*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    validateCollectionInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">
                  Featured Collection Image*
                </label>
                <h4 className="text-gray-400 text-sm">466 x 466 suggested</h4>
                {collectionImage ? (
                  <div className="w-full h-[332px] md:h-[281px] overflow-hidden">
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
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <Icon icon="ph:image-square-light" width={44} />
                    <p className="text-white">
                      Drop or{" "}
                      <span className="text-orange-500">Browse Media</span> to
                      upload
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Thumbnail*</label>
                <h4 className="text-gray-400 text-sm">100 x 100 suggested</h4>
                {thumbnail ? (
                  <div className="w-full h-[332px] md:h-[281px] overflow-hidden">
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
                      className="hidden"
                      id="thumbnail-upload"
                      onChange={handleThumbnailUpload}
                    />
                    <Icon icon="ph:image-square-light" width={44} />
                    <p className="text-white">
                      Drop or{" "}
                      <span className="text-orange-500">Browse Media</span> to
                      upload
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Link
                  href="/"
                  className="px-4 py-2 bg-[#353840] text-white rounded-md"
                >
                  Cancel
                </Link>
                <button
                  className={`px-4 py-2 text-white rounded-md ${
                    isCollectionInfoValid ? "bg-orange-500" : "bg-gray-500"
                  }`}
                  onClick={() => setFormstep("minting-info")}
                  disabled={!isCollectionInfoValid}
                >
                  Next
                </button>
              </div>
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
                <h4 className="text-gray-400 text-sm">
                  This information will be displayed publicly.
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Total Items*</label>
                <input
                  type="number"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Total Items"
                  value={totalItems || ""}
                  onChange={(e) => {
                    setTotalItems(parseInt(e.target.value, 10) || null);
                    validateMintingInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Wallet ID*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Wallet ID"
                  value={walletId}
                  onChange={(e) => {
                    setWalletId(e.target.value);
                    validateMintingInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Mint Date*</label>
                <input
                  type="date"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  value={mintDate}
                  onChange={(e) => {
                    setMintDate(e.target.value);
                    validateMintingInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Mint Time*</label>
                <input
                  type="time"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  value={mintTime}
                  onChange={(e) => {
                    setMintTime(e.target.value);
                    validateMintingInfo();
                  }}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-[#353840] text-white rounded-md"
                  onClick={() => setFormstep("collection-info")}
                >
                  Back
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-md ${
                    isMintingInfoValid ? "bg-orange-500" : "bg-gray-500"
                  }`}
                  onClick={() => setFormstep("personal-info")}
                  disabled={!isMintingInfoValid}
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
                <h2 className="text-white text-lg font-bold">
                  Personal Information
                </h2>
                <h4 className="text-gray-400 text-sm">
                  This information will be displayed publicly.
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Full Name*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    validatePersonalInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Email*</label>
                <input
                  type="email"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validatePersonalInfo();
                  }}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Phone*</label>
                <input
                  type="tel"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    validatePersonalInfo();
                  }}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-[#353840] text-white rounded-md"
                  onClick={() => setFormstep("minting-info")}
                >
                  Back
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-md ${
                    isPersonalInfoValid ? "bg-orange-500" : "bg-gray-500"
                  }`}
                  onClick={() => {
                    // Add your submit logic here
                  }}
                  disabled={!isPersonalInfoValid}
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
