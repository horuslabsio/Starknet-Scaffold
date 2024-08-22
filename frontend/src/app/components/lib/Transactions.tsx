"use client";
import { useState } from "react";
import Close from "public/svg/Close";
import Library from "public/svg/Library";
import Blockies from "react-blockies";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import GenericModal from "../internal/util/GenericModal";
import WarnBadge from "public/svg/WarnBadge";
import { formatDate } from "../internal/helpers";

export enum Status {
  Accepted,
  Pending,
  Rejected,
}

const testTransactions: Transaction[] = [
  {
    createdAt: "2022-01-01T00:00:00Z",
    statut: Status.Accepted,
    title: "Transaction 1",
    text: "This is transaction 1",
    txHash: "0xabc1",
  },
  {
    createdAt: "2022-01-02T00:00:00Z",
    statut: Status.Pending,
    title: "Transaction 2",
    text: "This is transaction 2",
    txHash: "0xabc2",
  },
  {
    createdAt: "2022-01-03T00:00:00Z",
    statut: Status.Rejected,
    title: "Transaction 3",
    text: "This is transaction 3",
    txHash: "0xabc3",
  },
];

export type Transaction = {
  createdAt: string;
  statut: Status;
  title: string;
  text: string;
  txHash: string;
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { address } = useAccount();
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  let Icon;
  let color;

  switch (transaction.statut) {
    case Status.Accepted:
      color = "text-green-500";
      break;
    case Status.Pending:
      color = "text-[#f77448]";
      break;
    case Status.Rejected:
      color = "text-red-500";
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center gap-4 rounded-[12px] border-[1px] border-solid border-[--headings] bg-transparent p-2 text-sm md:p-4">
      <div>
        <span className="grid h-12 w-12 place-content-center rounded-[8px] bg-yellow-secondary text-l text-yellow-primary">
          <WarnBadge />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-2 md:gap-4 md:px-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
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
          <div className="ml-auto">
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

const TransactionModal = () => {
  const [transactions, setTransactions] = useState(testTransactions);

  return (
    <GenericModal
      popoverId="transaction-history"
      style="mx-auto mt-[5rem]  h-full w-full bg-transparent p-0 backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem]"
    >
      <div className="mx-auto mt-8 flex max-w-[--header-max-w] flex-col items-center md:items-end">
        <div className="w-[90vw] max-w-[25rem] rounded-[24px] bg-[--background] px-6 py-8 text-text-primary shadow-popover-shadow md:ml-auto md:mr-[3rem] md:max-w-[30rem] md:p-8">
          <div className="mb-8 flex justify-between">
            <h3 className="text-l text-[--headings]">Transaction List</h3>
            <button
              //@ts-ignore
              popovertarget="transaction-history"
              className="text-[--headings]"
            >
              <Close />
            </button>
          </div>
          <div className="transactions-modal flex max-h-[50svh] flex-col gap-4 overflow-scroll md:h-full md:max-h-[60vh]">
            {transactions.map((transaction, index) => (
              <TransactionItem key={index} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

const TransactionsButton = ({
  text = "Transaction History",
  className = "flex w-full items-center justify-center gap-2 rounded-[12px] border-[2px] border-solid border-[--headings] py-[.55rem] text-[--headings] md:p-4",
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <>
      <button
        // @ts-ignore
        popovertarget="transaction-history"
        className={className}
      >
        <span className="text-l">
          <Library />
        </span>
        <span>{text}</span>
      </button>
      <TransactionModal />
    </>
  );
};

export default TransactionsButton;
