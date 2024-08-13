"use client";
import { useState } from "react";
import TransactionItem from "./TransactionItem";
import Close from "svg/Close";
import GenericModal from "../ui_components/GenericModal";
import NetworkSwitcher from "../ui_components/NetworkSwitcher";
import ThemeSwitch from "../header/ThemeSwitch";
import Library from "svg/Library";
import useTheme from "../ui_components/hooks/useTheme";

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

const TransactionModal = () => {
  const { theme, changeTheme } = useTheme();
  const [transactions, setTransactions] = useState(testTransactions);

  return (
    <>
      <GenericModal
        popoverId="transaction-modal"
        style="mt-[5rem] h-screen w-full bg-transparent backdrop:mt-[5rem] md:mt-[9rem] md:backdrop:mt-[9rem]"
      >
        <div className="user-modal mx-auto flex w-full max-w-[--header-max-w] flex-col items-center py-8 md:items-end md:px-12">
          <div className="zoom flex w-[95vw] max-w-[30rem] flex-col gap-4 rounded-[24px] bg-[--background] p-8 pt-8 shadow-popover-shadow transition-colors duration-500 ease-linear">
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
                className="flex w-full items-center justify-center gap-2 rounded-[12px] border-[2px] border-solid border-[--headings] p-4 text-[--headings]"
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
                className="w-full rounded-[12px] bg-accent-secondary p-4 text-background-primary-light"
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
          <div className="w-[95vw] max-w-[30rem] rounded-[24px] bg-[--background] p-8 text-text-primary shadow-popover-shadow md:ml-auto md:mr-[3rem]">
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
            <div className="transactions-modal flex h-[60svh] max-h-[600px] flex-col gap-4 overflow-scroll md:h-full">
              {transactions.map((transaction, index) => (
                <TransactionItem key={index} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default TransactionModal;
