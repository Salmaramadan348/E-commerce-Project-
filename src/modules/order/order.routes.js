import { authMiddleware } from "../../middleware/authMiddleware.js"
import { createOrder,getAllOrders,getUserOrders,updateOrderStatus,deleteOrder } from "./order.controller.js";
import express,{ Router } from "express"

export const OrderRoutes=Router()
OrderRoutes.post("/order", authMiddleware, createOrder);

OrderRoutes.get("/order", authMiddleware, getUserOrders);

OrderRoutes.get("/orders", authMiddleware,  getAllOrders);

OrderRoutes.put("/order/:orderId", authMiddleware, updateOrderStatus);

OrderRoutes.delete("/order/:orderId", authMiddleware, deleteOrder);



