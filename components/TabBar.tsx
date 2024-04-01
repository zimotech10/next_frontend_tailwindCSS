"use client";

import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
const TabBar = ({ pathname }: { pathname: string }) => {
  return (
    <div className="flex flex-row justify-center md:justify-between py-4 items-center md:py-6">
      <div className="flex flex-row gap-1 items-center justify-between">
        <Link
          href="/"
          className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${
            pathname === "items" ? "bg-neutral-800" : "hover:bg-neutral-800"
          }`}
        >
          Items
        </Link>
        <Link
          href="/collections"
          className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${
            pathname === "collections"
              ? "bg-neutral-800"
              : "hover:bg-neutral-800"
          }`}
        >
          Collections
        </Link>
        <Link
          href="/domains"
          className={`px-6 py-2 md:px-8 md:py-3 rounded-3xl text-base font-bold ${
            pathname === "domains" ? "bg-neutral-800" : "hover:bg-neutral-800"
          }`}
        >
          Domains
        </Link>
      </div>
      <div className="flex-row hidden gap-2 items-center md:flex">
        <div className="p-2 bg-neutral-800 rounded-sm flex items-center">
          <Icon icon="mage:dashboard" width={24} />
        </div>
        <div className="flex items-center">
          <Icon icon="line-md:grid-3-filled" width={24} />
        </div>
      </div>
    </div>
  );
};

export default TabBar;
