import { cartModel } from "../../../db/models/cart.model.js";

//for admin and Customer to show the cart of them 
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

//for show the cart 
const getCart=async(req,res)=>{
    const userId = req.user._id;
  const cart = await cartModel.findOne({ userId }).populate("items.productId");
  res.json({ cart });
}

const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(item => item.productId == productId);
  if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  res.json({ message: "Cart updated", cart });
};
const removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(item => item.productId != productId);
  await cart.save();

  res.json({ message: "Item removed", cart });
};
const clearCart = async (req, res) => {
  const userId = req.user._id;
  await cartModel.findOneAndDelete({ userId });
  res.json({ message: "Cart cleared" });
}


export{
    getCart,
   addToCart,
    clearCart,
    removeCartItem ,
    updateCartItem,
}