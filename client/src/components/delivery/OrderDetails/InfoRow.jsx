export default function InfoRow({ label, value }) {
  return (
    <p className="text-sm sm:text-base">
      <span className="font-semibold">{label}: </span>
      <span className="text-gray-700">{value || "---"}</span>
    </p>
  );
}
