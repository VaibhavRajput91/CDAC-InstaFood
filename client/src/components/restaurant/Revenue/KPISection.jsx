import React from "react";
import KPICard from "./KPICard";

const KPISection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <KPICard title="Total Revenue" value="₹1,52,340" status="+12% this month" />
      <KPICard title="Net Profit" value="₹78,900" status="+9% growth" />
      <KPICard title="Average Order Value" value="₹265" status="Stable growth" />
    </div>
  );
};

export default KPISection;
