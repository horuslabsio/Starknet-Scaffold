"use client";
import Close from "public/svg/Close";
import GenericModal from "../components/internal/util/GenericModal";
import CopyButton from "../components/internal/util/CopyButton";

type Props = {
  handleConnect: () => void;
  isConnected: boolean;
  wallet: {
    privateKey: string;
    address: string;
    publicKey: string;
  };
};

function ConnectionModal({ handleConnect, wallet, isConnected }: Props) {
  return (
    <GenericModal
      popoverId={`burner-connect-popover`}
      style={`py-16 px-[5vw] md:p-16 bg-transparent`}
    >
      <div className="w-[90vw] max-w-[30rem] rounded-[24px] bg-[--background] px-4 py-8 text-[--headings] shadow-popover-shadow md:px-8 md:py-16 lg:max-w-[40rem]">
        <div className="mb-8 flex justify-between">
          <h3 className="text-l text-[--headings]">Connect Account</h3>
          <button
            // @ts-ignore
            popoverTarget={`burner-connect-popover`}
          >
            <Close />
          </button>
        </div>
        <div>
          <div className="mb-4">
            <div className="mb-4 flex items-center justify-between">
              <h4>Private Key</h4> <CopyButton copyText={wallet.privateKey} />
            </div>
            <div className="rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3">
              <p className="no-scroll w-full overflow-scroll text-center outline-none">
                {wallet.privateKey}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4>Account Address</h4>
              <CopyButton copyText={wallet.address} />
            </div>
            <div className="rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3">
              <p className="no-scroll w-full overflow-scroll text-center outline-none">
                {wallet.address}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={isConnected}
          className="mt-4 w-full rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 md:py-4"
          type="submit"
          onClick={handleConnect}
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </GenericModal>
  );
}

export default ConnectionModal;
