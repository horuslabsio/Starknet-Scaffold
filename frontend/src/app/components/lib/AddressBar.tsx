"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import Blockies from "react-blockies";
import AccountBalance from "./AccountBalance";
import GenericModal from "../internal/util/GenericModal";
import Close from "public/svg/Close";
import { useEffect, useState } from "react";
import CopyButton from "../internal/util/CopyButton";

const UserModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [imageError, setImageError] = useState(false);
  const { data: starkProfile } = useStarkProfile({
    address,
  });

  return (
    <GenericModal
      popoverId="user-popover"
      style="mt-[5rem] w-full bg-transparent backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem] h-screen"
    >
      <div className="user-modal mx-auto flex w-full max-w-[--header-max-w] flex-col items-center py-8 md:items-end md:px-12">
        <div className="flex w-[90vw] max-w-[25rem] flex-col justify-between gap-4 rounded-[24px] bg-[--background] p-8 text-md text-text-primary shadow-popover-shadow transition-colors duration-500 ease-linear md:max-w-[30rem]">
          <div className="flex justify-between">
            <h3 className="text-l text-[--headings]">Connected</h3>
            <button
              // @ts-ignore
              popovertarget="user-popover"
            >
              <Close />
            </button>
          </div>

          <div className="mx-auto">
            <div className="mx-auto mb-4 h-20 w-20 overflow-clip rounded-full md:h-24 md:w-24">
              {!imageError && starkProfile?.profilePicture ? (
                <img
                  src={starkProfile?.profilePicture}
                  className="w-full rounded-full"
                  alt="starknet profile"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Blockies
                  seed={address || ""}
                  scale={12}
                  className="mx-auto h-full w-full scale-110 rounded-full md:scale-100"
                />
              )}
            </div>
            <CopyButton
              copyText={starkProfile?.name || address || ""}
              buttonText={
                starkProfile?.name ||
                address?.slice(0, 12).concat("...").concat(address?.slice(-5))
              }
              className="flex items-center gap-2 text-sm text-yellow-primary"
              iconClassName="rounded-full bg-[--link-card] p-1 text-yellow-primary dark:bg-black"
            />
          </div>
          <div className="rounded-[12px] bg-[--modal-assets-bg] transition-colors duration-500 ease-linear">
            <AccountBalance address={address || ""} />
          </div>

          <div>
            <button
              onClick={(e) => {
                const popover = document.getElementById("user-popover");
                // @ts-ignore
                popover.hidePopover();
                disconnect();
              }}
              className="w-full rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--modal-disconnect-bg] p-3 text-red-secondary md:p-4"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

const AddressBar = () => {
  const { address } = useAccount();
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  const [imageError, setImageError] = useState(false);
  if (!address) {
    return null;
  }

  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    }
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        onClick={() => togglePopover({ targetId: "user-popover" })}
        className="rounded-full bg-button-tertiary px-2 py-1 text-accent-secondary md:px-4 md:py-2"
      >
        {
          <span className="flex items-center">
            {!imageError && starkProfile?.profilePicture ? (
              <img
                src={starkProfile.profilePicture}
                className="mr-2 h-8 w-8 rounded-full"
                alt="starknet profile"
                onError={() => {
                  setImageError(true);
                }}
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
      <UserModal />
    </>
  );
};

export default AddressBar;
