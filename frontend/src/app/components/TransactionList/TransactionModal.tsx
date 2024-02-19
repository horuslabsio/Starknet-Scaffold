"use client";
import { useEffect, useState } from "react";
import GenericModal from "../GenericModal";
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
      className="fixed top-0 right-10 w-1/4"
    >
      <div className="m-4">
        <TransactionList />
      </div>
    </GenericModal>
  );
};

export default TransactionModal;
