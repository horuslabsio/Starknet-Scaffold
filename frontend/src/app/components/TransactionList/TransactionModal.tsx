"use client";
import { useEffect, useState } from "react";
import GenericModal from "../ui_components/GenericModal";
import TransactionList from "./TransactionList";
import React from "react";
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
      className="w-[90vw] h-fit mx-auto md:w-[30rem] md:min-h-[30rem] px-4 py-8 md:p-8"
    >
      <TransactionList />
    </GenericModal>
  );
};

export default TransactionModal;
