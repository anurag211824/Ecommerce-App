import express from 'express';
import {placeOrder,allOrders,userOrders,updateStatus}  from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

//Payment Feature routes
orderRouter.post('/place',authUser,placeOrder);
// User Features routes
orderRouter.post('/userorders',authUser,userOrders);

export default orderRouter;