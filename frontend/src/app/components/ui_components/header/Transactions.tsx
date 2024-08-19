"use client";
import Menu from "svg/Menu";
import { useState } from "react";
import GenericModal from "../GenericModal";
import Close from "svg/Close";
import NetworkSwitcher from "../NetworkSwitcher";
import Library from "svg/Library";
import AddTokenModal from "./AddTokenModal";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Verified from "svg/Verified";
import Blockies from "react-blockies";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import WarnBadge from "svg/WarnBadge";
import { formatDate } from "@/app/utils/date";

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
    <div className="flex items-center gap-4 rounded-[12px] border-[1px] border-solid border-[--headings] bg-transparent p-2 text-sm md:p-4">
      <div>
        <span className="grid h-12 w-12 place-content-center rounded-[8px] bg-yellow-secondary text-l text-yellow-primary">
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76M8 12h8"
          />
        </svg> */}
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
    <>
      <GenericModal
        popoverId="transaction-modal"
        style="mt-[5rem] h-screen w-full bg-transparent backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem]"
      >
        <div className="user-modal mx-auto flex w-full max-w-[--header-max-w] flex-col items-center py-8 md:items-end md:px-12">
          <div className="zoom flex w-[90vw] max-w-[25rem] flex-col gap-4 rounded-[24px] bg-[--background] p-8 pt-8 shadow-popover-shadow transition-colors duration-500 ease-linear md:max-w-[30rem]">
            <div className="mb-8 flex justify-between">
              <h3 className="text-l text-[--headings]">Transactions</h3>
              <button
                //@ts-ignore
                popoverTarget="transaction-modal"
                className="text-[--headings]"
              >
                <Close />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-text-primary">Select Network</p>
              <NetworkSwitcher />
            </div>
            <div>
              <button // @ts-ignore
                popoverTarget="transaction-history"
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border-[2px] border-solid border-[--headings] py-[.55rem] text-[--headings] md:p-4"
              >
                <span className="text-l">
                  <Library />
                </span>
                <span>Transaction History</span>
              </button>
            </div>
            <div>
              <button
                aria-haspopup="dialog"
                // @ts-ignore
                popoverTarget="add-token-popover"
                className="w-full rounded-[12px] bg-accent-secondary p-3 text-background-primary-light md:p-4"
              >
                Add Token
              </button>
            </div>
          </div>
        </div>
      </GenericModal>

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
                popoverTarget="transaction-history"
                className="text-[--headings]"
              >
                <Close />
              </button>
            </div>
            <div className="transactions-modal flex max-h-[50svh] flex-col gap-4 overflow-scroll md:h-full md:max-h-[60vh]">
              {transactions.map((transaction, index) => (
                <>
                  <TransactionItem key={index} transaction={transaction} />
                  <TransactionItem key={index} transaction={transaction} />
                  <TransactionItem key={index} transaction={transaction} />
                </>
              ))}
            </div>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

const Transactions = () => {
  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });
    }
  };
  return (
    <>
      <button
        aria-haspopup="dialog"
        onClick={() => togglePopover({ targetId: "transaction-modal" })}
        className="grid h-10 w-10 place-content-center rounded-full bg-accent-secondary text-[1.5em] text-background-primary-light md:h-12 md:w-12"
      >
        <Menu />
      </button>
      <TransactionModal />
      <AddTokenModal />
    </>
  );
};

export default Transactions;
