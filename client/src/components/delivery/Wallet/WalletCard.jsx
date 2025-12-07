export default function WalletCard({ title, amount, color }) {
  return (
    <div className="bg-white border p-4 rounded-lg shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-xl font-semibold ${color}`}>₹{amount}</h2>
    </div>
  );
}
