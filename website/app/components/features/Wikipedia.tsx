import UpRightArrowIcon from "@/app/svg/UpRightArrowIcon";
import Link from "next/link";

const Wikipedia = () => {
  return (
    <Link
      target="_blank"
      href={"https://app.starknetscaffold.xyz/wikipedia"}
      className="flex flex-col md:flex-row-reverse md:items-center gap-8 group"
    >
      <div
        className="md:p-4 grid grid-cols-1 grid-rows-1 max-h-[400px]"
        aria-hidden
      >
        <img
          src="/wikipedia.svg"
          alt="starknet scaffold wikipedia"
          className="col-start-1 row-start-1 rounded-[16px] dark-img"
        />
        <img
          src="/light-wikipedia.svg"
          alt="starknet scaffold wikipedia"
          className="col-start-1 row-start-1 rounded-[16px] light-img"
        />
      </div>
      <div className="px-2 md:px-8">
        <h2 className="flex items-center gap-2 font-semibold">
          <span>Scaffold Wikipedia</span>
          <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-[.1rem]">
            <UpRightArrowIcon />
          </span>
        </h2>
        <p className="text-[#BC988C]">
          A collection of Starknet/Cairo learning resources in the ecosystem{" "}
        </p>
      </div>
    </Link>
  );
};

export default Wikipedia;
