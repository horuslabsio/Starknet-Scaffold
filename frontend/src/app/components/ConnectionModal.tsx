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
      popoverId=""
      style={`bg-white text-white dark:bg-black relative mx-auto w-[90vw] px-5 py-4 md:h-fit md:w-[45rem]`}
    >
      <div className="absolute right-5 top-4">
        <button
          onClick={(e) => {
            closeModal(e);
            e.stopPropagation();
          }}
          className="w-8 h-8  grid place-content-center rounded-full bg-outline-grey  "
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
      <h1 className="text-[24px] mb-2 font-semibold ">Connect Account</h1>
      <form>
        <div className="flex flex-col gap-y-5 ">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <h2>Private Key</h2>
              <CopyButton data={wallet.privateKey} />
            </div>
            <input
              type="text"
              placeholder="Enter Private Key"
              className="w-full rounded border-[2px] p-2 text-black outline-none focus:border-[#3b81f6] disabled:cursor-not-allowed dark:text-white"
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
              className="w-full rounded border-[2px] p-2 text-black outline-none focus:border-[#3b81f6] disabled:cursor-not-allowed dark:text-white"
              value={wallet.address}
              disabled={true}
            />
          </div>
        </div>

        <button
          className="w-full mt-7 py-3 bg-primary rounded font-bold flex items-center gap-x-2 justify-center disabled:cursor-not-allowed"
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
