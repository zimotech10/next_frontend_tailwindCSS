import React from "react";
import Image from "next/image";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const MobileNav = (
  props: React.PropsWithChildren<{
    logo: string;
  }>
) => {
  return (
    <div className="flex flex-row items-center justify-between p-3 z-50">
      <div className="flex flex-row gap-1 items-center">
        <Image src={props.logo} width={132} height={48} alt="logo" />
        <Icon icon="mingcute:search-line" width={20} height={20} />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div
          className="p-1 flex items-center bg-white"
          style={{ borderRadius: "31px" }}
        >
          <Icon icon="solar:cart-bold" width={24} style={{ color: "black" }} />
        </div>
        <Icon icon="akar-icons:three-line-horizontal" />
      </div>
    </div>
  );
};

export default MobileNav;
