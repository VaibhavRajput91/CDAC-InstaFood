import React from "react";

import KPISection from "../../../components/restaurant/Revenue/KPISection";
import OrderStatistics from "../../../components/restaurant/Revenue/OrderStatistics";
import RevenueChart from "../../../components/restaurant/Revenue/RevenueChart";
import BestSellingItems from "../../../components/restaurant/Revenue/BestSellingItems";
import PaymentBreakdown from "../../../components/restaurant/Revenue/PaymentBreakdown";
import Navbar from "../../../components/common/Navbar/Navbar";

const Revenue = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
        <KPISection />
        <OrderStatistics />
        <RevenueChart />
        <BestSellingItems />
        <PaymentBreakdown />
      </div>
    </div>
  );
};

export default Revenue;
