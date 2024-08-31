"use client";
import * as React from "react";
import { useNetwork } from "@starknet-react/core";
import Check from "public/svg/Check";
import ChevronDown from "public/svg/ChevronDown";

const NETWORK_MAPPING: { [key: string]: string } = {
  mainnet: "SN_MAIN",
  sepolia: "SN_SEPOLIA",
};

const networks = [
  {
    value: "SN_MAIN",
    label: "Mainnet",
  },
  {
    value: "SN_SEPOLIA",
    label: "Sepolia",
  },
];

export default function NetworkSwitcher() {
  const { chain } = useNetwork();
  const [open, setOpen] = React.useState(false);
  const [selectedNetwork, setSelectedNetwork] = React.useState(
    NETWORK_MAPPING[chain.network],
  );

  const switchNetwork = async (newNetworkId: string, networkLabel: string) => {
    try {
      await window?.starknet?.request({
        type: "wallet_switchStarknetChain",
        params: { chainId: newNetworkId },
      });

      console.log(`Switched to network ${networkLabel}`);
      setSelectedNetwork(newNetworkId);
    } catch (error) {
      console.error("Failed to switch networks:", error);
    }
  };

  // Update selectedNetwork when chain.network changes
  React.useEffect(() => {
    setSelectedNetwork(NETWORK_MAPPING[chain.network]);
  }, [chain.network]);

  return (
    <div className="relative flex w-[50%] max-w-[12rem] flex-col gap-y-3 text-[--headings] transition-all duration-500">
      <button
        role="combobox"
        aria-expanded={open}
        aria-controls="network-listbox"
        className="flex cursor-pointer items-center justify-between rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <span>
          {selectedNetwork
            ? networks.find((network) => network.value === selectedNetwork)
                ?.label
            : "Select Network..."}
        </span>
        <span
          className={`${open ? "-rotate-180" : ""} transition-all duration-500`}
        >
          <ChevronDown />
        </span>
      </button>
      <div
        id="network-listbox"
        role="listbox"
        className={`absolute left-[60%] top-[65px] z-[10] grid w-full -translate-x-1/2 overflow-hidden rounded-xl transition-all duration-300 ease-in-out md:left-0 md:w-[250px] md:translate-x-0 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--link-card]">
            {networks.map((network) => (
              <button
                className="flex w-full cursor-pointer items-center rounded-xl px-4 py-3"
                key={network.value}
                value={network.value}
                role="option"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  switchNetwork(network.value, network.label);
                  setOpen(false);
                }}
              >
                <span
                  className={`mr-2 text-md ${selectedNetwork === network.value ? "opacity-100" : "opacity-0"}`}
                >
                  <Check />
                </span>
                <span>{network.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
