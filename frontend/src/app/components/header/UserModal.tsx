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
import ThemeSwitch from "./Theme";
import useTheme from "../ui_components/hooks/useTheme";
import NetworkSwitcher from "../ui_components/NetworkSwitcher";
import Library from "svg/Library";

const UserModal = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { theme, changeTheme } = useTheme();

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
      style="mt-[5rem] w-full bg-transparent backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem]"
    >
      <div className="user-modal mx-auto flex h-[--modal-h] w-full max-w-[--header-max-w] flex-col items-center md:items-end md:px-12">
        <div className="zoom pt-8">
          <div className="mb-8 flex w-[95vw] max-w-[30rem] flex-col justify-between gap-4 rounded-[24px] bg-[--background] p-8 text-md text-text-primary shadow-popover-shadow transition-colors duration-500 ease-linear">
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
                onClick={handleCopyClick}
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
        <div className="zoom pb-8">
          <div className="flex w-[95vw] max-w-[30rem] flex-col gap-4 rounded-[24px] bg-[--background] p-8 shadow-popover-shadow transition-colors duration-500 ease-linear">
            <div className="flex items-center justify-between">
              <p className="text-text-primary">Select Network</p>
              <NetworkSwitcher />
            </div>
            <div>
              <button // @ts-ignore
                popoverTarget="transaction-modal"
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border-[2px] border-solid border-[--headings] p-4 text-[--headings]"
              >
                <span className="text-l">
                  <Library />
                </span>
                <span>Transaction History</span>
              </button>
            </div>
            <div>
              <button
                aria-haspopup="dialog"
                // @ts-ignore
                popoverTarget="add-token-popover"
                className="w-full rounded-[12px] bg-accent-secondary p-4 text-background-primary-light"
              >
                Add Token
              </button>
            </div>

            <div>
              <ThemeSwitch
                className="grid"
                action={changeTheme}
                theme={theme}
                dimension="3rem"
              />
            </div>
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

export default UserModal;
