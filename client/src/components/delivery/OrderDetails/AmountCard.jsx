export default function AmountCard({ amount }) {
  return (
    <div className="bg-green-50 border border-green-300 shadow-md rounded-xl px-6 py-4 text-center text-lg font-semibold text-green-700 w-full sm:w-fit mx-auto">
      Amount Earned: ₹{amount}
    </div>
  );
}
