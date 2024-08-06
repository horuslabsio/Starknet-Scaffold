"use client";
import { useState } from "react";
import AddTokenModal from "~/ui_components/AddTokenModal";
function AddTokenBtn() {
  const [openAddTokenModal, setOpenAddTokenModal] = useState(false);

  const toggleAddTokenModal = () => {
    setOpenAddTokenModal((prev) => !prev);
  };

  return (
    <>
      <button
        className="w-fit rounded-[12px] border-[2.5px] border-solid border-accent-secondary bg-background-primary-light px-12 py-3 text-accent-secondary"
        onClick={toggleAddTokenModal}
      >
        Add Token
      </button>
      <AddTokenModal
        openAddTokenModal={openAddTokenModal}
        closeAddTokenModal={toggleAddTokenModal}
      />
    </>
  );
}

export default AddTokenBtn;
