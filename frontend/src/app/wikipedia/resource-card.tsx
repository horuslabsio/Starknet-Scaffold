"use client";
import Image from "next/image";
import logo from "../../../public/assets/strk.svg";
import Link from "next/link";
import Upright from "svg/Upright";
import Verified from "svg/Verified";

export default function ResourceCard({ resource }: { resource: any }) {
  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl bg-[--link-card] p-6 pb-[72px] transition-all duration-500 hover:bg-button-secondary"
    >
      <div className="flex items-start justify-between gap-x-2">
        <div className="flex gap-x-2">
          <div className="h-fit rounded-[12px] bg-[#FFD8CB] p-[5px]">
            <Image alt="resource-logo" src={logo} />
          </div>
          <div className="text-wrap">
            <h3 className="mb-2 text-md text-[--headings] group-hover:text-accent-secondary">
              {resource.name}
            </h3>
            <p className="w-full break-words text-sm text-text-links underline">
              {resource.url}
            </p>
          </div>
        </div>
        <span className="text-[--headings] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent-secondary">
          <Upright />
        </span>
      </div>
      <div className="mb-7 mt-3 pl-[50px] text-base leading-5 text-[#7A7A7A]">
        {resource.description}
      </div>
      <div className="absolute bottom-6 right-6 flex justify-end">
        <div className="flex items-center gap-x-[5px] rounded-full bg-green-primary p-3 text-sm">
          <span className="rounded-full bg-background-primary-light text-green-secondary">
            <Verified />
          </span>
          UP TO DATE
        </div>
      </div>
    </Link>
  );
}
