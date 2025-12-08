import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const RevenueChart = () => {

  const revenueData = [
    { day: "Week 1", revenue: 28000 },
    { day: "Week 2", revenue: 35000 },
    { day: "Week 3", revenue: 42000 },
    { day: "Week 4", revenue: 46000 }
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Revenue</h2>
      <div className="bg-white shadow rounded-xl p-6 mb-12 overflow-x-auto">
        <BarChart width={600} height={280} data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#4F46E5" />
        </BarChart>
      </div>
    </>
  );
};

export default RevenueChart;
