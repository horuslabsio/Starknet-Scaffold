"use client";
import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useNetwork } from "@starknet-react/core";

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

export function NetworkSwitcher() {
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex h-12 w-[50%] max-w-[12rem] cursor-pointer items-center justify-between rounded-[12px] border-[2px] border-solid border-[--borders] bg-[--link-card] px-4 text-[--headings]"
        >
          <span>
            {selectedNetwork
              ? networks.find((network) => network.value === selectedNetwork)
                  ?.label
              : "Select Network..."}
          </span>
          <span>
            <ChevronDown />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-background-primary-light p-0">
        <Command>
          <CommandInput placeholder="Search network..." />
          <CommandEmpty>No network found.</CommandEmpty>
          <CommandGroup>
            {networks.map((network) => (
              <button
                className="flex w-full cursor-pointer items-center rounded-xl px-4 py-3"
                key={network.value}
                value={network.value}
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
      {/* <div
        className={` ${open ? "inline-block h-fit" : "hidden h-0 overflow-hidden"} absolute left-0 top-[75px] z-[10] mx-auto flex w-[250px] flex-col overflow-hidden rounded-xl border-[2px] border-solid border-[--borders] bg-[--link-card] transition-all duration-500`}
      >
        {networks.map((network) => (
          <button
            className="flex w-full cursor-pointer items-center px-4 py-3"
            key={network.value}
            value={network.value}
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
      </div> */}
    </div>
  );
}

export default NetworkSwitcher;
