"use client";
import GenericModal from "./ui_components/GenericModal";
import Image from "next/image";
import rightArr from "../../../public/assets/right-arr.svg";
import { useEffect, useState } from "react";
import { Call } from "starknet";
import spinner from "../../../public/assets/spinner.svg";
import toast from "react-hot-toast";

interface Errors {
  contractAddress?: boolean;
  functionName?: boolean;
  callData?: boolean;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  account: any;
};

function ContractExecutionModal({ isOpen, onClose, account }: Props) {
  // Form Data
  const [contractAddress, setContractAddress] = useState<string>("");
  const [functionName, setFunctionName] = useState<string>("");
  const [callData, setCallData] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    contractAddress: true,
    functionName: false,
    callData: true,
  });

  // useState Variables
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

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

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

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

      setLoading(true);

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
    } catch (err: any) {
      toast.error("An error occured! Please try again.", { duration: 2000 });
      console.log(err.message);
    } finally {
      setLoading(false);
      if (success)
        setTimeout(() => {
          onClose();
        }, 400);
    }
  }

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={closeModal}
      animate={animate}
      className={`w-[90vw] mx-auto md:h-fit md:w-[45rem] text-white py-4 px-5 relative bg-black`}
    >
      <div className="absolute right-5 top-4">
        <button
          onClick={(e) => {
            closeModal(e);
            e.stopPropagation();
          }}
          className="w-8 h-8  grid place-content-center rounded-full bg-outline-grey  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
            />
          </svg>
        </button>
      </div>
      <h1 className="text-[24px] mb-2 font-semibold">Execute Contract</h1>
      <form action="">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2>Contract Address</h2>
            <input
              type="text"
              placeholder="Enter Contract Address"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={contractAddress}
              onChange={(e) => setContractAddressValue(e.target.value)}
            />
            {errors?.contractAddress && contractAddress.length !== 0 && (
              <p className="text-red-500 text-sm">
                Please enter a valid contract address
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <h2>Function Name</h2>
            <input
              type="text"
              placeholder="Enter Function Name"
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={functionName}
              onChange={(e) => setFunctionNameValue(e.target.value)}
            />
            {errors?.functionName && (
              <p className="text-red-500 text-sm">
                Please enter a function name
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <h2>Arguments (array format)</h2>
            <input
              type="text"
              placeholder={`["value1", "value2", "value3", ... , "value(n)"]`}
              className="w-full p-2 rounded text-black outline-none focus:border-[#3b81f6] border-[2px]"
              value={callData}
              onChange={(e) => setCallDataValue(e.target.value)}
            />
            {errors?.callData && callData.length !== 0 && (
              <p className="text-red-500 text-sm">
                Please enter valid arguments in correct format
              </p>
            )}
          </div>
        </div>

        <button
          className="w-full mt-7 py-3 bg-[#3b81f6] rounded font-medium flex items-center gap-x-2 justify-center disabled:cursor-not-allowed"
          disabled={
            errors?.callData || errors?.contractAddress || errors?.functionName
          }
          onClick={async (e) => {
            e.preventDefault();
            await handleExecute();
          }}
        >
          Execute{" "}
          <Image
            src={loading ? spinner : rightArr}
            alt={loading ? "loading" : "right arrow"}
            height={16}
            width={16}
          />
        </button>
      </form>
    </GenericModal>
  );
}

export default ContractExecutionModal;
