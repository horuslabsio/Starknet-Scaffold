"use client";
import { useAccount, useDisconnect, useStarkName } from "@starknet-react/core";
import Blockies from "react-blockies";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenericModal from "./GenericModal";

export const UserModal = ({
  openConnectedModal,
  address,
  closeConnectedModal,
}: {
  openConnectedModal: boolean;
  address: string;
  closeConnectedModal: () => void;
}) => {
  const [animate, setAnimate] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnimate(false);
    setTimeout(() => {
      closeConnectedModal();
    }, 400);
  };

  useEffect(() => {
    if (openConnectedModal) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [openConnectedModal]);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleCopyClick() {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setIsCopied(true);
  }
  const { disconnect } = useDisconnect();

  return (
    <GenericModal
      isOpen={openConnectedModal}
      onClose={closeModal}
      animate={animate}
      className={`w-[80vw] h-[60vh] mx-auto md:w-[25rem] md:h-[30rem]  text-white `}
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex h-[80%] w-[80%] flex-col items-center justify-evenly">
          <Blockies
            seed={address}
            scale={15}
            className="rounded-full h-24 w-24"
          />
          <span className="flex justify-between p-3 border-[1px] border-outline-gray rounded-full w-full">
            <span className="flex justify-center">
              {address?.slice(0, 12).concat("...").concat(address?.slice(-5))}
            </span>
            <Image
              onClick={handleCopyClick}
              className="border-l-[1px] border-outline-grey border-solid pl-1"
              src={isCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
              width={20}
              height={20}
              alt="#"
            />
          </span>
          <button
            onClick={(e) => {
              closeModal(e);
              disconnect();
              e.stopPropagation();
            }}
            className="p-3 w-full rounded-lg bg-blue-500  "
          >
            Disconnect
          </button>
        </div>
      </div>
    </GenericModal>
  );
};

const AddressBar = ({
  setOpenConnectedModal,
}: {
  setOpenConnectedModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  const { data, isLoading, isError } = useStarkName({
    address,
  });

  const toggleModal = () => {
    setOpenConnectedModal((prev) => !prev);
  };

  if (!address) {
    return null;
  }

  return (
    <button
      onClick={toggleModal}
      className="bg-blue-500 py-2 px-4 text-white rounded-full transition duration-300"
    >
      {isLoading && <span>Loading...</span>}
      {isError && (
        <span className="flex items-center">
          <Blockies seed={address} className="rounded-full h-3 w-3 mr-2" />
          {address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
        </span>
      )}
      {data && (
        <span className="flex items-center">
          <Blockies seed={address} className="rounded-full h-3 w-3" />
          {data}
        </span>
      )}
    </button>
  );
};

export default AddressBar;
