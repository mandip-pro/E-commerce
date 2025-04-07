import express from 'express'
import userRoute from './User.js'
import productRoute from './Product.js'
import authRoute from './Auth.js'
import adminRoute from './Admin.js'
import orderRoute from './Order.js'
const webRoute=express.Router()


webRoute.get("/",(req,res)=>{
    res.json({message:"no prompt"})
})
webRoute.use('/users',userRoute)
webRoute.use('/product',productRoute)
webRoute.use('/auth',authRoute)
webRoute.use('/admin',adminRoute)
webRoute.use('/order',orderRoute)



export default webRoute