"use client";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import Blockies from "react-blockies";

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
          document.body.style.overflow = "";
        }
      });
    }
  };

  return (
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
  );
};

export default AddressBar;