"use client";
import AddressBar, { UserModal } from "./AddressBar";
import { useEffect, useRef, useState } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
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
    // <>
    //   <header
    //     ref={dropdownRef}
    //     className="w-full fixed dark:bg-[#1f1f1e] bg-white left-0 top-0  z-10 flex flex-wrap py-2 px-4 md:pt-8 md:px-8 md:pb-3  justify-between "
    //   >
    //     <nav className="py-[30px] px-[68px] bg-primaryGradient w-full rounded-[32px] flex justify-between items-center">
    //       <Image src={logoImage} alt="logo" width={360} height={48} />
    //       <div className="overflow-hidden">
    // {address ? (
    //   <div className="flex justify-end">
    //     <AddressBar setOpenConnectedModal={setOpenConnectedModal} />
    //     <button
    //       className="mx-3 bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-full transition duration-300"
    //       onClick={handleOpenTransactionListClick}
    //     >
    //       <LibraryBig className="h-full w-full" />
    //     </button>
    //   </div>
    // ) : (
    //   <button
    //     onClick={toggleModal}
    //     className="bg-[#141925] hover:bg-[#141925] text-[#fafafa] text-2xl leading-9 py-3 px-8 rounded-[12px] transition duration-300"
    //   >
    //     Connect Wallet
    //   </button>
    // )}
    //       </div>
    //     </nav>
    //   </header>
    //   <div className="flex w-full justify-end pr-[68px] bg-transparent bg-opacity-0 fixed top-[200px]">
    // <ThemeSwitch
    //   className=""
    //   action={changeTheme}
    //   theme={theme}
    //   openMenu={openMenu}
    // />
    //   </div>

    //   <ConnectModal isOpen={openConnectModal} onClose={toggleModal} />
    //   <TransactionModal
    //     isOpen={isTransactionModalOpen}
    //     onClose={handleCloseTransactionListClick}
    //   />
    //   <UserModal
    //     openConnectedModal={openConnectedModal}
    //     closeConnectedModal={toggleUserModal}
    //     address={address ? address : ""}
    //   />
    // </>
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
                  <AddressBar setOpenConnectedModal={setOpenConnectedModal} />
                </button>
                <button
                  onClick={handleOpenTransactionListClick}
                  className="grid h-12 w-12 place-content-center rounded-full bg-accent-secondary text-[1.5em] text-background-primary-light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M10 5h10M4 12h16M4 19h10"
                      color="currentColor"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={toggleModal}
                className="rounded-[12px] bg-button-primary px-6 py-4 text-background-primary-light"
              >
                Connect Wallet
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
      </header>
    </div>
  );
};

export default Header;
