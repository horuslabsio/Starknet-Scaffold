"use client";
import Image from "next/image";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Connector, useConnect, useAccount } from "@starknet-react/core";
import { LibraryBig } from "lucide-react";
import TransactionModal from "./TransactionList/TransactionModal";
import GenericModal from "./GenericModal";

const loader = ({ src }: { src: string }) => {
  return src;
};

const Wallet = ({
  name,
  alt,
  src,
  connector,
}: {
  name: string;
  alt: string;
  src: string;
  connector: Connector;
}) => {
  const { connect } = useConnect();
  const isSvg = src?.startsWith("<svg");
  return (
    <button
      className="flex gap-4 items-center text-start p-[.2rem] hover:bg-outline-grey hover:rounded-[10px] transition-all cursor-pointer"
      onClick={() => connect({ connector })}
    >
      <div className="h-[2.2rem] w-[2.2rem] rounded-[5px]">
        {isSvg ? (
          <div
            className="h-full w-full object-cover rounded-[5px]"
            dangerouslySetInnerHTML={{ __html: src ?? "" }}
          />
        ) : (
          <Image
            alt={alt}
            loader={loader}
            src={src}
            width={70}
            height={70}
            className="h-full w-full object-cover rounded-[5px]"
          />
        )}
      </div>
      <p className="flex-1">{name}</p>
    </button>
  );
};

const ConnectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [animate, setAnimate] = useState(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);
  const { connectors } = useConnect();

  return (
    <GenericModal isOpen={isOpen} onClose={closeModal} animate={animate}>
      <div className="flex p-4 w-full lg:p-0 lg:grid lg:grid-cols-5">
        <div className="basis-5/6 lg:col-span-2  lg:border-r-[1px] lg:border-solid lg:border-outline-grey lg:py-4 lg:pl-8">
          <h2 className="text-center lg:text-start font-bold text-white text-[1.125em]">
            Connect a Wallet
          </h2>
        </div>
        <div className="ml-auto lg:col-span-3 lg:py-4 lg:pr-8">
          <button
            onClick={(e) => {
              closeModal(e);
              e.stopPropagation();
            }}
            className="w-8 h-8  grid place-content-center rounded-full bg-outline-grey  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between lg:grid lg:grid-cols-5 ">
        <div className="px-8  lg:h-full lg:col-span-2  lg:border-r-[1px] lg:border-solid lg:border-outline-grey">
          <h4 className="mb-[1rem] text-text-grey">Popular</h4>

          <div className="flex flex-col gap-4">
            {connectors.map((connector, index) => (
              <Wallet
                key={connector.id || index}
                src={connector.icon.light!}
                name={connector.name}
                connector={connector}
                alt="alt"
              />
            ))}
          </div>
        </div>
        <div className="p-4 border-t-[.5px] border-solid  border-red h-fit lg:h-full lg:border-none lg:col-span-3 lg:px-8 lg:py-0 lg:flex lg:flex-col">
          <h2 className="lg:text-center lg:mb-[3rem] lg:text-[1.125em]  font-bold">
            What is a wallet?
          </h2>
          <article className="hidden lg:flex  flex-col gap-8 place-content-center text-[0.875em] justify-self-center self-center ">
            <div className="grid grid-cols-10 items-center  gap-4">
              <div className="col-span-2 border-solid border-[2px] border-white rounded-[10px] h-[3rem] w-[3rem]">
                <Image
                  alt="text"
                  loader={loader}
                  src={
                    "https://media.istockphoto.com/id/1084096262/vector/concept-of-mobile-payments-wallet-connected-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=noILf6rTUyxN41JnmeFhUmqQWiCWoXlg0zCLtcrabD4="
                  }
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <div className="col-span-8 flex flex-col gap-2 ">
                <h4 className="text-[1.14em] font-bold">
                  A home for your digital assets
                </h4>
                <p className="text-text-grey">
                  Wallets are used to send, receive, store, and display digital
                  assets like Ethereum and NFTs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-10 items-center  gap-4">
              <div className="col-span-2 border-solid border-[2px] border-white rounded-[10px] h-[3rem] w-[3rem]">
                <Image
                  alt="text"
                  loader={loader}
                  src={
                    "https://media.licdn.com/dms/image/D4E12AQFyWdLwXcJu3Q/article-cover_image-shrink_720_1280/0/1687854784940?e=2147483647&v=beta&t=nNDH-9XEcVYcb1PAc3S78ndQze0126KPOSZmnmMERNg"
                  }
                  width={100}
                  height={100}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <div className="col-span-8 flex flex-col gap-2 ">
                <h4 className="text-[1.14em] font-bold">
                  A new way to sign-in
                </h4>
                <p className="text-text-grey">
                  Instead of creating new accounts and passwords on every
                  website, just connect your wallet.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </GenericModal>
  );
};

const Header = () => {
  const { address } = useAccount();
  const [openConectModal, setOpenConnectModal] = useState(false);
  const toggleModal = () => {
    setOpenConnectModal((prev) => !prev);
  };

  const [isTransactionModalOpen, setIsModalTransactionOpen] = useState(false);

  const handleOpenTransactionListClick = () => {
    setIsModalTransactionOpen(true);
  };

  const handleCloseTransactionListClick = () => {
    setIsModalTransactionOpen(false);
  };

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
    if (openConectModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openConectModal]);

  return (
    <>
      <header className="w-full fixed backdrop-blur-2xl dark:border-neutral-800 lg:bg-gray-200 lg:dark:bg-zinc-800/50 left-0 top-0 lg:p-4 z-10 flex justify-between py-4 px-8">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 40"
            width="200"
            height="40"
          >
            <text
              x="10"
              y="30"
              fontFamily="Cursive, sans-serif"
              fontSize="22"
              fill="white"
            >
              starknet-scaffold
            </text>
          </svg>
        </span>
        {address ? (
          <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
              {address?.slice(0, 5)}...{address?.slice(60, 66)}
            </button>
            <button
              className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={handleOpenTransactionListClick}
            >
              <LibraryBig className="h-full w-full" />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Connect
          </button>
        )}
      </header>
      <ConnectModal isOpen={openConectModal} onClose={toggleModal} />
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseTransactionListClick}
      />
    </>
  );
};

export default Header;
