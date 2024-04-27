import React from "react";
import connectBgDesktop from "@/public/images/connect-bg-desktop.png";
import connectBgMobile from "@/public/images/connect-bg-mobile.png";
import useScreen from "@/hooks/useScreen";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  handleConnectModal: () => void;
  isOpen: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const Modal: React.FC<ModalProps> = ({
  children,
  handleConnectModal,
  isOpen,
}) => {
  const isMobile = useScreen();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-full h-full fixed top-0 left-0 flex flex-row items-center justify-center z-30"
          style={{
            background: isMobile
              ? `url(${connectBgMobile.src})`
              : `url(${connectBgDesktop.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="p-6 md:p-0 md:px-28 md:py-6 flex flex-row items-start justify-center"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "32px",
              background: "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(25px)",
              width: isMobile ? "332px" : "750px",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
            <button
              onClick={handleConnectModal}
              className="px-1 py-0.5 mt-4 bg-gray-700 rounded-lg"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
