const ClockButton = ({ active, toggleActive }) => {
  return (
    <button
      onClick={toggleActive}
      className={`w-20 text-white px-4 py-2 rounded-md transition ${
        active ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      {active ? "Clock OUT" : "Clock IN"}
    </button>
  );
};

export default ClockButton;
