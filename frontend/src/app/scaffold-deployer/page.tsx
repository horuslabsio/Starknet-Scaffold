"use client";
import cloudUploadIcon from "../../../public/assets/cloudUploadIcon.svg";
import fileIcon from "../../../public/assets/fileIcon.svg";
import trash from "../../../public/assets/deleteIcon.svg";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  DeclareContractPayload,
  hash,
  CallData,
  UniversalDeployerContractPayload,
  CompiledSierraCasm,
} from "starknet";
import { useAccount } from "@starknet-react/core";
import File from "svg/File";
import Header from "../components/ui_components/header/Header";
import Loading from "../components/ui_components/util/Loading";
import { Divide } from "lucide-react";
import CopyButton from "../components/ui_components/util/CopyButton";
import Close from "svg/Close";

interface FileList {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export default function Page() {
  const fileInputRef: any = useRef(null);
  const casmRef: any = useRef(null);
  const [selectedSierra, setSelectedSierra] = useState<FileList[]>([]);
  const [selectedCasm, setSelectedCasm] = useState<FileList[]>([]);
  const [contract, setContract] = useState<string | null>(null);
  const [casm, setCasm] = useState<CompiledSierraCasm | null>(null);
  const [contractClassHash, setContractClassHash] = useState("");
  const [contractClassHashIsVisible, setContractClassHashIsVisible] =
    useState(false);
  const { account, status, isConnected } = useAccount();
  const [classHash, setClassHash] = useState("");
  const [isDeclaring, setIsDeclaring] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [argumentsList, setArgumentsList] = useState([""]);
  const [argumentError, setArgumentError] = useState("");

  const handleInputChange = (index: number, event: any) => {
    const newArgumentsList = [...argumentsList];
    newArgumentsList[index] = event.target.value;
    setArgumentsList(newArgumentsList);
  };

  const handleAddArgument = () => {
    if (argumentsList[argumentsList.length - 1] === "") {
      setArgumentError(
        "Input an argument value in the previous field before adding another!",
      );
      return;
    }
    setArgumentsList([...argumentsList, ""]);
  };

  const handleDeleteArgument = (index: number) => {
    let list = argumentsList.filter((cur, i) => index !== i);
    setArgumentsList([...list]);
  };

  const handleContractClassSelect = async (event: any) => {
    event.preventDefault();
    const files: any = Array.from(event.target.files);
    setSelectedSierra(files);

    if (!event.target.files) return;

    const fileAsString = files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target?.result as string;

      if (!fileContent) return;
      setContract(fileContent);

      const contractClassHash = hash.computeContractClassHash(fileContent);
      setContractClassHash(contractClassHash);
    };
    reader.readAsText(fileAsString); // Read file as text
  };

  const handleCompiledContractClassSelect = async (event: any) => {
    event.preventDefault();
    const files: any = Array.from(event.target.files);
    setSelectedCasm(files);

    if (!event.target.files) return;

    const fileAsString = files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target?.result as string;

      if (!fileContent) return;
      setCasm(JSON.parse(fileContent));
    };
    reader.readAsText(fileAsString); // Read file as text
  };

  const handleDeleteFile = (event: any, name: string) => {
    event.preventDefault();
    console.log("e: ", event);
    if (name == "casm") setSelectedCasm([]);
    if (name == "sierra") setSelectedSierra([]);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const files: any = Array.from(event.dataTransfer.files);
  };

  const handleDeclare = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsDeclaring(true);
      if (!isConnected || !account) {
        throw new Error("Connect wallet to continue");
      }

      if (!contract) {
        throw new Error("No Sierra");
      }

      if (!casm) {
        throw new Error("No CASM");
      }
      const payload: DeclareContractPayload = {
        contract: contract,
        classHash: contractClassHash,
      };

      if (casm) {
        payload.casm = casm;
        delete payload.classHash;
      }

      let result = await account.declare(payload);
      setContractClassHashIsVisible(true);
      console.log("result: ", result);
      setIsDeclaring(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSelectedCasm([]);
      setSelectedSierra([]);
      setIsDeclaring(false);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsDeploying(true);
      if (!classHash) {
        throw new Error("No class hash");
      }
      if (!isConnected || !account) {
        throw new Error("Connect wallet to continue");
      }
      const contractConstructor = CallData.compile(
        argumentsList.filter((arg) => arg !== ""),
      );
      const payload: UniversalDeployerContractPayload = {
        classHash: classHash,
        constructorCalldata: contractConstructor,
      };
      const result = await account.deployContract(payload);
      console.log(
        result.contract_address,
        "Contract Address of The Smart Contract",
      );
      setDeployedAddress(result.contract_address);
    } catch (e) {
      console.error("DEPLOYER ERROR", e);
    } finally {
      setClassHash("");
      setArgumentsList([""]);
      setIsDeploying(false);
    }
  };

  const disableButton = !isConnected || !account || classHash === "";
  return (
    <section className="relative w-full">
      <Header />
      <section className="flex w-full flex-col justify-center gap-x-[25px] p-4 pt-[100px] text-[--headings] md:flex-row md:pt-[272px]">
        <form
          action=""
          className="flex w-full flex-col px-6 py-8 md:w-[670px] md:px-10"
        >
          <h1 className="mb-4 w-full border-b-[1px] border-b-[--borders] pb-[18px] text-[18px] md:mb-8 md:text-[24px] md:leading-7">
            Declare
          </h1>
          {!selectedSierra.length ? (
            <div>
              <h3 className="mb-2 text-sm leading-7 md:text-[20px]">
                Contract Class (Sierra)
              </h3>
              <div
                className="flex w-full items-center justify-center gap-x-[13px] rounded-[8px] border-[1px] border-dashed border-[--borders] bg-[#F5F5F5] px-3 py-3 text-center md:py-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <File />
                <div>
                  <h2 className="text-sm font-normal text-text-primary md:text-lg md:leading-[26px]">
                    Upload Contract Class JSON File (Sierra)
                  </h2>
                  <input
                    type="file"
                    name="sierra"
                    onChange={async (e) => await handleContractClassSelect(e)}
                    multiple
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef?.current.click();
                    }}
                    className="mt-[-2px] text-sm font-medium text-[#FF7300] underline underline-offset-4 md:text-lg"
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-between rounded-[20px] bg-[#F5F5F5] px-3 py-4 md:py-[16px] md:pl-8 md:pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[70px] w-[50px] justify-end md:h-[96px] md:w-[118px]">
                  <div className="font-satoshi absolute left-[20px] top-[38px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-[10px] font-medium text-white md:left-[60px] md:top-[60px] md:text-[15px]">
                    {selectedSierra?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="h-full" alt="file icon" />
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium text-text-primary md:text-[20px]">
                    {selectedSierra?.at(0)?.name.split(".")[0]}
                  </h3>
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteFile(e, "sierra")}
                className="h-5 w-5"
              >
                <Image src={trash} alt="trash icon" />
              </button>
            </div>
          )}

          {/*  */}
          {selectedCasm.length == 0 ? (
            <div className="mt-6 border-t-[1px] border-t-[--borders] pt-4 md:mt-12 md:pt-12">
              <h3 className="mb-2 text-sm leading-7 md:text-[20px]">
                Compiled Contract Class (CASM)
              </h3>
              <div
                className="flex w-full items-center justify-center gap-x-[13px] rounded-[8px] border-[1px] border-dashed border-[--borders] bg-[#F5F5F5] p-3 text-center md:py-6"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <File />
                <div>
                  <h2 className="text-sm font-normal text-text-primary md:text-lg md:leading-[26px]">
                    Upload Compiled Contract Class JSON File (CASM)
                  </h2>
                  <input
                    type="file"
                    name="casm"
                    onChange={async (e) =>
                      await handleCompiledContractClassSelect(e)
                    }
                    multiple
                    style={{ display: "none" }}
                    ref={casmRef}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      casmRef?.current.click();
                    }}
                    className="mt-[-2px] text-sm font-medium text-[#FF7300] underline underline-offset-4 md:text-lg"
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 border-t-[1px] border-t-[--borders] pt-12">
              <div className="flex items-center justify-between rounded-[20px] bg-[#f5f5f5] px-3 py-4 md:py-[16px] md:pl-8 md:pr-[52px]">
                <div className="flex items-center">
                  <div className="relative flex h-[70px] w-[50px] justify-end md:h-[96px] md:w-[118px]">
                    <div className="font-satoshi absolute left-[20px] top-[38px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-[10px] font-medium text-white md:left-[60px] md:top-[60px] md:text-[15px]">
                      {selectedCasm?.at(0)?.name?.split(".")[1].toUpperCase()}
                    </div>
                    <Image src={fileIcon} className="h-full" alt="file icon" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-text-primary md:text-[20px]">
                      {selectedCasm?.at(0)?.name.split(".")[0]}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteFile(e, "casm")}
                  className="h-5 w-5"
                >
                  <Image src={trash} alt="trash icon" />
                </button>
              </div>
            </div>
          )}
          {contractClassHashIsVisible ? (
            <div className="flex flex-col gap-y-1 rounded-[12px] border-[1px] border-[--borders] bg-transparent px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[20px] leading-6">Declared ClassHash</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setContractClassHash("");
                  }}
                >
                  <Close />
                </button>
              </div>
              <div className="flex items-center justify-start gap-x-3">
                <div className="truncate rounded p-1 text-[15px]">
                  {contractClassHash
                    .slice(0, 20)
                    .concat("...")
                    .concat(contractClassHash.slice(-10))}
                </div>

                <CopyButton copyText={contractClassHash} />
              </div>
            </div>
          ) : (
            <button
              onClick={handleDeclare}
              disabled={!casm || !contract || isDeclaring}
              className="mt-6 flex w-full items-center justify-center gap-x-4 rounded-[12px] bg-accent-secondary px-4 py-2 text-base text-[#fafafa] disabled:cursor-not-allowed disabled:bg-opacity-[0.5] md:py-3 md:text-[20px] md:leading-[30px]"
            >
              {isDeclaring && <Loading dimension="h-5 w-5" />} Declare
            </button>
          )}
        </form>
        <form
          onSubmit={handleDeploy}
          className="flex h-fit w-full flex-col rounded-2xl border-[1px] border-[--borders] px-5 py-4 md:w-[517px] md:px-10 md:py-8"
        >
          <h1 className="mb-4 text-lg md:mb-9 md:text-[24px] md:leading-7">
            Deploy
          </h1>
          <div className="mb-4 flex flex-col gap-y-2 border-b-[1px] border-b-[--borders] pb-4 text-sm md:mb-8 md:pb-8 md:text-[20px] md:leading-6">
            <h2 className="font-normal">Class Hash</h2>
            <input
              type="text"
              className="w-full rounded border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-3 text-[#141925] placeholder:text-[#7A7A7A] md:py-[14px]"
              placeholder="Input Class Hash"
              onChange={(e) => {
                setClassHash(e.target.value);
              }}
              value={classHash}
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-sm md:text-[20px] md:leading-6">
              Constructor Arguments
            </h2>
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 text-[#141925] md:gap-x-4">
                <input
                  type="text"
                  value={argumentsList[0]}
                  placeholder={`Argument 1`}
                  className="w-full rounded-md border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-3 placeholder:text-[#7A7A7A] md:py-[14px]"
                  onChange={(event) => handleInputChange(0, event)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddArgument();
                  }}
                  disabled={argumentsList[0] === ""}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-[--borders] bg-[#F5F5F5] disabled:cursor-not-allowed md:h-12 md:w-12"
                >
                  +
                </button>
              </div>
              {argumentsList
                .slice(1, argumentsList.length)
                .map((arg, index) => (
                  <div
                    className="grid grid-cols-[1fr_auto] items-center gap-x-2 text-[#141925] md:gap-x-4"
                    key={index}
                  >
                    <input
                      type="text"
                      value={arg}
                      placeholder={`Argument ${index + 2}`}
                      className="w-full rounded-md border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-3 text-[#141925] placeholder:text-[#7A7A7A] md:py-[14px]"
                      onChange={(event) => handleInputChange(index + 1, event)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteArgument(index);
                      }}
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-[--borders] bg-[#F5F5F5] md:h-12 md:w-12"
                    >
                      x
                    </button>
                  </div>
                ))}
              {argumentError === "" && (
                <h6 className="text-sm text-red-600">{argumentError}</h6>
              )}
            </div>
          </div>

          {deployedAddress ? (
            <div className="flex flex-col gap-y-1 rounded-[12px] border-[1px] border-[--borders] bg-transparent px-4 py-2 md:py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm leading-6 md:text-[20px]">
                  Deployed Address
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDeployedAddress("");
                  }}
                >
                  <Close />
                </button>
              </div>
              <div className="flex items-center justify-start gap-x-2 md:gap-x-3">
                <div className="truncate rounded p-1 text-[13px] md:text-[15px]">
                  {deployedAddress
                    .slice(0, 20)
                    .concat("...")
                    .concat(deployedAddress.slice(-10))}
                </div>

                <CopyButton copyText={deployedAddress} />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              disabled={disableButton || isDeploying}
              className="flex w-full items-center justify-center gap-4 rounded-[12px] bg-accent-secondary px-4 py-2 text-base text-[#fafafa] disabled:cursor-not-allowed disabled:border-none disabled:bg-opacity-[0.5] md:py-3 md:text-[20px] md:leading-[30px]"
            >
              {isDeploying && <Loading dimension="h-5 w-5" />} Deploy
            </button>
          )}
        </form>
      </section>
    </section>
  );
}
