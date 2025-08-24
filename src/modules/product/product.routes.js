import { authMiddleware } from "../../middleware/authMiddleware.js"
import {getProduct,postProduct,updateProduct,deleteProduct, addRating, getSingleProduct}from"../../modules/product/product.controller.js"
import express,{ Router } from "express"

export const ProductRoutes=Router()
ProductRoutes.use(express.json())

ProductRoutes.get('/product',getProduct)

ProductRoutes.get('/product/:id', getSingleProduct)

ProductRoutes.post('/product',authMiddleware,postProduct)

ProductRoutes.patch('/product/:id',authMiddleware,updateProduct)

ProductRoutes.delete('/product/:id',authMiddleware,deleteProduct)

ProductRoutes.post("/:productId/rate", authMiddleware, addRating);

