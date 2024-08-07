"use client";
import { useEffect } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
import TransactionModal from "../TransactionList/TransactionModal";
import useTheme from "../ui_components/hooks/useTheme";
import ConnectModal from "../ui_components/ConnectModal";
import Menu from "svg/Menu";
import UserModal from "./UserModal";
import AddressBar from "./AddressBar";
import ThemeSwitch from "./Theme";

const Header = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const lastUsedConnector = localStorage.getItem("lastUsedConnector");
    if (lastUsedConnector) {
      connect({
        connector: connectors.find(
          (connector) => connector.name === lastUsedConnector,
        ),
      });
    }
  }, [connectors, connect]);

  const { theme, changeTheme } = useTheme();

  return (
    <div className="fixed z-[9999] w-full px-8 pt-8">
      <header className="rounded-[32px] bg-primary-gradient">
        <div className="mx-auto flex h-[7rem] max-w-[2000px] items-center justify-between px-8">
          <div className="w-[18.75rem]">
            <img src="/assets/logo.svg" alt="logo" className="h-full w-full" />
          </div>
          <div className="relative">
            {address ? (
              <div className="flex items-center gap-4">
                <button className="rounded-full bg-button-tertiary text-accent-secondary">
                  <AddressBar />
                </button>
                <button
                  aria-haspopup="dialog"
                  popoverTarget="transaction-modal"
                  className="grid h-12 w-12 place-content-center rounded-full bg-accent-secondary text-[1.5em] text-background-primary-light"
                >
                  <Menu />
                </button>
              </div>
            ) : (
              <button
                aria-haspopup="dialog"
                popoverTarget="connect-modal"
                className="rounded-[12px] bg-button-primary px-6 py-4 text-background-primary-light"
              >
                Connect Wallet
              </button>
            )}

            <ThemeSwitch
              className="absolute bottom-[-250%] left-1/2"
              action={changeTheme}
              theme={theme}
            />
          </div>
        </div>
        <ConnectModal />
        <TransactionModal />
        <UserModal />
      </header>
    </div>
  );
};

export default Header;
