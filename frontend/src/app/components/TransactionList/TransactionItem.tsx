"use client";

import { formatDate } from "@/app/components/ui_components/utils/date";
import { Status, Transaction } from "./TransactionModal";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Verified from "svg/Verified";
import Blockies from "react-blockies";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import WarnBadge from "svg/WarnBadge";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { address } = useAccount();
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  let Icon;
  let color;

  switch (transaction.statut) {
    case Status.Accepted:
      Icon = CheckCircle2;
      color = "text-green-500";
      break;
    case Status.Pending:
      Icon = Clock;
      color = "text-[#f77448]";
      break;
    case Status.Rejected:
      Icon = AlertCircle;
      color = "text-red-500";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center gap-4 rounded-[24px] border-[1px] border-solid border-[--headings] bg-transparent p-2 text-sm md:p-4">
      <div>
        <span className="grid h-12 w-12 place-content-center rounded-[12px] bg-yellow-secondary text-l text-yellow-primary">
          <WarnBadge />
        </span>

        {/* <Verified />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76M8 12h8"
          />
        </svg> */}
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2 md:gap-4 md:px-4">
        <div className="flex items-center justify-between">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[--link-card] p-1 md:px-4 md:py-2">
            <div className="h-8 w-8 overflow-clip rounded-full">
              <Blockies
                seed={address || ""}
                scale={4}
                className="mx-auto h-full w-full rounded-full"
              />
            </div>

            <p className="text-primary text-sm text-yellow-primary">
              {starkProfile?.name ||
                address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
            </p>
          </div>
          <div>
            <p className="text-green-secondary">+234 ETH</p>
          </div>
        </div>

        <div className="h-[1px] rounded-full bg-[--headings]"></div>

        <div className="flex items-center justify-between">
          <p className="text-sm">{formatDate(transaction.createdAt)}</p>
          <a
            href={`https://starkscan.co/tx/${transaction.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            See transaction
          </a>
        </div>
      </div>
    </div>
  );
};
export default TransactionItem;
