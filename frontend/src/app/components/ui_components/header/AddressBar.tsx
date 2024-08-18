"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";
import Blockies from "react-blockies";
import AccountBalance from "../AccountBalance";
import Copy from "svg/Copy";
import GenericModal from "../GenericModal";
import Close from "svg/Close";
import { useEffect, useState } from "react";
import { handleCopyClick } from "@/app/utils/copy";

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

  return (
    <GenericModal
      popoverId="user-popover"
      style="mt-[5rem] w-full bg-transparent backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem] h-screen"
    >
      <div className="user-modal mx-auto flex w-full max-w-[--header-max-w] flex-col items-center py-8 md:items-end md:px-12">
        <div className="flex w-[95vw] max-w-[30rem] flex-col justify-between gap-4 rounded-[24px] bg-[--background] p-8 text-md text-text-primary shadow-popover-shadow transition-colors duration-500 ease-linear">
          <div className="flex justify-between">
            <h3 className="text-l text-[--headings]">Connected</h3>
            <button
              // @ts-ignore
              popoverTarget="user-popover"
            >
              <Close />
            </button>
          </div>

          <div className="mx-auto">
            <div className="mx-auto mb-4 h-24 w-24 overflow-clip rounded-full">
              {starkProfile?.profilePicture ? (
                <img
                  src={starkProfile?.profilePicture}
                  className="w-full rounded-full"
                  alt="starknet profile"
                />
              ) : (
                <Blockies
                  seed={address || ""}
                  scale={12}
                  className="mx-auto h-full w-full rounded-full"
                />
              )}
            </div>
            <button
              onClick={() =>
                handleCopyClick({
                  text: starkProfile?.name || address || "",
                  setIsCopied: setIsCopied,
                })
              }
              className="flex items-center gap-2 text-sm text-yellow-primary"
            >
              <span>
                {starkProfile?.name ||
                  address
                    ?.slice(0, 12)
                    .concat("...")
                    .concat(address?.slice(-5))}
              </span>
              <span className="rounded-full bg-accent-tertiary p-1">
                <Copy />
              </span>
            </button>
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
              className="w-full rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--modal-disconnect-bg] p-4 text-red-secondary"
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
      <UserModal />
    </>
  );
};

export default AddressBar;
