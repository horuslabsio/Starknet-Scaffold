"use client";
import cloudUploadIcon from "../../../../public/assets/cloudUploadIcon.svg";
import fileIcon from "../../../../public/assets/fileIcon.svg";
import trash from "../../../../public/assets/deleteIcon.svg";
import { useRef, useState } from "react";
import Header from "../ui_components/Header";
import Image from "next/image";
import {
  DeclareContractPayload,
  hash,
  CallData,
  UniversalDeployerContractPayload,
  CompiledSierraCasm,
} from "starknet";
import { useAccount } from "@starknet-react/core";

interface FileList {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

function ScaffoldDeployer() {
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
    <div className="dark:text-white text-black flex flex-col">
      <Header />
      <div className="flex flex-col items-center p-4 pt-20">
        <form action="" className="flex flex-col">
          <h1 className="text-2xl font-bold">Declare</h1>

          {/*  */}
          {selectedSierra.length == 0 ? (
            <div
              className="bg-white mb-5 mt-3 flex w-[600px] flex-col items-center rounded-[5px] border-[1px] border-dashed border-[#333] pb-[90px] pt-[90px] text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Image src={cloudUploadIcon} className="mb-10" alt="" />
              <h2 className="text-black mb-2 text-[22px] font-normal">
                Input Contract Class JSON file (Sierra)
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
                className="border-dark132 font-satoshi text-lg text-black rounded-lg border-[1px] border-solid px-[57px] py-[16px] font-medium"
              >
                Browse File
              </button>
            </div>
          ) : (
            <div className="bg-white mb-5 mt-3 flex w-[600px] items-center justify-between rounded-[20px] py-[16px] pl-8 pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[96px] w-[118px] justify-end">
                  <div className="font-satoshi text-white absolute left-0 top-[40px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-2xl font-medium">
                    {selectedSierra?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="" alt="file icon" />
                </div>
                <div>
                  <h3 className="text-black mb-2 text-[22px] font-medium">
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
            <div
              className="bg-white mb-5 mt-3 flex w-[600px] flex-col items-center rounded-[5px] border-[1px] border-dashed border-[#333] pb-[90px] pt-[90px] text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Image src={cloudUploadIcon} className="mb-10" alt="" />
              <h2 className="text-black mb-2 text-[22px] font-normal">
                Input Compiled Contract Class JSON file (CASM)
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
                className="border-dark132 font-satoshi text-lg text-black rounded-lg border-[1px] border-solid px-[57px] py-[16px] font-medium"
              >
                Browse File
              </button>
            </div>
          ) : (
            <div className="bg-white mb-5 mt-3 flex w-[600px] items-center justify-between rounded-[20px] py-[16px] pl-8 pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[96px] w-[118px] justify-end">
                  <div className="font-satoshi text-white absolute left-0 top-[40px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center text-2xl font-medium">
                    {selectedCasm?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="" alt="file icon" />
                </div>
                <div>
                  <h3 className="text-black mb-2 text-[22px] font-medium">
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
                className="text-black mb-6 mt-4 w-[600px] rounded p-3"
                value={contractClassHash}
                disabled
              />
            </div>
          )}
          <button
            onClick={(e) => handleDeclare(e)}
            className="bg-primary text-white w-[200px] rounded-[5px] px-4 py-3"
          >
            Declare
          </button>
        </form>
        <form onSubmit={handleDeploy} className="mt-12 flex flex-col">
          <h1 className="text-2xl font-bold">Deploy</h1>
          <input
            type="text"
            className="text-black mb-6 mt-4 w-[600px] rounded p-3"
            placeholder="Input Class Hash"
            onChange={(e) => {
              setClassHash(e.target.value);
            }}
            value={classHash}
          />
          <div className="mb-4">
            <h2 className="text-lg mb-2 font-bold">Constructor Arguments</h2>
            <div className="flex flex-col gap-y-3">
              {argumentsList.map((arg, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <h4 className="text-base w-[120px] font-medium">
                    Argument {index + 1}
                  </h4>
                  <input
                    type="text"
                    value={arg}
                    className="w-full rounded-md px-6 py-2 text-[#333]"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
              ))}
              {argumentError === "" && (
                <h6 className="text-red-600 text-sm">{argumentError}</h6>
              )}
            </div>
          </div>

          {deployedAddress && (
            <div>
              <p>Deployed Address</p>
              <input
                type="text"
                className="text-black mb-6 mt-4 w-[600px] rounded p-3"
                value={deployedAddress}
                disabled
              />
            </div>
          )}

          <div className="flex items-center gap-x-5">
            <button
              type="button"
              onClick={handleAddArgument}
              disabled={argumentsList[argumentsList.length - 1] === ""}
              className="bg-secondary text-white disabled:bg-slate-300 w-[250px] rounded-[5px] px-4 py-3 disabled:cursor-not-allowed"
            >
              Add argument
            </button>
            <button
              type="submit"
              disabled={disableButton}
              className="bg-primary text-white disabled:bg-slate-300 w-[200px] rounded-[5px] px-4 py-3 disabled:cursor-not-allowed"
            >
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScaffoldDeployer;
