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
      className="p-6 pb-[72px] bg-[#F7F7F7] font-coolvetica rounded-2xl relative hover:bg-[#FFEFEA] transition-all duration-200"
    >
      <div className="flex items-start gap-x-2 justify-between">
        <div className="flex gap-x-2">
          <div className="p-[5px] h-fit bg-[#FFD8CB] rounded-full">
            <Image alt="resource-logo" src={logo} />
          </div>
          <div className="w-[216px] text-wrap">
            <h3 className="text-xl leading-5 text-[#141925]">
              {resource.name}
            </h3>
            <h4 className="text-sm leading-4 text-[#FF6734] break-words w-[200px]">
              {resource.url}
            </h4>
          </div>
        </div>
        <Image src={arr} alt="redirect" />
      </div>
      <div className="mt-3 text-base leading-5 pl-[50px] text-[#7A7A7A] mb-7">
        {resource.description}
      </div>
      <div className="flex justify-end absolute bottom-6 right-6">
        <div className="py-[9px] px-2 bg-[#CDFFD2] gap-x-[5px] text-[#6A6A6A] rounded-full flex items-center">
          <Image src={verify} alt="verify" />
          UP TO DATE
        </div>
      </div>
    </Link>
  );
}
