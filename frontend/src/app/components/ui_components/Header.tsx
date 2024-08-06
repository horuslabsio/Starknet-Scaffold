"use client";
import AddressBar, { UserModal } from "./AddressBar";
import { useEffect, useRef, useState } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
import { LibraryBig } from "lucide-react";
import TransactionModal from "../TransactionList/TransactionModal";
import useTheme from "./hooks/useTheme";
import ThemeSwitch from "./Theme";
import NetworkSwitcher from "./NetworkSwitcher";
import ConnectModal from "./ConnectModal";
import AddTokenBtn from "../AddTokenBtn";

const Header = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openConnectedModal, setOpenConnectedModal] = useState(false);
  const [isTransactionModalOpen, setIsModalTransactionOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleModal = () => {
    setOpenConnectModal((prev) => !prev);
  };

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const toggleUserModal = () => {
    setOpenConnectedModal((prev) => !prev);
  };

  const handleOpenTransactionListClick = () => {
    setIsModalTransactionOpen(true);
  };

  const handleCloseTransactionListClick = () => {
    setIsModalTransactionOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, []);

  useEffect(() => {
    const lastUsedConnector = localStorage.getItem("lastUsedConnector");
    if (lastUsedConnector) {
      connect({
        connector: connectors.find(
          (connector) => connector.name === lastUsedConnector,
        ),
      });
    }
  }, [connectors]);

  useEffect(() => {
    if (openConnectModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openConnectModal]);

  const { theme, changeTheme } = useTheme();

  return (
    <>
      <header
        ref={dropdownRef}
        className="w-full fixed backdrop-blur-2xl dark:border-neutral-800 lg:bg-gray-200 lg:dark:bg-zinc-800/50 left-0 top-0  z-10 flex flex-wrap gap-4 py-2 px-4 md:py-4 md:px-10  justify-between items-center"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 40"
            width="200"
            height="40"
            className="md:text-[1.2em]"
          >
            <text
              x="10"
              y="30"
              fontFamily="Cursive, sans-serif"
              fill={`${theme === "dark" ? "white" : "black"}`}
            >
              starknet-scaffold
            </text>
          </svg>
        </span>

        <div className="hidden md:flex gap-8">
          {address ? (
            <div className="flex justify-end">
              <AddressBar setOpenConnectedModal={setOpenConnectedModal} />
              <button
                className="mx-3 bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition duration-300"
                onClick={handleOpenTransactionListClick}
              >
                <LibraryBig className="h-full w-full" />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleModal}
              className="hidden md:block bg-primary hover:bg-primary text-white  py-2 px-4 rounded-full transition duration-300"
            >
              Connect
            </button>
          )}

            <ThemeSwitch
              className="absolute bottom-[-250%] left-1/2"
              action={changeTheme}
              theme={theme}
              openMenu={openMenu}
            />
          </div>
        </div>
      </header>

      <ConnectModal isOpen={openConnectModal} onClose={toggleModal} />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseTransactionListClick}
      />
      <UserModal
        openConnectedModal={openConnectedModal}
        closeConnectedModal={toggleUserModal}
        address={address ? address : ""}
      />
    </>
  );
};

export default Header;
