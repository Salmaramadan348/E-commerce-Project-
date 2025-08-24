import { userModel } from "../../../db/models/user.model.js";
import { productModel } from "../../../db/models/product.model.js";
import { isAdmin } from "../user/user.controller.js";

//for show the product for all users(admin and customer)
const getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ message: "All Products:", products});

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


//create Product for only admin
const postProduct= async (req,res)=>{
    try{
        if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to add product" });
        const addedProduct= await productModel.insertMany(req.body)
        res.status(201).json({message:"user is added",addedProduct})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
   
}
//update Product for only admin
const updateProduct=async(req,res)=>{
    try{
        if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to Update Product" });
        const {id}=req.params
        const updatedProduct=await productModel.findByIdAndUpdate(id,{...req.body},{new:true})
        res.json({message:"updated successful",updatedProduct})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
    
}
//delete Product for only admin
const deleteProduct=async (req,res)=>{
    try{
        if (!isAdmin(req.user.email))return res.status(403).json({ message: "You don't have access to delete Product" });
        const {id}=req.params
        const deletedProduct=await productModel.findByIdAndDelete(id)
        res.json({message:"deleted successful",deletedProduct})
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
}


 const addRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; 
    

    const user = await userModel.findById(userId);
    if (!user || user.role !== "customer") {
      return res.status(403).json({ message: "Only customers can add ratings" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.ratings.push({ userId, rating, comment });
    await product.save();

    res.status(200).json({ message: "Rating added successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Error adding rating", error: err.message });
  }
};
const getSingleProduct=async(req,res)=>{
  try {
    const { id } = req.params; 
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Single product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
}

export{
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    addRating,
    getSingleProduct
}