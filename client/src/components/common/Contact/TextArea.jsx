export default function TextArea({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        rows={5}
        value={value}
        onChange={onChange}
        className="border rounded-lg px-4 py-2 text-gray-700 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
      ></textarea>
    </div>
  );
}
