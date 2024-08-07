"use client";
import GenericModal from "../ui_components/GenericModal";
import TransactionList from "./TransactionList";
const TransactionModal = () => {
  return (
    <GenericModal
      popoverId="transaction-modal"
      style="mx-auto h-fit w-[90vw] px-4 py-8 md:min-h-[30rem] md:w-[30rem] md:p-8"
    >
      <TransactionList />
    </GenericModal>
  );
};

export default TransactionModal;
