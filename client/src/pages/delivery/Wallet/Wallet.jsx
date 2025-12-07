import { useState } from "react";

import WalletCard from "../../../components/delivery/Wallet/WalletCard";
import TransactionList from "../../../components/delivery/Wallet/TransactionList";
import CashoutButton from "../../../components/delivery/Wallet/CashOutButton";

export default function Wallet() {

  const [transactions] = useState([
    { id: 1, amount: 120, date: "2025-01-10", status: "Credited" },
    { id: 2, amount: 95,  date: "2025-01-12", status: "Credited" },
    { id: 3, amount: 110, date: "2025-01-14", status: "Credited" }
  ]);

  const total = transactions.reduce((a, t) => a + t.amount, 0);
  const avg = (total / transactions.length).toFixed(2);

  return (
    <div className="p-6 max-w-3xl mx-auto h-full">

      <h1 className="text-2xl font-bold text-center mb-4">Wallet</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <WalletCard title="Total Earnings" amount={total} color="text-green-600" />
        <WalletCard title="Average Earnings" amount={avg} color="text-blue-600" />
        <div className="flex justify-center items-center">
          <CashoutButton onCashOut={() => alert("Cash Out Triggered")} />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Transactions</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
}
