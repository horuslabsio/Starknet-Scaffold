import Image from "next/image";
import { Connector, useConnect } from "@starknet-react/core";
import Close from "public/svg/Close";
import GenericModal from "../internal/util/GenericModal";

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

  function handleConnectWallet(e: React.MouseEvent<HTMLButtonElement>): void {
    connect({ connector });
    const popover = document.getElementById("connect-modal");
    //@ts-ignore
    popover?.hidePopover();
    localStorage.setItem("lastUsedConnector", connector.name);
  }

  return (
    <button
      className="hover:bg-outline-grey flex cursor-pointer items-center gap-4 p-[.2rem] text-start transition-all hover:rounded-[10px]"
      onClick={(e) => handleConnectWallet(e)}
    >
      <div className="h-[2.2rem] w-[2.2rem] rounded-[5px]">
        {isSvg ? (
          <div
            className="h-full w-full rounded-[5px] object-cover"
            dangerouslySetInnerHTML={{
              __html: src ?? "",
            }}
          />
        ) : (
          <Image
            alt={alt}
            loader={loader}
            unoptimized
            src={src}
            width={70}
            height={70}
            className="h-full w-full rounded-[5px] object-cover"
          />
        )}
      </div>
      <p className="flex-1">{name}</p>
    </button>
  );
};

const ConnectModal = () => {
  const { connectors } = useConnect();
  return (
    <GenericModal
      popoverId="connect-modal"
      style="text-white border-outline-grey mx-auto w-[90vw] rounded-[25px] border-[1px] border-solid bg-[#1c1b1f] md:h-[30rem] md:w-[45rem]"
    >
      <div className="flex flex-col">
        <div className="flex w-full p-4 lg:grid lg:grid-cols-5 lg:p-0">
          <div className="lg:border-outline-grey basis-5/6 lg:col-span-2 lg:border-r-[1px] lg:border-solid lg:py-4 lg:pl-8">
            <h2 className="my-4 text-center text-[1.125em] font-bold text-white lg:text-start">
              Connect a Wallet
            </h2>
          </div>
          <div className="ml-auto lg:col-span-3 lg:py-4 lg:pr-8">
            <button
              //@ts-ignore
              popovertarget="connect-modal"
              popovertargetaction="hide"
              className="bg-outline-grey grid h-8 w-8 place-content-center rounded-full"
            >
              <Close />
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between lg:grid lg:grid-cols-5">
          <div className="lg:border-outline-grey px-8 lg:col-span-2 lg:h-full lg:border-r-[1px] lg:border-solid">
            <h4 className="text-text-grey mb-[1rem] font-semibold">Popular</h4>

            <div className="flex flex-col gap-4 py-8">
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
          <div className="border-red h-fit border-t-[.5px] border-solid p-4 lg:col-span-3 lg:flex lg:h-full lg:flex-col lg:border-none lg:px-8 lg:py-0">
            <h2 className="font-bold lg:mb-[3rem] lg:text-center lg:text-[1.125em]">
              What is a wallet?
            </h2>
            <article className="hidden flex-col place-content-center gap-8 self-center justify-self-center text-[0.875em] lg:flex">
              <div className="grid grid-cols-10 items-center gap-4">
                <div className="col-span-2 h-[3rem] w-[3rem] rounded-[10px] border-[2px] border-solid border-white">
                  <Image
                    alt="text"
                    loader={loader}
                    unoptimized
                    src={
                      "https://media.istockphoto.com/id/1084096262/vector/concept-of-mobile-payments-wallet-connected-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=noILf6rTUyxN41JnmeFhUmqQWiCWoXlg0zCLtcrabD4="
                    }
                    width={100}
                    height={100}
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                </div>
                <div className="col-span-8 flex flex-col gap-2">
                  <h4 className="text-[1.14em] font-bold">
                    A home for your digital assets
                  </h4>
                  <p className="text-text-grey">
                    Wallets are used to send, receive, store, and display
                    digital assets like Ethereum and NFTs.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-10 items-center gap-4">
                <div className="col-span-2 h-[3rem] w-[3rem] rounded-[10px] border-[2px] border-solid border-white">
                  <Image
                    alt="text"
                    loader={loader}
                    unoptimized
                    src={
                      "https://media.istockphoto.com/id/1084096262/vector/concept-of-mobile-payments-wallet-connected-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=noILf6rTUyxN41JnmeFhUmqQWiCWoXlg0zCLtcrabD4="
                    }
                    width={100}
                    height={100}
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                </div>
                <div className="col-span-8 flex flex-col gap-2">
                  <h4 className="text-[1.14em] font-bold">
                    A new way to sign-in
                  </h4>
                  <p className="text-text-grey pb-2">
                    Instead of creating new accounts and passwords on every
                    website, just connect your wallet.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

const ConnectButton = ({
  text = " Connect Wallet",
  className = "rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] md:py-4",
}: {
  text?: string;
  className?: string;
}) => {
  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    }
  };
  return (
    <>
      <button
        aria-haspopup="dialog"
        onClick={() => togglePopover({ targetId: "connect-modal" })}
        className={className}
      >
        {text}
      </button>
      <ConnectModal />
    </>
  );
};

export default ConnectButton;
