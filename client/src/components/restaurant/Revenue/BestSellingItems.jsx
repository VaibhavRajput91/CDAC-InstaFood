import React from "react";

const BestSellingItems = () => {
  const items = [
    { item: "Margherita Pizza", sold: 240, revenue: "₹42,500" },
    { item: "Paneer Roll", sold: 180, revenue: "₹31,200" },
    { item: "Burger Combo", sold: 150, revenue: "₹27,000" },
    { item: "Masala Dosa", sold: 120, revenue: "₹22,800" },
    { item: "Chole Bhature", sold: 100, revenue: "₹19,400" }
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Top Performing Menu Items</h2>
      <div className="bg-white shadow rounded-xl p-6 mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b font-semibold">
              <th align="left" className="py-2">Item</th>
              <th align="left">Units Sold</th>
              <th align="left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{row.item}</td>
                <td>{row.sold}</td>
                <td className="font-semibold">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BestSellingItems;
