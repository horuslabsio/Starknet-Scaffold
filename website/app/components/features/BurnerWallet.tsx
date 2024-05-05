import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const BurnerWallet = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-center gap-8 feature">
      <div className="grid grid-cols-1 grid-rows-1 feat-img-right" aria-hidden>
        <img
          src="/burner-wallet.svg"
          alt=""
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-burner.svg"
          alt=""
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <h2 className="flex items-center gap-2 font-semibold">
          <span>Scaffold Deployer</span>
          <span>
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          Generate temporary wallets which can be used during the course of
          development
        </p>
      </div>
    </div>
  );
};

export default BurnerWallet;
