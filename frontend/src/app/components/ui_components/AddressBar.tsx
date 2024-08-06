"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import Blockies from "react-blockies";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenericModal from "./GenericModal";
import AccountBalance from "./AccountBalance";

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
  const { data: starkProfile } = useStarkProfile({
    address,
  });

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
    navigator.clipboard.writeText(starkProfile?.name || address);
    setIsCopied(true);
  }

  const { disconnect } = useDisconnect();

  return (
    <GenericModal
      isOpen={openConnectedModal}
      onClose={closeModal}
      animate={animate}
      className={`text-white mx-auto h-[60vh] w-[80vw] md:h-[30rem] md:w-[25rem]`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-[80%] w-[80%] flex-col items-center justify-evenly">
          {starkProfile?.profilePicture ? (
            <img
              src={starkProfile?.profilePicture}
              className="mb-3 mr-2 h-[120px] w-[120px] rounded-full"
              alt="starknet profile"
            />
          ) : (
            <Blockies
              seed={address}
              scale={15}
              className="mb-3 h-24 w-24 rounded-full"
            />
          )}

          <AccountBalance address={address} />
          <span className="border-outline-gray flex w-full justify-between rounded-full border-[1px] p-3">
            <span className="flex justify-center">
              {starkProfile?.name ||
                address?.slice(0, 12).concat("...").concat(address?.slice(-5))}
            </span>
            <Image
              onClick={handleCopyClick}
              className="border-outline-grey cursor-pointer border-l-[1px] border-solid pl-1"
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
            className="bg-primary w-full rounded-lg p-3"
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
  const { data: starkProfile } = useStarkProfile({
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
      className="bg-primary text-white rounded-full px-4 py-2 transition duration-300"
    >
      {
        <span className="flex items-center">
          {starkProfile?.profilePicture ? (
            <img
              src={starkProfile?.profilePicture}
              className="mr-2 h-8 w-8 rounded-full"
              alt="starknet profile"
            />
          ) : (
            <Blockies seed={address} className="mr-2 h-8 w-8 rounded-full" />
          )}
          {starkProfile?.name
            ? starkProfile.name
            : address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
        </span>
      }
    </button>
  );
};

export default AddressBar;
