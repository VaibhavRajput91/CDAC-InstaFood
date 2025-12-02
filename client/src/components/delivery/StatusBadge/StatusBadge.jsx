const StatusBadge = ({ active }) => {
  return (
    <span
      className={`fixed top-20 px-3 py-1 text-sm rounded-full ${
        active
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-800"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusBadge;