import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const Faucet = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 feature">
      <div
        className="md:p-4 grid grid-cols-1 grid-rows-1 feat-img-left"
        aria-hidden
      >
        <img
          src="/faucet.svg"
          alt=""
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-faucet.svg"
          alt=""
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <h2 className="flex items-center gap-2">
          <span>Scaffold Faucet</span>
          <span>
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          A SepETH/SepSTRK faucet for claiming ETH/STRK Sepolia testnet tokens
        </p>
      </div>
    </div>
  );
};

export default Faucet;
