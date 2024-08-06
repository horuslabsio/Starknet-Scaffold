"use client";

import { formatDate } from "@/app/components/ui_components/utils/date";
import { Status, Transaction } from "./TransactionList";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
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
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col justify-between items-start">
      <div className="flex items-center">
        {Icon && <Icon className={`${color} mr-2`} />}
        <div>
          <p className="text-primary font-semibold">{transaction.title}</p>
          <p className="text-gray-700 text-sm">{transaction.text}</p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center my-3">
        <p className="text-gray-500 text-xs">
          {formatDate(transaction.createdAt)}
        </p>

        <button className="text-primary hover:text-primary text-xs font-semibold">
          <a
            href={`https://starkscan.co/tx/${transaction.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            See transaction
          </a>
        </button>
      </div>
    </div>
  );
};
export default TransactionItem;
