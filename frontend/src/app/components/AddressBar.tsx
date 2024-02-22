"use client";
import { useAccount, useDisconnect, useStarkName } from "@starknet-react/core";
import Blockies from "react-blockies";
import Image from "next/image";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const UserModal = ({
  setOpenConnectedModal,
  address,
  handleCopyClick,
  isCopied,
}: {
  setOpenConnectedModal: Dispatch<SetStateAction<boolean>>;
  address: string;
  handleCopyClick: MouseEventHandler<HTMLImageElement> | undefined;
  isCopied: boolean;
}) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    return () => {
      setAnimate(false);
    };
  }, []);

  const removeConnectedModal = () => {
    setAnimate(false);
    setTimeout(() => {
      setOpenConnectedModal(false);
    }, 400);
  };

  const { disconnect } = useDisconnect();

  return (
    <section
      onClick={(e) => {
        setOpenConnectedModal(false);
        e.stopPropagation();
      }}
      className="absolute left-1/2 right-1/2 grid justify-center items-center z-[99] backdrop-blur"
    >
      <div
        className={`bg-[#1c1b1f] rounded-[25px] flex flex-col h-[400px] w-[300px] border-[1px] border-solid border-outline-grey transition-[opacity,transform] duration-500 ease-in-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }  `}
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
                removeConnectedModal();
                disconnect();
                e.stopPropagation();
              }}
              className="p-3 w-full rounded-lg bg-blue-500  "
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AddressBar = () => {
  const { address } = useAccount();
  const [isCopied, setIsCopied] = useState(false);
  const [openConnectedModal, setOpenConnectedModal] = useState(false);
  const { data, isLoading, isError } = useStarkName({
    address,
  });

  const toggleModal = () => {
    setOpenConnectedModal((prev) => !prev);
  };

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

  if (!address) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="fixed bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        {isLoading && <span>Loading...</span>}
        {isError && (
          <span className="flex items-center gap-x-3">
            <Blockies seed={address} className="rounded-full h-3 w-3" />
            {address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
          </span>
        )}
        {data && (
          <span className="flex items-center gap-x-3">
            <Blockies seed={address} className="rounded-full h-3 w-3" />
            {data}
          </span>
        )}
      </button>
      {openConnectedModal && (
        <UserModal
          setOpenConnectedModal={setOpenConnectedModal}
          address={address}
          handleCopyClick={handleCopyClick}
          isCopied={isCopied}
        />
      )}
    </>
  );
};

export default AddressBar;
