import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backEndUrl, currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadorderData = async () => {
    if (!token) return null;
    const response = await axios.post(
      `${backEndUrl}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    console.log(response.data);

    if (response.data.success) {
      let allOrderitem = [];
      response.data.orders.map((order) => {
        order.items.map((item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.date;
          allOrderitem.push(item);
        });
      });
      console.log(allOrderitem);
      setOrderData(allOrderitem.reverse());
    }
  };
  useEffect(() => {
    loadorderData();
  }, [token]);
  return (
    <div className="border-t">
      {/* Orders Title */}
      <div className="text-t pt-16">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {/* Map through orders and display details */}
        {orderData.map((item, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={index}
          >
            <div className="flex items-start gap-6 text-sm">
              {/* Product Image and Details */}
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 test-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gary-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment:{" "}
                  <span className="text-gary-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              {/* Order Status and Track Order Button */}
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button
                onClick={loadorderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
