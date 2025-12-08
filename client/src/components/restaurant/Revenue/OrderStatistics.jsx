import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const OrderStatistics = () => {
  const data = [
    { day: "Mon", total: 120, cancelled: 12 },
    { day: "Tue", total: 140, cancelled: 8 },
    { day: "Wed", total: 110, cancelled: 10 },
    { day: "Thu", total: 175, cancelled: 14 },
    { day: "Fri", total: 200, cancelled: 20 }
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
      <div className="bg-white shadow rounded-xl p-6 mb-12 w-full overflow-x-auto">
        <LineChart width={600} height={280} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={2} name="Total Orders"/>
          <Line type="monotone" dataKey="cancelled" stroke="#EF4444" strokeWidth={2} name="Cancelled"/>
        </LineChart>
      </div>
    </>
  );
};

export default OrderStatistics;
