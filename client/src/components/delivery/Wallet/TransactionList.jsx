import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4">
      {transactions.length ? (
        <ul className="space-y-3">
          {transactions.map(tx => (
            <TransactionItem
              key={tx.id}
              amount={tx.amount}
              date={tx.date}
              status={tx.status}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">No transactions yet.</p>
      )}
    </div>
  );
}
