"use client";
import GenericModal from "./ui_components/GenericModal";
import { useState } from "react";
import { Call } from "starknet";
import toast from "react-hot-toast";
import Close from "svg/Close";
import WarnBadge from "svg/WarnBadge";
import Verified from "svg/Verified";

interface Errors {
  contractAddress?: boolean;
  functionName?: boolean;
  callData?: boolean;
}

type Props = {
  account: any;
  popoverId: string;
};

function ContractExecutionModal({ account, popoverId }: Props) {
  // Form Data
  const [contractAddress, setContractAddress] = useState<string>("");
  const [functionName, setFunctionName] = useState<string>("");
  const [callData, setCallData] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    contractAddress: true,
    functionName: false,
    callData: true,
  });

  const [executeStatus, setExecuteStatus] = useState<
    "execute" | "executing" | "executed" | "failed"
  >("executed");

  function isValidStringArrayString(str: string): boolean {
    try {
      const arr = JSON.parse(str);
      if (!Array.isArray(arr)) return false;
      return arr.every((item: any) => typeof item === "string");
    } catch (error) {
      return false;
    }
  }

  const setContractAddressValue = (value: string) => {
    setContractAddress(value);

    const regex = /^0x([a-fA-F0-9]{62}|[a-fA-F0-9]{63}|[a-fA-F0-9]{64})$/g;

    if (regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contractAddress: false,
      }));
    } else
      setErrors((prevErrors) => ({
        ...prevErrors,
        contractAddress: true,
      }));
  };

  const setFunctionNameValue = (value: string) => {
    setFunctionName(value);

    if (value.length !== 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        functionName: false,
      }));
    } else
      setErrors((prevErrors) => ({
        ...prevErrors,
        functionName: true,
      }));
  };

  const setCallDataValue = (value: string) => {
    setCallData(value);

    if (isValidStringArrayString(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        callData: false,
      }));
    } else
      setErrors((prevErrors) => ({
        ...prevErrors,
        callData: true,
      }));
  };

  async function handleExecute() {
    let success = false;
    try {
      if (
        !contractAddress.length ||
        !functionName.length ||
        !isValidStringArrayString(callData)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          functionName: true,
        }));
        return;
      }
      setExecuteStatus("executed");

      const call: Call = {
        contractAddress: contractAddress,
        calldata: JSON.parse(callData),
        entrypoint: functionName,
      };
      const { suggestedMaxFee: maxFee } = await account.estimateInvokeFee({
        contractAddress: contractAddress,
        entrypoint: functionName,
        calldata: JSON.parse(callData),
      });

      const { transaction_hash: transferTxHash } = await account.execute(call, {
        maxFee,
      });
      const transactionReponse =
        await account.waitForTransaction(transferTxHash);

      console.log(transactionReponse);
      toast.success("Your contract function was executed successfully!", {
        duration: 2000,
      });
      success = true;
      setExecuteStatus("executed");
    } catch (err: any) {
      setExecuteStatus("failed");
      toast.error("An error occured! Please try again.", { duration: 2000 });
      console.log(err.message);
    }
  }

  return (
    <GenericModal
      popoverId={`burner-execute-popover-${popoverId}`}
      style={`p-16 bg-transparent`}
    >
      {/* FEEDBACK UI --> */}
      <div
        className={`absolute top-0 flex h-[3rem] w-[95vw] max-w-[30rem] items-center justify-center rounded-[12px] bg-[--background] transition-all ${executeStatus === "failed" || executeStatus === "executed" ? "" : "-translate-y-full scale-75"}`}
      >
        {executeStatus === "failed" && (
          <p className="flex items-center justify-center gap-2 text-red-secondary">
            <span className="text-l">
              <WarnBadge />
            </span>
            <span>
              Your contract function was not executed, please try again
            </span>
          </p>
        )}
        {executeStatus === "executed" && (
          <p className="flex items-center justify-center gap-2 text-green-secondary">
            <span className="text-l">
              <Verified />
            </span>
            <span>Your contract function was executed successfully!</span>
          </p>
        )}
      </div>
      {/* <-- */}

      <div className="w-[95vw] max-w-[30rem] rounded-[24px] bg-[--background] p-8 text-[--headings] shadow-popover-shadow">
        <div className="mb-8 flex justify-between">
          <h3 className="text-l text-[--headings]">Execute Contract</h3>
          <button
            // @ts-ignore
            popoverTarget={`burner-execute-popover-${popoverId}`}
            onClick={() => {
              setExecuteStatus("execute");
              setCallData("");
              setContractAddress("");
              setFunctionName("");
            }}
          >
            <Close />
          </button>
        </div>

        <form className="flex flex-col gap-4" action="">
          <label htmlFor="contractAddress">Contract Address</label>
          <input
            id="contractAddress"
            type="text"
            placeholder="Enter Contract Address"
            className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 outline-none"
            value={contractAddress}
            onChange={(e) => setContractAddressValue(e.target.value)}
          />
          {errors?.contractAddress && contractAddress.length !== 0 && (
            <p className="text-sm text-red-500">
              Please enter a valid contract address
            </p>
          )}

          <label htmlFor="function">Function Name</label>
          <input
            id="function"
            type="text"
            placeholder="Enter Function Name"
            className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 outline-none"
            value={functionName}
            onChange={(e) => setFunctionNameValue(e.target.value)}
          />
          {errors?.functionName && (
            <p className="text-sm text-red-500">Please enter a function name</p>
          )}

          <label htmlFor="value">Arguments (array format)</label>
          <input
            id="value"
            type="text"
            placeholder={`["value1", "value2", "value3", ... , "value(n)"]`}
            className="w-full rounded-[8px] border-[2px] border-solid border-[--borders] bg-[--link-card] p-3 outline-none"
            value={callData}
            onChange={(e) => setCallDataValue(e.target.value)}
          />
          {errors?.callData && callData.length !== 0 && (
            <p className="text-sm text-red-500">
              Please enter valid arguments in correct format
            </p>
          )}

          <button
            className="w-full rounded-[12px] bg-button-primary px-6 py-3 text-background-primary-light transition-all duration-300 hover:rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 md:py-4"
            disabled={
              errors?.callData ||
              errors?.contractAddress ||
              errors?.functionName
            }
            onClick={async (e) => {
              e.preventDefault();
              await handleExecute();
            }}
          >
            {executeStatus === "executing" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-[1.2rem] w-[1.2rem] animate-spin rounded-full border-[2px] border-background-primary-light border-b-transparent"></span>
                <span>Executing</span>
              </span>
            ) : executeStatus === "executed" ? (
              <span>Executed</span>
            ) : (
              <span>Execute</span>
            )}
          </button>
        </form>
      </div>
    </GenericModal>
  );
}

export default ContractExecutionModal;
