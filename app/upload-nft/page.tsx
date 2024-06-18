"use client";

import { IBM_Plex_Sans } from "next/font/google";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type UploadType = "single-upload" | "multiple-upload";
type Step = "choose-upload" | "form";

export default function UploadNFTPage() {
  const [step, setStep] = useState<Step>("choose-upload");
  const [uploadType, setUploadType] = useState<UploadType>("single-upload");
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [contentFolder, setContentFolder] = useState<FileList | null>(null);
  const [informationFile, setInformationFile] = useState<File | null>(null);
  const [isMultipleFormValid, setIsMultipleFormValid] = useState(false);

  const chooseUpload = (upload: UploadType, step: Step) => {
    setUploadType(upload);
    setStep(step);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = () => {
        setNftImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleContentFolderUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setContentFolder(event.target.files);
  };

  const handleInformationFileUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInformationFile(event.target.files ? event.target.files[0] : null);
  };

  useEffect(() => {
    const validateForm = () => {
      if (
        nftImage &&
        itemName &&
        description &&
        salePrice &&
        numberOfCopies &&
        royalty
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
    validateForm();
  }, [nftImage, itemName, description, salePrice, numberOfCopies, royalty]);

  useEffect(() => {
    const validateMultipleForm = () => {
      if (contentFolder && informationFile) {
        setIsMultipleFormValid(true);
      } else {
        setIsMultipleFormValid(false);
      }
    };
    validateMultipleForm();
  }, [contentFolder, informationFile]);

  const getTitleText = () => {
    if (step === "choose-upload") {
      return "Choose Upload";
    } else if (uploadType === "single-upload") {
      return "Single NFT Upload";
    } else if (uploadType === "multiple-upload") {
      return "Multiple NFTs Upload";
    }
  };

  return (
    <div className={`md:p-20 p-4 ${ibmSans.className}`}>
      <div className="flex flex-col gap-4">
        <Link href="/" className="flex flex-row items-center md:gap-4 gap-2">
          <Icon icon="mingcute:arrow-left-line" width={30} />
          <span className="text-xl md:text-2xl font-bold">
            {getTitleText()}
          </span>
        </Link>

        <AnimatePresence mode="wait">
          {step === "choose-upload" && (
            <motion.div
              key="choose-upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row self-center my-28 md:my-0 md:mt-12 gap-4 md:gap-10 md:bg-[#0B0A0A] md:p-8 md:w-fit w-full"
            >
              <button
                onClick={() => chooseUpload("single-upload", "form")}
                className={`flex flex-col md:h-[202px] md:w-[269px] w-full rounded-3xl md:rounded-lg py-4 justify-center items-center border transition-colors duration-300 ${
                  uploadType === "single-upload"
                    ? "border-[#FFEA7F]"
                    : "border-[#302F2F]"
                }`}
              >
                <div className="font-semibold text-base text-white">
                  Single Upload
                </div>
                <div className="font-medium text-xs text-[#afafaf] text-center">
                  If you want to highlight the uniqueness <br /> and
                  individuality of your item
                </div>
              </button>
              <button
                onClick={() => chooseUpload("multiple-upload", "form")}
                className={`flex flex-col md:h-[202px] md:w-[269px] w-full rounded-3xl md:rounded-lg py-4 justify-center items-center border transition-colors duration-300 ${
                  uploadType === "multiple-upload"
                    ? "border-[#FFEA7F]"
                    : "border-[#302F2F]"
                }`}
              >
                <div className="font-semibold text-base text-white">
                  Multiple Upload
                </div>
                <div className="font-medium text-xs text-[#afafaf] text-center">
                  If you want to share your NFT <br /> with a large number of
                  community
                </div>
              </button>
            </motion.div>
          )}

          {step === "form" && uploadType === "single-upload" && (
            <motion.div
              key="single-upload-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:p-14 self-center gap-4 md:gap-6 w-full md:w-[700px]"
            >
              <div className="flex flex-col text-center md:text-start">
                <h2 className="text-white text-lg font-bold">
                  NFT Information
                </h2>
                <h4 className="text-gray-400 text-sm">
                  This information will be displayed publicly.
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">NFT Image*</label>
                <h4 className="text-gray-400 text-sm">466 x 466 suggested</h4>
                {nftImage ? (
                  <div className="w-full h-[332px] md:h-[281px] overflow-hidden">
                    <Image src={nftImage} width={704} height={281} alt="NFT" />
                  </div>
                ) : (
                  <div
                    className="flex flex-col w-full h-[332px] md:h-[281px] justify-center items-center bg-[#20232799] rounded-lg relative"
                    onClick={() =>
                      document.getElementById("nft-image-upload")?.click()
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
                      id="nft-image-upload"
                      className="w-full h-full hidden"
                    />
                    <label
                      htmlFor="nft-image-upload"
                      className="absolute w-full h-full flex flex-col justify-center items-center gap-3"
                    >
                      <span>Now Upload or Drag & Drop File</span>
                      <span className="cursor-pointer px-2 py-1 rounded border border-white">
                        Select Image
                      </span>
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Item Name*</label>
                <input
                  type="text"
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Description*</label>
                <textarea
                  className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-white">Sale Price*</label>
                <div className="flex flex-row gap-2 items-center">
                  <input
                    type="number"
                    className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md w-full"
                    placeholder="NFT Price per pcs"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    required
                  />
                  <span className="text-sm text-white">SOL </span>
                  <span>~$0</span>
                </div>
              </div>
              <div className="flex flex-row gap-4 md:gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-white">
                    Number of Copies*
                  </label>
                  <input
                    type="number"
                    className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md w-full"
                    placeholder="Number of Copies"
                    value={numberOfCopies}
                    onChange={(e) => setNumberOfCopies(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-white">Royalty*</label>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="number"
                      className="px-4 py-2 bg-[#0B0A0A] border border-[#353840] rounded-md w-full"
                      placeholder="Royalty"
                      value={royalty}
                      onChange={(e) => setRoyalty(e.target.value)}
                      required
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => setStep("choose-upload")}
                  className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                  style={{ border: "1px solid #F88430", color: "#F88430" }}
                >
                  Back
                </button>
                <button
                  disabled={!isFormValid}
                  className={`py-4 w-full rounded-3xl flex justify-center text-sm font-medium ${
                    isFormValid
                      ? "text-black bg-gradient-to-r from-yellow-400 to-yellow-600"
                      : "text-gray-400 bg-gray-600"
                  }`}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}

          {step === "form" && uploadType === "multiple-upload" && (
            <motion.div
              key="multiple-upload-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:p-14 self-center gap-4 md:gap-6"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex flex-col w-full md:w-[500px] p-2 md:p-9 gap-2">
                  <div className="font-bold text-sm md:text-lg">
                    NFT Content Folder *
                  </div>
                  <div className="font-normal text-xs text-[#CDD4E6]">
                    Upload Folder of Image. File types supported: JPG, PNG, GIF,
                    SVG, MP4, WEBM, WAV, Max file size: 100 MB. Max folder size:
                    2 GB. Max number of files: 1000 files.
                  </div>
                  <input
                    type="file"
                    // @ts-ignore
                    directory=""
                    webkitdirectory=""
                    onChange={handleContentFolderUpload}
                    className="hidden"
                    id="content-folder-upload"
                  />
                  <label
                    htmlFor="content-folder-upload"
                    className="text-black w-[220px] py-3 rounded-3xl flex justify-center text-sm font-medium mt-6 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                  >
                    Upload
                  </label>
                </div>
                <div className="flex flex-col w-full md:w-[500px] p-2 md:p-9 gap-2">
                  <div className="font-bold text-sm md:text-lg">
                    NFT Information File *
                  </div>
                  <div className="font-normal text-xs text-[#CDD4E6]">
                    Download the template file and fill in your NFT information
                    before uploading. Supported file type: XLSX. Max file size:
                    20 MB.
                  </div>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleInformationFileUpload}
                    className="hidden"
                    id="information-file-upload"
                  />
                  <label
                    htmlFor="information-file-upload"
                    className="text-black w-[220px] py-3 rounded-3xl flex justify-center text-sm font-medium mt-6 cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                    }}
                  >
                    Upload
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-3 md:w-[700px]">
                <button
                  className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
                  style={{ border: "1px solid #F88430", color: "#F88430" }}
                  onClick={() => {
                    setStep("choose-upload");
                  }}
                >
                  Back
                </button>
                <button
                  disabled={!isMultipleFormValid}
                  className={`py-4 w-full rounded-3xl flex justify-center text-sm font-medium ${
                    isMultipleFormValid
                      ? "text-black bg-gradient-to-r from-yellow-400 to-yellow-600"
                      : "text-gray-400 bg-gray-600"
                  }`}
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
