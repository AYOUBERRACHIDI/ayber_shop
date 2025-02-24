import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/API';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(SummaryApi.getOrders.url, {
          method: SummaryApi.getOrders.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const apiData = await response.json();

        if (apiData.success) {
          setOrders(apiData.data);
        } else {
          alert('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.map(order => (
        <div key={order._id}>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total Amount: {order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;