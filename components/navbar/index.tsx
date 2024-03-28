import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  // Use the useMediaQuery hook to check for screen width
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      {/* Conditional rendering based on screen size */}
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
};

export default Navbar;
