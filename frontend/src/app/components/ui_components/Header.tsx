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
import Image from "next/image";
import logoImage from "../../../../public/assets/logo.svg";

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
  }, [connectors, connect]);

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
        className="w-full fixed dark:bg-[#1f1f1e] bg-white left-0 top-0  z-10 flex flex-wrap py-2 px-4 md:pt-8 md:px-8 md:pb-3  justify-between "
      >
        <nav className="py-[30px] px-[68px] bg-primaryGradient w-full rounded-[32px] flex justify-between items-center">
          <Image src={logoImage} alt="logo" width={360} height={48} />
          <div className="overflow-hidden">
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
                className="bg-[#141925] hover:bg-[#141925] text-[#fafafa] text-2xl leading-9 py-3 px-8 rounded-[12px] transition duration-300"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </nav>
      </header>
      <div className="flex w-full justify-end pr-[68px] bg-transparent bg-opacity-0 fixed top-[200px]">
        <ThemeSwitch
          className=""
          action={changeTheme}
          theme={theme}
          openMenu={openMenu}
        />
      </div>

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

{
  /* <header
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

    <NetworkSwitcher />
    <AddTokenBtn />

    <ThemeSwitch
      className="flex md:hidden lg:hidden sm:hidden dark:transform-none transform dark:translate-none transition-all duration-500 ease-in-out"
      action={changeTheme}
      theme={theme}
      openMenu={openMenu}
    />
  </div>

  <div className="flex items-center md:hidden gap-8">
    <ThemeSwitch
      className="flex md:hidden dark:transform-none transform dark:translate-none transition-all duration-500 ease-in-out"
      action={changeTheme}
      theme={theme}
      openMenu={openMenu}
    />

    <button
      title="toggle menu"
      onClick={toggleMenu}
      className="flex flex-col gap-2 md:hidden"
    >
      <div
        className={`w-[1.5em] h-[2px] ${
          theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
        } rounded-full transition-all duration-300 ease-in-out ${
          openMenu
            ? "rotate-45 translate-y-[0.625em]"
            : "rotate-0 translate-y-0"
        }`}
      ></div>
      <div
        className={`w-[1.5em] h-[2px] ${
          theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
        } rounded-full transition-all duration-300 ease-in-out ${
          openMenu ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-[1.5em] h-[2px] ${
          theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
        } rounded-full transition-all duration-300 ease-in-out ${
          openMenu
            ? "-rotate-45 translate-y-[-0.625em]"
            : "rotate-0 translate-y-0"
        }`}
      ></div>
    </button>
  </div>

  <div
    className={`w-screen  transition-all duration-300 ease-in-out grid ${
      openMenu
        ? "min-h-[4rem] grid-rows-[1fr]  opacity-100"
        : "grid-rows-[0fr]  opacity-0"
    }  md:hidden`}
  >
    <div className="overflow-hidden">
      <div className="flex flex-wrap gap-8">
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
            className="bg-primary hover:bg-primary text-white py-2 px-4 rounded-full transition duration-300"
          >
            Connect
          </button>
        )}

        <NetworkSwitcher />
      </div>
    </div>
  </div>
</header>; */
}
