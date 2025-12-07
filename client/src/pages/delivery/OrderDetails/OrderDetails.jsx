import { useLocation } from "react-router-dom";
import InfoSection from "../../../components/delivery/OrderDetails/InfoSection";
import AmountCard from "../../../components/delivery/OrderDetails/AmountCard";

export default function OrderDetails() {

  // Data will come from route navigation or API
  const { state } = useLocation(); 
  const order = state || {
    id: 1203,
    customer: {
      "Customer Name": "Rohit Sharma",
      "Contact": "9876543210",
      "Order Details": "2x Burgers, 1x Fries, 1x Coke",
      "Delivery Time": "12:45 PM"
    },
    restaurant: {
      "Restaurant Name": "McDonald's",
      "Contact": "022-2448765",
      "Address": "Link Road, Mumbai, MH"
    },
    amount: 75,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full px-5 sm:px-10 py-8 pb-[90px]">

      <h1 className="text-3xl font-extrabold text-center mb-8">
        Order Details
      </h1>

      {/* Two column layout for desktop → 1 column on mobile */}
      <div className="flex flex-wrap justify-between gap-6 mb-10">
        <InfoSection title="Customer Details" data={order.customer} />
        <InfoSection title="Restaurant Details" data={order.restaurant} />
      </div>

      <AmountCard amount={order.amount} />
    </div>
  );
}
