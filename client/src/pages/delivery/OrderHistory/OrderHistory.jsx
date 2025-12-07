import { useState } from "react";
import OrdersGrid from "../../../components/delivery/Orders/OrderGrid";

export default function OrderHistory() {

  const [orders] = useState([
    { id: 1201, restaurant: "KFC", date: "10 Jan 2025", earnings: 85 },
    { id: 1202, restaurant: "McDonald's", date: "12 Jan 2025", earnings: 65 },
    { id: 1203, restaurant: "Subway", date: "14 Jan 2025", earnings: 75 },
    { id: 1204, restaurant: "Burger King", date: "15 Jan 2025", earnings: 92 },
    { id: 1205, restaurant: "La Pinoz", date: "17 Jan 2025", earnings: 70 },
    { id: 1206, restaurant: "Dominos", date: "19 Jan 2025", earnings: 88 },
  ]);

  return (
    <div className="min-h-[calc(100vh-80px)] w-full p-6 mx-auto overflow-y-auto">
      
      <h1 className="text-3xl font-extrabold text-center mb-8">
        Order History
      </h1>

      <OrdersGrid orders={orders} />

    </div>
  );
}
