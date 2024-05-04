import CopyIcon from "@/app/svg/CopyIcon";
import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";

const BurnerWallet = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-center gap-8">
      <div className="grid grid-cols-1 grid-rows-1" aria-hidden>
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

      {/* <div aria-hidden className="basis-1/2 ">
        <div className="bg-[#222222] text-[#B4B4B4] rounded-lg text-[.875em]">
          <div className="bg-[#2F2F2F] rounded-t-lg  p-4 flex items-center justify-between">
            <p>Starknet-scaffold</p>
            <div className="flex gap-4">
              <div className="flex items-center justify-center gap-2 bg-[#0F0F0F] rounded-[.3rem] w-[7em]  p-1 ">
                <span>Mainnet </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="48"
                      d="m112 184l144 144l144-144"
                    />
                  </svg>
                </span>
              </div>

              <div className="bg-[#FF6734] w-[10rem] p-1 rounded-full ">
                <p className="text-[#2F2F2F] text-center">0x07483....240ft45</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#2F2F2F] rounded-lg basis-[60%] p-4">
              <div className="bg-[#0F0F0F] rounded-lg w-full p-2 border-solid border-[#B4B4B4] border-[1px]">
                <p className="flex items-center justify-center gap-4">
                  <span>0x07483643a6fvgh546EYE240ft45</span>
                  <span className="bg-[#2f2f2f] p-1 rounded-full">
                    <CopyIcon />
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 bg-[#0F0F0F] p-4 rounded-lg">
                  <div className="text-[#BC988C] bg-[#2F2F2F] w-fit rounded-lg text-[.7em] px-1 py-[.2rem]">
                    ETH
                  </div>
                  <p className="text-[1.5em] mt-[.5rem]">0.0005 ETH</p>
                </div>
                <div className="w-1/2 bg-[#0F0F0F] p-4 rounded-lg">
                  <div className="text-[#BC988C] bg-[#2F2F2F] w-fit rounded-lg text-[.7em] px-1 py-[.2rem]">
                    STRK
                  </div>
                  <p className="text-[1.5em] mt-[.5rem]">125 STRK</p>
                </div>
              </div>
              <div className="flex">
                <div className="basis-1/3">Send</div>
                <div className="basis-1/3">Execute</div>
                <div className="basis-1/3">Connect</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BurnerWallet;
