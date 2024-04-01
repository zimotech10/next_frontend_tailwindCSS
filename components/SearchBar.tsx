"use client";

import yellowVector from "@/public/vectors/yellow-img.svg";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useState } from "react";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const [sort, setSort] = useState("Most Recent");
  const [sortModal, setSortModal] = useState(false);

  const selectSort = (method: string) => {
    setSort(method);
    setSortModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center md:gap-4 py-2 md:py-6">
      <div className="flex flex-row gap-2 md:gap-4 items-center justify-center">
        <Image src={yellowVector} width={36} height={36} alt="vector" />
        <div className="relative">
          <Icon
            icon="mingcute:search-line"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            width={20}
            height={20}
          />
          <input
            type="text"
            className="w-72 md:w-96 py-2 h-11 pl-10 pr-3 rounded-md"
            placeholder={placeholder}
            style={{ backgroundColor: "#0B0A0A" }}
          />
        </div>
      </div>
      <button
        className="flex flex-row items-center w-fit relative py-2 h-11 px-3 rounded-2xl md:rounded-md gap-2 md:gap-4"
        style={{ backgroundColor: "#0B0A0A" }}
        onClick={() => setSortModal(!sortModal)}
      >
        <span>{sort}</span>
        <Icon icon="mingcute:down-line" width={20} />
        {sortModal && (
          <div
            className="absolute top-10 z-50 p-3 flex flex-col gap-3 items-start"
            style={{ width: "170px" }}
          >
            <button onClick={() => selectSort("Most Recent")}>
              Most Recent
            </button>
            <button onClick={() => selectSort("Oldest")}>Oldest</button>
            <button onClick={() => selectSort("Price: Low to High")}>
              Price: Low to High
            </button>
            <button onClick={() => selectSort("Price: High to Low")}>
              Price: High to Low
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
