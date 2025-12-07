export default function CashoutButton({ onCashOut }) {
  return (
    <button 
      onClick={onCashOut}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow transition"
    >
      Cash Out
    </button>
  );
}
