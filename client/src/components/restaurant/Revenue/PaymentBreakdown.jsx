import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PaymentBreakdown = () => {
  const stats = [
    { type: "UPI", value: 45 },
    { type: "Card", value: 30 },
    { type: "Cash", value: 25 }
  ];

  const COLORS = ["#4F46E5", "#16A34A", "#F59E0B"];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Payment Breakdown</h2>
      <div className="bg-white shadow rounded-xl p-6 flex justify-center">
        <PieChart width={350} height={280}>
          <Pie data={stats} dataKey="value" nameKey="type" outerRadius={90}>
            {stats.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </>
  );
};

export default PaymentBreakdown;
