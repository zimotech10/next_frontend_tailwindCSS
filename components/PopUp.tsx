// components/Modal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import errorImg from "@/public/images/error.svg";
import successImg from "@/public/images/success.png";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  message: string;
  variant: "error" | "success";
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: "-50%", scale: 0.8 },
  visible: { opacity: 1, y: "0%", scale: 1 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  message,
  variant,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center"
          open={isOpen}
          onClose={closeModal}
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          <motion.div
            className="border border-white border-opacity-15 bg-black bg-opacity-80 rounded-lg p-6 md:p-10 text-center shadow-lg z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-center gap-4">
              {variant === "success" ? (
                <Image
                  src={successImg}
                  width={116}
                  height={116}
                  alt="success"
                />
              ) : (
                <Image src={errorImg} width={116} height={116} alt="success" />
              )}
              {variant === "success" ? (
                <p className="font-bold text-2xl text-white">Hurray !!</p>
              ) : (
                <p className="font-bold text-2xl text-white">Error !!</p>
              )}

              <p className="text-white mt-2">{message}</p>
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 md:px-10 flex flex-row gap-2 items-center justify-center rounded-3xl font-bold"
                style={{
                  color: "black",
                  background:
                    "linear-gradient(149deg, #FFEA7F 9.83%, #AB5706 95.76%)",
                }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
