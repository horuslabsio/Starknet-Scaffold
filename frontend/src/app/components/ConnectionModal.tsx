"use client";
import CopyButton from "./ui_components/CopyButton";
import GenericModal from "./ui_components/GenericModal";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleConnect: () => void;
  wallet: {
    privateKey: string;
    address: string;
    publicKey: string;
  };
};

function ConnectionModal({ isOpen, onClose, handleConnect, wallet }: Props) {
  // useState Variables
  const [animate, setAnimate] = useState(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

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
      onClose={closeModal}
      animate={animate}
      className={`bg-white text-white dark:bg-black relative mx-auto w-[90vw] px-5 py-4 md:h-fit md:w-[45rem]`}
    >
      <div className="absolute right-5 top-4">
        <button
          onClick={(e) => {
            closeModal(e);
            e.stopPropagation();
          }}
          className="bg-outline-grey grid h-8 w-8 place-content-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
            />
          </svg>
        </button>
      </div>
      <h1 className="mb-2 text-[24px] font-semibold">Connect Account</h1>
      <form>
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <h2>Private Key</h2>
              <CopyButton data={wallet.privateKey} />
            </div>
            <input
              type="text"
              placeholder="Enter Private Key"
              className="dark:text-white text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6] disabled:cursor-not-allowed"
              value={wallet.privateKey}
              disabled={true}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <h2>Account Address</h2>
              <CopyButton data={wallet.address} />
            </div>
            <input
              type="text"
              placeholder="Enter Account Address"
              className="dark:text-white text-black w-full rounded border-[2px] p-2 outline-none focus:border-[#3b81f6] disabled:cursor-not-allowed"
              value={wallet.address}
              disabled={true}
            />
          </div>
        </div>

        <button
          className="bg-primary mt-7 flex w-full items-center justify-center gap-x-2 rounded py-3 font-bold disabled:cursor-not-allowed"
          type="submit"
          onClick={handleConnect}
        >
          Connect
        </button>
      </form>
    </GenericModal>
  );
}

export default ConnectionModal;
