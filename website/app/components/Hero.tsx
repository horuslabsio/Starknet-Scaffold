import GithubIcon from "../svg/GithubIcon";
import CopyIcon from "../svg/CopyIcon";

const Hero = () => {
  return (
    <section className="h-screen p-4 ">
      <div className="bg-hero-image bg-cover w-full h-full rounded-lg text-dark-font-color flex flex-col gap-4 justify-center items-center text-center p-4">
        <div className="lg:w-[55%] flex flex-col gap-4">
          <h1 className="font-bold">
            Everything you need to buidl dApps on Ethereum
          </h1>
          <p className="lg:px-20">
            A modern clean veersion of Starknet-Scaffold with NextJS,
            Rainbowkit, Wagmi and Typescript. Supports Hardhat and Foundry
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button className="border-solid border-dark-font-color border-[2px] p-2 rounded-full flex items-center w-fit text-[.875em] gap-2">
            <span>
              git clone https://github.com/scaffold-eth/scaffold-eth-2.git
            </span>
            <span>
              <CopyIcon />
            </span>
          </button>
          <div className="w-full flex items-center gap-4">
            <div
              aria-hidden
              className="h-[1px] w-full bg-dark-font-color"
            ></div>
            <p className="font-bold">OR</p>
            <div
              aria-hidden
              className="h-[1px] w-full bg-dark-font-color"
            ></div>
          </div>
          <button className="border-solid border-dark-font-color border-[2px] p-2 rounded-full flex items-center text-[.875em] gap-2 w-fit">
            <span>npx create-eth@latest</span>
            <span>
              <CopyIcon />
            </span>
          </button>
        </div>
        <div className="flex gap-4">
          <button className="border-solid border-dark-font-color border-[2px] min-w-[6rem] px-2 py-1 rounded-[4px]">
            Docs
          </button>
          <button className="bg-dark-font-color text-white min-w-[6rem] p-[.35rem] rounded-[4px] flex justify-center items-center">
            <span>Github</span>
            <span>
              <GithubIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
