import express from "express";
import { dbConnetion } from "./db/dbConnection.js";
import { UserRoutes } from "./src/modules/user/user.routes.js";
import { ProductRoutes } from "./src/modules/product/product.routes.js";
import { CartRoutes } from "./src/modules/cart/cart.routes.js";
import { OrderRoutes } from "./src/modules/order/order.routes.js";



const app=express()

dbConnetion

let x=true
const isAuth=(req,res,next)=>{
if(x)next()
    else res.json({message:"not auth"})
}


app.use(UserRoutes)
app.use(ProductRoutes)
app.use(CartRoutes)
app.use(OrderRoutes)

app.get('/',isAuth,(req,res)=>{
    res.json({message:"done"})
})



app.listen(3000,()=>{
    console.log("server running")
})