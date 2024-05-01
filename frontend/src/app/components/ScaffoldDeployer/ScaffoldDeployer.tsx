"use client";
import cloudUploadIcon from "../../../../public/assets/cloudUploadIcon.svg";
import fileIcon from "../../../../public/assets/fileIcon.svg";
import trash from "../../../../public/assets/deleteIcon.svg";
import { useRef, useState } from "react";
import Header from "../Header";
import Image from "next/image";
import { UniversalDeployerContractPayload, provider , CallData} from "starknet";
import { useAccount,useProvider } from "@starknet-react/core";

// import { deploy } from "@/app/services/wallet.service";

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
  const [selectedFiles, setSelectedFiles] = useState<FileList[]>([]);
  const [classHash, setClassHash] = useState("");
  const [constructorArguments, setContructorArguments] = useState("");

  const { account, isConnected } = useAccount();
  const provider = useProvider();

  const handleFileSelect = (event: any) => {
    event.preventDefault();
    console.log("file upload");
    const files: any = Array.from(event.target.files);
    setSelectedFiles(files);
    console.log(event.target.files);
    console.log(selectedFiles);
  };

  const handleDeleteFile = (event: any) => {
    event.preventDefault();
    setSelectedFiles([]);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const files: any = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
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
      // if(constructorArguments === ("" || null)){

      // }else {

      // }
       const payload: UniversalDeployerContractPayload = {
         classHash: classHash,
       };
       const result = await account.deployContract(payload);
       console.log(
         result.contract_address,
         "Contract Address of The Smart Contract"
       );
    } catch (e) {
      // throw new Error("Connect wallet to continue", e);
      console.error("DEPLOYER ERROR", e);
    }
  };
  const disableButton = !isConnected || !account || classHash === "";
  // console.log(account?.deployContract(), "Results of the Deployed Class Hash");
  // provider.
  return (
    <div className="flex flex-col dark:text-white text-black">
      <Header />
      <div className="flex items-center flex-col p-4 pt-20">
        <form action="" className="flex flex-col">
          <h1 className="text-2xl font-bold">Declare</h1>
          {selectedFiles.length == 0 ? (
            <div
              className=" flex w-[600px] flex-col items-center rounded-[5px] border-[1px]  border-dashed border-[#333] bg-white pb-[90px] mb-5 mt-3 pt-[90px] text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Image src={cloudUploadIcon} className="mb-10" alt="" />
              <h2 className="mb-2  text-[22px] font-normal text-black">
                Input Contract JSON RPC File
              </h2>
              <input
                type="file"
                onChange={(e) => handleFileSelect(e)}
                multiple
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef?.current.click();
                }}
                className="rounded-lg border-[1px] border-solid border-dark132 px-[57px] py-[16px] font-satoshi text-lg font-medium text-black"
              >
                Browse File
              </button>
            </div>
          ) : (
            <div className="bg-white flex items-center w-[600px] justify-between rounded-[20px] mt-3 mb-5 py-[16px] pl-8 pr-[52px]">
              <div className="flex items-center">
                <div className="relative flex h-[96px] w-[118px] justify-end">
                  <div className="absolute left-0 top-[40px] z-20 min-w-[70px] rounded-lg bg-[#2ECC71] px-[4.5px] py-[1.5px] text-center font-satoshi text-2xl font-medium text-white">
                    {selectedFiles?.at(0)?.name?.split(".")[1].toUpperCase()}
                  </div>
                  <Image src={fileIcon} className="" alt="file icon" />
                </div>
                <div>
                  <h3 className="mb-2 text-[22px] font-medium text-black">
                    {selectedFiles?.at(0)?.name.split(".")[0]}
                  </h3>
                </div>
              </div>
              <button onClick={handleDeleteFile}>
                <Image src={trash} alt="trash icon" />
              </button>
            </div>
          )}
          <button className="bg-blue-500 py-3 px-4 rounded-[5px] w-[200px] text-white">
            Declare
          </button>
        </form>
        <form onSubmit={handleDeploy} className="flex flex-col mt-12">
          <h1 className="text-2xl font-bold">Deploy</h1>
          <input
            type="text"
            className="mt-4 mb-6 text-black p-3 rounded w-[600px]"
            placeholder="Input Class Hash"
            onChange={(e) => {
              setClassHash(e.target.value);
            }}
            value={classHash}
          />
          {/* <input
            type="text"
            className="mt-4 mb-6 text-black p-3 rounded w-[600px]"
            placeholder="Input Constructor Arguments(optional)"
            onChange={(e) => {
              setContructorArguments(e.target.value);
            }}
            value={constructorArguments}
          /> */}
          {/* <input
            type="text"
            className="mt-4 mb-6 text-black p-3 rounded w-[600px]"
            placeholder="Input Number of Constructor Arguments"
          /> */}
          <button
            type="submit"
            disabled={disableButton}
            className="bg-blue-500 py-3 px-4 rounded-[5px] w-[200px] text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Deploy
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScaffoldDeployer;
