import { useState } from "react";
import StatusBadge from "../../../components/delivery/StatusBadge/StatusBadge";
import OrderCard from "../../../components/delivery/OrderCard/OrderCard";
import ClockButton from "../../../components/delivery/ClockButton/ClockButton";

const Dashboard = () => {
  const [active, setActive] = useState(true);

  const toggleActive = () => setActive(!active);

  const handleAccept = (id) => {
    console.log(`Order ${id} accepted.`);
    // call API here
  };

  const handleReject = (id) => {
    console.log(`Order ${id} rejected.`);
    // call API here
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="w-full px-6">
        {/* Floating Badge */}
        {/* <span
            className={`absolute top-20 left-5 z-20 px-4 py-1 rounded-full text-sm ${
            active ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
            }`}
        >
            {active ? "Active" : "Inactive"}
        </span> */}
        <StatusBadge active={active} />
      </div>     

      {/* Dashboard Container */}
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">

        {/* Clock Button */}
        <div className="flex justify-start mb-6">
          <ClockButton active={active} toggleActive={toggleActive} />
        </div>

        {/* Order Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <OrderCard orderId={1} onAccept={handleAccept} onReject={handleReject} />
          <OrderCard orderId={2} onAccept={handleAccept} onReject={handleReject} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
