import React, { useState, useEffect } from "react";
import axios from "axios";
import { backEndUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backEndUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
        toast.success("Orders fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backEndUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Order status updated successfully");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gradient-to-br min-h-screen">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
        📦 Order Page
      </h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300"
            key={index}
          >
            <img
              src={assets.parcel_icon}
              alt="parcel icon"
              className="w-12 h-12 animate-bounce"
            />
            <div className="w-full">
              <div className="mb-4 border-b pb-4">
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm text-gray-700 font-medium">
                    {item.name} X {item.quantity}{" "}
                    {item.size && <span>({item.size})</span>}
                    {index !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm text-gray-600 italic">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.zipCode}
                </p>
                <p className="text-sm text-gray-600">
                  📞 {order.address.phone}
                </p>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-700 font-medium">
                  Items: {order.items.length}
                </p>
                <p className="text-gray-700 font-medium">
                  Method: {order.paymentMethod}
                </p>
                <p className="text-gray-700 font-medium">
                  Payment: {order.payement ? "✔️ Done" : "❌ Pending"}
                </p>
                <p className="text-gray-700 font-medium">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-gray-800">
                  {currency}
                  {order.amount}
                </p>
                <select
                  value={order.status}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring focus:ring-gray-400"
                  onChange={(event)=>statusHandler(event,order._id)}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
