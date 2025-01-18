import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import e from "express";
// placing order using cash on delivery
const placeOrder = async (req, res) => {
  try {
    //we will get userId from the token using auth,js middleware
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartdData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// All Orders data for admin Panel
const allOrders = async (req, res) => {
  try{
    const orders=await orderModel.find({})
    res.json({ success: true,orders})
  }
  catch (error){
    console.log(error);
    res.json({ success: false,message: error.message });
  }
};

// Users order Data for Frontend
const userOrders = async (req, res) => {
    try{
        const {userId} = req.body;
        const orders=await orderModel.find({ userId})
        res.json({ success: true,orders})
    }
    catch (error){
        console.log(error);
        res.json({ success: false,message: error.message });
        
    }
};

// User order status from admin panel
const updateStatus = async (req, res) => {
      try{
           const {orderId,status}=req.body;
           await orderModel.findByIdAndUpdate(orderId,{status})
           res.json({ success: true, message: "Order Status Updated" })
      }
      catch (error){
        console.log(error);
        res.json({ success: false,message: error.message });
      }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
};
