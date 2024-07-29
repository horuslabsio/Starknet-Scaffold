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
        className="px-[48px] py-[14px] bg-white border-[#141925] border-[2.5px] border-solid rounded-[12px] w-fit text-[24px] leading-9 text-[#141925] font-semibold"
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
