import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const Connect = () => {
  return (
    <div className="flex  flex-col md:flex-row md:items-center gap-8">
      <div className="md:p-4 grid grid-cols-1 grid-rows-1" aria-hidden>
        <img
          src="/connect.svg"
          alt=""
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-connect.svg"
          alt=""
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <p className="text-[#BC988C] text-[.875em]">WALLET INTEROPERABILITY</p>
        <h2 className="flex items-center gap-2 font-semibold">
          <span>Connect Wallet</span>
          <span>
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          Starknet-scaffold supports transactions across all crypto wallets.
        </p>
      </div>
    </div>
  );
};

export default Connect;
