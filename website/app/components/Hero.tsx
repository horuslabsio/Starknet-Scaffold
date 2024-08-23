"use client";
import GithubIcon from "../svg/GithubIcon";
import CopyIcon from "../svg/CopyIcon";
import { Dispatch, SetStateAction, useState } from "react";
import CheckIcon from "../svg/CheckIcon";
import Link from "next/link";

const Hero = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const SCAFFOLD_REPO_URL =
    "https://github.com/argentlabs/Starknet-Scaffold.git";
  const CREATE_COMMAND = "npx create-starknet-app@latest";

  const copyToClipboard = async ({
    text,
    setCopied,
  }: {
    text: string;
    setCopied: Dispatch<SetStateAction<boolean>>;
  }) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopied(false);
    }
  };
  return (
    <section className="min-h-screen grid md:p-4">
      <div className="bg-hero-image  bg-cover bg-center w-full md:rounded-lg text-dark-font-color flex flex-col gap-4 justify-center items-center text-center p-4">
        <div className="mt-16 md:mt-0 lg:w-[55%] flex flex-col gap-4">
          <h1 className="font-bold">
            Everything you need to buidl dApps on Starknet
          </h1>
          <p className="lg:px-20">
            An open-source, up-to-date toolkit for building decentralized
            applications (dapps) on Starknet. Move from prototyping to
            production-grade apps seamlessly.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center overflow-hidden">
          <button
            style={{
              userSelect: "text",
            }}
            onClick={() => {
              copyToClipboard({
                text: SCAFFOLD_REPO_URL,
                setCopied: setCopiedUrl,
              });
            }}
            className="border-solid border-dark-font-color border-[2px] p-2 w-[90vw] max-w-[400px] md:w-fit rounded-full flex items-center   text-[.875em] gap-2 transition-all hover:bg-[#f98862]"
          >
            <span className="whitespace-nowrap  overflow-hidden text-ellipsis basis-[95%]">
              git clone https://github.com/argentlabs/Starknet-Scaffold.git
            </span>
            <span className=" grid grid-cols-1 grid-rows-1">
              <span
                className={`col-start-1 row-start-1 ${
                  copiedUrl ? "opacity-0" : "opacity-100"
                }`}
              >
                <CopyIcon />
              </span>
              <span
                className={`col-start-1 row-start-1 ${
                  copiedUrl ? "opacity-100" : "opacity-0"
                }`}
              >
                <CheckIcon />
              </span>
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
          <button
            style={{
              userSelect: "text",
            }}
            onClick={() => {
              copyToClipboard({
                text: CREATE_COMMAND,
                setCopied: setCopiedCommand,
              });
            }}
            className="border-solid border-dark-font-color border-[2px] p-2 rounded-full flex items-center text-[.875em] gap-2 w-[90vw] max-w-[200px] md:w-fit transition-all hover:bg-[#f98862]"
          >
            <span className="whitespace-nowrap  overflow-hidden text-ellipsis basis-[90%]">
              npx create-starknet-app@latest
            </span>
            <span className=" grid grid-cols-1 grid-rows-1">
              <span
                className={`col-start-1 row-start-1 ${
                  copiedCommand ? "opacity-0" : "opacity-100"
                }`}
              >
                <CopyIcon />
              </span>
              <span
                className={`col-start-1 row-start-1
              
                ${copiedCommand ? "opacity-100" : "opacity-0"}`}
              >
                <CheckIcon />
              </span>
            </span>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            target="_blank"
            href="https://app.starknetscaffold.xyz"
            className="border-solid h-[2.5rem] border-dark-font-color border-[2px] min-w-[6rem] px-2 py-1 rounded-[4px]  hover:bg-[#f98862]  hover:rounded-[20px] transition-all duration-400"
          >
            Try Online
          </Link>
          <Link
            target="_blank"
            href="https://docs.starknetscaffold.xyz"
            className="border-solid h-[2.5rem] border-dark-font-color border-[2px] min-w-[6rem] px-2 py-1 rounded-[4px]  hover:bg-[#f98862]  hover:rounded-[20px] transition-all duration-400"
          >
            Docs
          </Link>
          <Link
            target="_blank"
            href="https://github.com/argentlabs/Starknet-Scaffold"
            className="bg-dark-font-color h-[2.5rem] text-white min-w-[6rem] p-[.35rem] rounded-[4px] flex justify-center items-center hover:rounded-[20px] transition-all duration-400 "
          >
            <span>Github</span>
            <span>
              <GithubIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
