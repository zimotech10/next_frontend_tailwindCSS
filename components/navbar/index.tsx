"use client";

import React, { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import logo from "../../public/images/horizontal-logo.png";
import useScreen from "@/hooks/useScreen";

const Navbar = () => {
  const isMobile = useScreen();

  return (
    <div>
      {isMobile ? (
        <MobileNav logo={logo.src} />
      ) : (
        <DesktopNav logo={logo.src} />
      )}
    </div>
  );
};

export default Navbar;
