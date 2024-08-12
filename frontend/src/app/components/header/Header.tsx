"use client";
import { useEffect, useRef } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
import TransactionModal from "../TransactionList/TransactionModal";
import useTheme from "../ui_components/hooks/useTheme";
import ConnectModal from "../ui_components/ConnectModal";
import Menu from "svg/Menu";
import UserModal from "./UserModal";
import AddressBar from "./AddressBar";
import ThemeSwitch from "./ThemeSwitch";
import AddTokenModal from "./AddTokenModal";

const Header = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { theme, changeTheme } = useTheme();
  const lastYRef = useRef(0);

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

  useEffect(() => {
    const nav = document.getElementById("nav");

    const handleScroll = () => {
      const difference = window.scrollY - lastYRef.current;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          nav?.setAttribute("data-header", "scroll-hide");
        } else {
          nav?.setAttribute("data-header", "scroll-show");
        }
        lastYRef.current = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div
      onMouseEnter={(e) => {
        if (e.currentTarget.getAttribute("data-header") === "scroll-hide") {
          e.currentTarget.setAttribute("data-header", "hover-show");
        }
      }}
      onMouseLeave={(e) => {
        if (e.currentTarget.getAttribute("data-header") === "hover-show") {
          e.currentTarget.setAttribute("data-header", "hover-hide");
        }
      }}
      onFocusCapture={(e) =>
        e.currentTarget.setAttribute("data-header", "scroll-show")
      }
      id="nav"
      className="fixed z-[9999] w-full px-2 pt-4 transition-all duration-500 md:px-8 md:pt-8"
    >
      <header className="rounded-[12px] bg-primary-gradient md:rounded-[32px]">
        <div className="mx-auto flex h-16 max-w-[--header-max-w] items-center justify-between px-4 md:h-28 md:px-8">
          <div className="hidden w-[18.75rem] md:block">
            <img src="/assets/logo.svg" alt="logo" className="h-full w-full" />
          </div>

          <div className="block md:hidden">
            <img src="/assets/mobile-logo.svg" alt="" />
          </div>
          <div className="relative">
            {address ? (
              <div className="flex items-center gap-4">
                <AddressBar />
                <button
                  aria-haspopup="dialog"
                  onClick={() =>
                    togglePopover({ targetId: "transaction-modal" })
                  }
                  className="grid h-10 w-10 place-content-center rounded-full bg-accent-secondary text-[1.5em] text-background-primary-light md:h-12 md:w-12"
                >
                  <Menu />
                </button>
              </div>
            ) : (
              <button
                aria-haspopup="dialog"
                onClick={() => togglePopover({ targetId: "connect-modal" })}
                className="rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] md:py-4"
              >
                Connect Wallet
              </button>
            )}

            <ThemeSwitch
              className="absolute bottom-[-200%] left-3/4 md:left-1/2 md:grid lg:bottom-[-250%]"
              dimension="w-[3rem] h-[3rem] md:w-[3.5rem] md:h-[3.5rem] lg:w-[4rem] lg:h-[4rem]"
              action={changeTheme}
              theme={theme}
            />
          </div>
        </div>
        <ConnectModal />
        <TransactionModal />
        <UserModal />
        <AddTokenModal />
      </header>
    </div>
  );
};

export default Header;
