"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNetwork } from "@starknet-react/core";
import { Button } from "@/app/components/ui_components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui_components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui_components/popover";
import { cn } from "@/app/components/ui_components/lib/utils";

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
          // variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[264px] flex justify-between rounded-[12px] bg-[#F0F0F0] border-[3px] border-[#EAEAEA] py-[14px] px-6 text-[#141925] text-2xl leading-9"
        >
          {selectedNetwork
            ? networks.find((network) => network.value === selectedNetwork)
                ?.label
            : "Select Network..."}
          <ChevronsUpDown className="h-8 w-8 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search network..." />
          <CommandEmpty>No network found.</CommandEmpty>
          <CommandGroup>
            {networks.map((network) => (
              <CommandItem
                key={network.value}
                value={network.value}
                onSelect={() => {
                  switchNetwork(network.value, network.label);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedNetwork === network.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {network.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default NetworkSwitcher;
