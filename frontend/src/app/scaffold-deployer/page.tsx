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
  const { account, status, isConnected } = useAccount();
  const [classHash, setClassHash] = useState("");
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

  const handleDeleteFile = (event: any) => {
    event.preventDefault();
    console.log("e: ", event);
    if (event.target.name == "casm") setSelectedCasm([]);
    if (event.target.name == "sierra") setSelectedSierra([]);
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

      let result;

      if (account && status == "connected") {
        await account.declare(payload);
      } else {
        throw new Error("Wallet not connected");
      }
      console.log("result: ", result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
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
    }
  };

  const disableButton = !isConnected || !account || classHash === "";
  return (
    <section className="relative w-full">
      <Header />
      <section className="flex justify-center gap-x-[25px] p-4 pt-[272px] text-[--headings]">
        <form action="" className="flex w-[670px] flex-col px-10 py-8">
          <h1 className="mb-8 w-full border-b-[1px] border-b-[--borders] pb-[18px] text-2xl text-[24px] leading-7">
            Declare
          </h1>
          {selectedSierra.length == 0 ? (
            <div>
              <h3 className="mb-2 text-[20px] leading-7">
                Contract Class (Sierra)
              </h3>
              <div
                className="flex w-full items-center justify-center gap-x-[13px] rounded-[8px] border-[1px] border-dashed border-[--borders] bg-[#F5F5F5] pb-6 pt-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <File />
                <div>
                  <h2 className="text-[18px] font-normal leading-[26px] text-text-primary">
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
                    className="mt-[-2px] text-lg font-medium text-[#FF7300] underline underline-offset-4"
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5 mt-3 flex w-[600px] items-center justify-between rounded-[20px] bg-white py-[16px] pl-8 pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[96px] w-[118px] justify-end">
                  <div className="font-satoshi absolute left-0 top-[40px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-2xl font-medium text-white">
                    {selectedSierra?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="" alt="file icon" />
                </div>
                <div>
                  <h3 className="mb-2 text-[22px] font-medium text-black">
                    {selectedSierra?.at(0)?.name.split(".")[0]}
                  </h3>
                </div>
              </div>
              <button onClick={handleDeleteFile} name="sierra">
                <Image src={trash} alt="trash icon" />
              </button>
            </div>
          )}

          {/*  */}
          {selectedCasm.length == 0 ? (
            <div className="mt-12 border-t-[1px] border-t-[--borders] pt-12">
              <h3 className="mb-2 text-[20px] leading-7">
                Compiled Contract Class (CASM)
              </h3>
              <div
                className="flex w-full items-center justify-center gap-x-[13px] rounded-[8px] border-[1px] border-dashed border-[--borders] bg-[#F5F5F5] pb-6 pt-6 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <File />
                <div>
                  <h2 className="text-[18px] font-normal leading-[26px] text-text-primary">
                    Upload Compiled Contract Class JSON File (CASM)
                  </h2>
                  <input
                    type="file"
                    name="sierra"
                    onChange={async (e) =>
                      await handleCompiledContractClassSelect(e)
                    }
                    multiple
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef?.current.click();
                    }}
                    className="mt-[-2px] text-lg font-medium text-[#FF7300] underline underline-offset-4"
                  >
                    Browse File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5 mt-3 flex w-[600px] items-center justify-between rounded-[20px] bg-white py-[16px] pl-8 pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[96px] w-[118px] justify-end">
                  <div className="font-satoshi absolute left-0 top-[40px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-2xl font-medium text-white">
                    {selectedCasm?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="" alt="file icon" />
                </div>
                <div>
                  <h3 className="mb-2 text-[22px] font-medium text-black">
                    {selectedCasm?.at(0)?.name.split(".")[0]}
                  </h3>
                </div>
              </div>
              <button onClick={handleDeleteFile} name="casm">
                <Image src={trash} alt="trash icon" />
              </button>
            </div>
          )}
          {contractClassHash && (
            <div>
              <p>Declared ClassHash</p>
              <input
                type="text"
                className="mb-6 mt-4 w-[600px] rounded p-3 text-black"
                value={contractClassHash}
                disabled
              />
            </div>
          )}
          <button
            onClick={(e) => handleDeclare(e)}
            className="mt-6 w-full rounded-[12px] bg-accent-secondary px-4 py-3 text-[20px] leading-[30px] text-[#fafafa]"
          >
            Declare
          </button>
        </form>
        <form
          onSubmit={handleDeploy}
          className="flex h-fit w-[517px] flex-col rounded-2xl border-[1px] border-[--borders] px-10 py-8"
        >
          <h1 className="mb-9 text-2xl text-[24px] leading-7">Deploy</h1>
          <div className="mb-8 flex flex-col gap-y-2 border-b-[1px] border-b-[--borders] pb-8 text-[20px] leading-6">
            <h2 className="font-normal">Class Hash</h2>
            <input
              type="text"
              className="w-full rounded border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-[14px] text-[#141925] placeholder:text-[#7A7A7A]"
              placeholder="Input Class Hash"
              onChange={(e) => {
                setClassHash(e.target.value);
              }}
              value={classHash}
            />
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-[20px] leading-6">
              Constructor Arguments
            </h2>
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-[1fr_auto] gap-x-4 text-[#141925]">
                <input
                  type="text"
                  value={argumentsList[0]}
                  placeholder={`Argument 1`}
                  className="w-full rounded-md border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-[14px] placeholder:text-[#7A7A7A]"
                  onChange={(event) => handleInputChange(0, event)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddArgument();
                  }}
                  disabled={argumentsList[0] === ""}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1px] border-[--borders] bg-[#F5F5F5] disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              {argumentsList
                .slice(1, argumentsList.length)
                .map((arg, index) => (
                  <div
                    className="grid grid-cols-[1fr_auto] gap-x-4 text-[#141925]"
                    key={index}
                  >
                    <input
                      type="text"
                      value={arg}
                      placeholder={`Argument ${index + 2}`}
                      className="w-full rounded-md border-[1px] border-[--borders] bg-[#F5F5F5] px-4 py-[14px] text-[#141925] placeholder:text-[#7A7A7A]"
                      onChange={(event) => handleInputChange(index + 1, event)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteArgument(index);
                      }}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1px] border-[--borders] bg-[#F5F5F5]"
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

          {deployedAddress && (
            <div>
              <p>Deployed Address</p>
              <input
                type="text"
                className="mb-6 mt-4 w-[600px] rounded p-3 text-black"
                value={deployedAddress}
                disabled
              />
            </div>
          )}

          <button
            type="submit"
            disabled={disableButton}
            className="w-full rounded-[12px] bg-accent-secondary px-4 py-3 text-[20px] leading-[30px] text-[#fafafa] disabled:cursor-not-allowed disabled:border-none disabled:bg-slate-300"
          >
            Deploy
          </button>
        </form>
      </section>
    </section>
  );
}
