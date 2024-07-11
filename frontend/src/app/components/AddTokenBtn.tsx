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
        className="px-5 py-2 bg-primary text-white rounded font-semibold"
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
