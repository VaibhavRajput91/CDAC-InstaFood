export default function TransactionItem({ amount, date, status }) {
  return (
    <li className="flex justify-between items-center border-b pb-2 last:border-none">
      <div>
        <p className="font-medium">₹{amount}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <span className="text-green-600 text-sm">{status}</span>
    </li>
  );
}
