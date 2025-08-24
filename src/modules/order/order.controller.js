import { orderModel } from "../../../db/models/order.model.js";
import{cartModel}from"../../../db/models/cart.model.js";
import {clearCart } from "../cart/cart.controller.js";
import { isAdmin } from "../user/user.controller.js"; 

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartModel.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;
    const discountApplied = req.body.discount ; 

    cart.items.forEach((item) => {
    totalPrice += item.productId.price * item.quantity * (1 - discountApplied / 100);
    });


    const newOrder = new orderModel({
      userId,
      items: cart.items,
      totalPrice,
    });

    await newOrder.save();

    cart.items = [];
    await cart.save();
    await clearCart(userId);
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to get all Orders of programmer" });
    const orders = await orderModel.find().populate("items.productId userId");
    res.json({ message: "All orders", orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId }).populate("items.productId");
    res.json({ message: "Your orders", orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user orders", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to update the status of order" });
    const { orderId } = req.params;
    const {  status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      {  status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted", order: deletedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err.message });
  }
};
export{
    createOrder,
    deleteOrder,
    updateOrderStatus,
    getUserOrders,
    getAllOrders
}