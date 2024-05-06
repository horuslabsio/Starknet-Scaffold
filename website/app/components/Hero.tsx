"use client";
import GithubIcon from "../svg/GithubIcon";
import CopyIcon from "../svg/CopyIcon";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import CheckIcon from "../svg/CheckIcon";

const Hero = () => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const urlRef = useRef(null);
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
    <section className="h-screen p-4 ">
      <div className="bg-hero-image bg-cover w-full h-full rounded-lg text-dark-font-color flex flex-col gap-4 justify-center items-center text-center p-4">
        <div className="lg:w-[55%] flex flex-col gap-4">
          <h1 className="font-bold">
            Everything you need to buidl dApps on Starknet
          </h1>
          <p className="lg:px-20">
          An open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet. Move from prototyping to production-grade apps seamlessly.
          </p>
        </div>
        <div className="flex flex-col gap-4 items-center">
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
            className="border-solid border-dark-font-color border-[2px] p-2 rounded-full flex items-center  w-fit text-[.875em] gap-2 transition-all hover:bg-[#f98862]"
          >
            <span>
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
            className="border-solid border-dark-font-color border-[2px] p-2 rounded-full flex items-center text-[.875em] gap-2 w-fit transition-all hover:bg-[#f98862]"
          >
            <span>npx create-starknet-app@latest</span>
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
        <div className="flex gap-4">
          <a href="https://starknet-scaffold.vercel.app/">
            <button className="border-solid border-dark-font-color border-[2px] min-w-[6rem] px-2 py-1 rounded-[4px]  hover:bg-[#f98862]  hover:rounded-[20px] transition-all duration-400">
              Try Online
            </button>
          </a>
          <a href="https://github.com/argentlabs/Starknet-Scaffold">
            <button className="bg-dark-font-color text-white min-w-[6rem] p-[.35rem] rounded-[4px] flex justify-center items-center hover:rounded-[20px] transition-all duration-400 ">
              <span>Github</span>
              <span>
                <GithubIcon />
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
