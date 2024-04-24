import React from "react";
import connectBgDesktop from "@/public/images/connect-bg-desktop.png";
import connectBgMobile from "@/public/images/connect-bg-mobile.png";
import useScreen from "@/hooks/useScreen";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useScreen();
  return (
    <div
      className="w-full h-full fixed top-0 left-0 flex items-center justify-center z-30"
      style={{
        background: isMobile
          ? `url(${connectBgMobile.src})`
          : `url(${connectBgDesktop.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="p-6 md:p-0 md:px-28 md:py-6"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "32px",
          background: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(25px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
