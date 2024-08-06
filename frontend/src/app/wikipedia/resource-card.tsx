"use client";
import Image from "next/image";
import logo from "../../../public/assets/starknetLogo.svg";
import arr from "../../../public/assets/linkArrow.svg";
import verify from "../../../public/assets/verified-icon.svg";
import Link from "next/link";

export default function ResourceCard({ resource }: { resource: any }) {
  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-2xl bg-[#F7F7F7] p-6 pb-[72px] font-coolvetica transition-all duration-200 hover:bg-[#FFEFEA]"
    >
      <div className="flex items-start justify-between gap-x-2">
        <div className="flex gap-x-2">
          <div className="h-fit rounded-full bg-[#FFD8CB] p-[5px]">
            <Image alt="resource-logo" src={logo} />
          </div>
          <div className="w-[216px] text-wrap">
            <h3 className="text-xl leading-5 text-[#141925]">
              {resource.name}
            </h3>
            <h4 className="w-[200px] break-words text-sm leading-4 text-[#FF6734]">
              {resource.url}
            </h4>
          </div>
        </div>
        <Image src={arr} alt="redirect" />
      </div>
      <div className="text-base mb-7 mt-3 pl-[50px] leading-5 text-[#7A7A7A]">
        {resource.description}
      </div>
      <div className="absolute bottom-6 right-6 flex justify-end">
        <div className="flex items-center gap-x-[5px] rounded-full bg-[#CDFFD2] px-2 py-[9px] text-[#6A6A6A]">
          <Image src={verify} alt="verify" />
          UP TO DATE
        </div>
      </div>
    </Link>
  );
}
