import React, { useEffect, useState } from "react";
import SummaryApi from "../../common/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les commandes
  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.getOrders.url, {
        method: SummaryApi.getOrders.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{order.userId?.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">${order.totalAmount}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;