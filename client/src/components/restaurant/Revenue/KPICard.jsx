import React from "react";

const KPICard = ({ title, value, status }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
    <span className="text-sm text-gray-500">{status}</span>
  </div>
);

export default KPICard;
