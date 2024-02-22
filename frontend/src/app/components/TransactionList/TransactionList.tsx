"use client";

import { useState } from "react";
import TransactionItem from "./TransactionItem";

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

const TransactionList = () => {
  const [transactions, setTransactions] = useState(testTransactions);

  return (
    <div>
      <h1 className="mb-3 font-semibold">Transaction List</h1>
      {transactions.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
