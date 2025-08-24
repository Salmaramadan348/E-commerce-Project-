import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

export const cartModel = model("cart", cartSchema);
