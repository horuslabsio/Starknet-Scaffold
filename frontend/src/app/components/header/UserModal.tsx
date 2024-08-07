"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import Blockies from "react-blockies";
import { useEffect, useState } from "react";
import GenericModal from "../ui_components/GenericModal";
import AccountBalance from "../ui_components/AccountBalance";
import Close from "svg/Close";

const UserModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isCopied, setIsCopied] = useState(false);
  const { data: starkProfile } = useStarkProfile({
    address,
  });

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
  return (
    <GenericModal
      popoverId="user-popover"
      style={`h-[60vh] w-[80vw] md:h-[30rem] md:w-[34rem] rounded-[24px]`}
    >
      <div className="flex flex-col justify-between gap-4 p-8 text-md text-text-primary">
        <div className="flex justify-between">
          <h3 className="text-l text-accent-secondary">Connected</h3>
          <button>
            <Close />
          </button>
        </div>
        <div className="mx-auto">
          <div className="mb-4 h-24 w-24 rounded-full">
            {starkProfile?.profilePicture ? (
              <img
                src={starkProfile?.profilePicture}
                className="w-full rounded-full"
                alt="starknet profile"
              />
            ) : (
              <Blockies
                seed={address || ""}
                scale={10}
                className="mx-auto h-full w-full rounded-full"
              />
            )}
          </div>
          <button
            onClick={handleCopyClick}
            className="flex items-center gap-2 text-text-links"
          >
            <span>
              {starkProfile?.name ||
                address?.slice(0, 12).concat("...").concat(address?.slice(-5))}
            </span>
            <span className="rounded-full bg-accent-tertiary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19a.32.32 0 0 0-.09 0a.88.88 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3V9zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="rounded-[12px] bg-button-secondary">
          <AccountBalance address={address || ""} />
        </div>
        <div>
          <button
            onClick={(e) => {
              const popover = document.getElementById("user-popover");
              popover.hidePopover();
              disconnect();
            }}
            className="w-full rounded-[12px] bg-accent-tertiary p-4 text-red-secondary"
          >
            Disconnect
          </button>
        </div>
      </div>
    </GenericModal>
  );
};

export default UserModal;
