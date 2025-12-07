export default function ContactInput({ label, type="text", value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
