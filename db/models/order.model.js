import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },

  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      discountApplied: { type: Number, default: 0 }
    }
  ],

  totalPrice: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "Credit Card", "PayPal", "Wallet"],
    default: "COD"
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },

  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },

  trackingNumber: { type: String }
}, { 
  timestamps: true,
  versionKey: false
});

export const orderModel = model("order", orderSchema);
