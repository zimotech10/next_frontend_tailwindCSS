"use client";

import { IBM_Plex_Sans } from "next/font/google";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const ibmSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function CreateCollectionPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={`md:p-20 p-4 ${ibmSans.className} flex flex-col`}>
      <div className="flex flex-col md:p-14 self-center gap-4 md:gap-6 w-full md:w-[720px]">
        <div className="flex flex-col text-center md:text-start">
          <h2 className="text-white text-lg font-bold">Create Collection</h2>
          <h4 className="text-gray-400 text-sm">
            Please Carefully Name Your Collections
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">Profile Image</span>
          {logo ? (
            <div className="w-[107px] h-[107px] rounded-full">
              <Image
                src={logo}
                width={704}
                height={281}
                alt="collectionImage"
                className="rounded-full"
              />
            </div>
          ) : (
            <div
              className="flex flex-col w-[107px] h-[107px] rounded-full justify-center items-center bg-[#20232799] relative cursor-pointer"
              onClick={() => document.getElementById("image-upload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files && files.length)
                  handleLogoUpload({
                    target: { files },
                  } as ChangeEvent<HTMLInputElement>);
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                id="image-upload"
                className="w-full h-full hidden"
              />
              <label
                htmlFor="image-upload"
                className="absolute w-full h-full flex flex-col justify-center items-center gap-1 cursor-pointer"
              >
                <Icon icon="lucide:camera" width={40} />
                <span className="text-sm">Upload</span>
              </label>
            </div>
          )}
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
        <div className="flex flex-col gap-2">
          <span className="text-sm">Cover Image</span>
          <h4 className="text-gray-400 text-sm">466 x 466 suggested</h4>
          {cover ? (
            <div className="w-full h-[332px] md:h-[281px] overflow-hidden cursor-pointer">
              <Image src={cover} width={704} height={281} alt="cover" />
            </div>
          ) : (
            <div
              className="flex flex-col w-full h-[332px] md:h-[281px] justify-center items-center bg-[#20232799] rounded-lg relative cursor-pointer"
              onClick={() => document.getElementById("cover-upload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files && files.length)
                  handleCoverUpload({
                    target: { files },
                  } as ChangeEvent<HTMLInputElement>);
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                id="cover-upload"
                className="w-full h-full hidden"
              />
              <label
                htmlFor="cover-upload"
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
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <button
            className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl"
            style={{ border: "1px solid #F88430", color: "#F88430" }}
          >
            Cancel
          </button>
          <button
            className="py-4 w-full rounded-3xl flex justify-center text-sm font-medium text-black"
            style={{
              background:
                "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
            }}
            onClick={() => {}}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
