import { authMiddleware } from "../../middleware/authMiddleware.js"
import { getCart,addToCart,updateCartItem,removeCartItem, clearCart } from "./cart.controller.js"
import express,{ Router } from "express"

export const CartRoutes=Router()
CartRoutes.post("/cart", authMiddleware, addToCart);

CartRoutes.get("/cart", authMiddleware, getCart);

CartRoutes.put("/cart/:productId", authMiddleware, updateCartItem);

CartRoutes.delete("/cart/:productId", authMiddleware,removeCartItem);

CartRoutes.delete("/cart", authMiddleware, clearCart);




