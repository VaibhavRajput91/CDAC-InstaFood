import InfoRow from "./InfoRow";

export default function InfoSection({ title, data }) {
  return (
    <div className="w-full sm:w-[48%] bg-white rounded-lg shadow p-5 space-y-2">
      <h2 className="text-lg font-bold border-b pb-1">{title}</h2>

      {Object.keys(data).map((key, i) => (
        <InfoRow key={i} label={key} value={data[key]} />
      ))}
    </div>
  );
}
