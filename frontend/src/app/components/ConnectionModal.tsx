"use client";
import Close from "svg/Close";
import CopyButton from "./ui_components/CopyButton";
import GenericModal from "./ui_components/GenericModal";

type Props = {
  handleConnect: () => void;
  popoverId: string;
  isConnected: boolean;
  wallet: {
    privateKey: string;
    address: string;
    publicKey: string;
  };
};

function ConnectionModal({
  handleConnect,
  wallet,
  popoverId,
  isConnected,
}: Props) {
  return (
    <GenericModal
      popoverId={`burner-connect-popover-${popoverId}`}
      style={`p-16 bg-transparent`}
    >
      <div className="max-w-[40rem] rounded-[24px] bg-[--background] px-8 py-16 text-[--headings] shadow-popover-shadow">
        <div className="mb-8 flex justify-between">
          <h3 className="text-l text-[--headings]">Connect Account</h3>
          <button
            // @ts-ignore
            popoverTarget={`burner-connect-popover-${popoverId}`}
          >
            <Close />
          </button>
        </div>
        <div>
          <div className="mb-4">
            <div className="mb-4 flex items-center justify-between">
              <h4>Private Key</h4> <CopyButton data={wallet.privateKey} />
            </div>
            <p className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 text-center outline-none">
              {wallet.privateKey}
            </p>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4>Account Address</h4>
              <CopyButton data={wallet.address} />
            </div>
            <p className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 text-center outline-none">
              {wallet.address}
            </p>
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
