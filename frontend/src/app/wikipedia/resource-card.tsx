"use client";
import Image from "next/image";
import logo from "../../../public/assets/strk.svg";
import Link from "next/link";
import Upright from "public/svg/Upright";
import Verified from "public/svg/Verified";

export default function ResourceCard({ resource }: { resource: any }) {
  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full rounded-2xl bg-[--link-card] px-6 py-4 pb-[72px] transition-all duration-500 md:p-6 md:pb-[72px] md:hover:bg-button-secondary"
    >
      <div className="flex items-start justify-between gap-x-2">
        <div className="flex gap-x-2">
          <div className="h-fit rounded-[12px] bg-[#FFD8CB] p-[5px]">
            <Image
              alt="resource-logo"
              src={logo}
              className="h-[30px] w-[30px]"
            />
          </div>
          <div className="max-w-[218px] text-wrap">
            <h3 className="text-md text-[--headings] md:mb-2 md:group-hover:text-accent-secondary">
              {resource.name}
            </h3>
            <p className="truncate text-sm text-text-links underline">
              {resource.url}
            </p>
          </div>
        </div>
        <span className="text-[--headings] transition-all duration-500 md:group-hover:-translate-y-1 md:group-hover:text-accent-secondary">
          <Upright />
        </span>
      </div>
      <div className="mb-3 mt-3 pl-[50px] text-[13px] leading-4 text-text-primary md:mb-7 md:text-base md:leading-5">
        {resource.description}
      </div>
      <div className="absolute bottom-4 right-5 flex justify-end md:bottom-6 md:right-6">
        <div className="flex items-center gap-x-[3px] rounded-full bg-green-primary p-2 text-sm md:gap-x-[5px] md:p-3">
          <span className="rounded-full bg-background-primary-light text-green-secondary">
            <Verified />
          </span>
          UP TO DATE
        </div>
      </div>
    </Link>
  );
}
