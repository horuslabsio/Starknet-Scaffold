import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";
import Link from "next/link";

const Burner = () => {
  return (
    <Link
      href={"https://starknet-scaffold.vercel.app/burner"}
      target="_blank"
      className="flex flex-col md:flex-row-reverse md:items-center gap-8 group"
    >
      <div className="grid grid-cols-1 grid-rows-1 max-h-[400px]">
        <img
          src="/burner-wallet.svg"
          alt="Burner"
          className="col-start-1 row-start-1 dark-img"
        />
        <img
          src="/light-burner.svg"
          alt="Burner"
          className="col-start-1 row-start-1 rounded-[8px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <h2 className="flex items-center gap-2 font-semibold">
          <span>Burner wallet</span>
          <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-[.1rem]">
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          A simple tool for seamlessly deploying smart contracts to Starknet
          testnet and mainnet
        </p>
      </div>
    </Link>
  );
};

export default Burner;
