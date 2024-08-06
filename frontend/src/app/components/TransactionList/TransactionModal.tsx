"use client";
import { useEffect, useState } from "react";
import GenericModal from "../ui_components/GenericModal";
import TransactionList from "./TransactionList";
const TransactionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      animate={animate}
      position="justify-center items-center md:justify-end"
      className="mx-auto h-fit w-[90vw] px-4 py-8 md:min-h-[30rem] md:w-[30rem] md:p-8"
    >
      <TransactionList />
    </GenericModal>
  );
};

export default TransactionModal;
