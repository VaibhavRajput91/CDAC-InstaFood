import OrderCard from "./OrderCard";

export default function OrdersGrid({ orders }) {
  return (
    <div className="w-full grid gap-6
      grid-cols-1          /* Mobile */
      sm:grid-cols-2       /* Tablets */
      md:grid-cols-3       /* Laptops */
      lg:grid-cols-4       /* Larger screens */
      xl:grid-cols-5       /* Full width utilization */
    ">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
