import Product from "../Models/ProductModel.js";
import Purchase from "../Models/PurchaseModel.js";
import User from "../Models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();
const sKey = process.env.STRIPE_SECRET_KEY;

import Stripe from "stripe";
const stripe = new Stripe(sKey);
class UserConttroller {
  
  
    async get(req, res) {
    try {
      const data = await User.find({});
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error while fetching data" });
    }
  }
  
  
  async post(req, res) {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.json({ message: "user already exists", state: false });
    } else {
      try {
        await User.create(req.body);
        res
          .status(200)
          .json({ message: "user added succesfully", state: true });
      } catch (err) {
        // console.log(err.errors['email'].message)
        console.log(err)
        res.status(400).json({ message: "fill all the fields", state: false });
      }
    }
  }
  
  
  async put(req, res) {
    await User.findByIdAndUpdate(req.params.id);
    res.sendStatus(200);
  }
  
  
  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "cant delete" });
    }
  }

  async purchase(req,res){
    const {userId}=req
    try{
      let purchasedProductId=[]
      const findPurchased=await Purchase.find({userId})
      findPurchased.map((user)=>{
        return purchasedProductId.push(user.productId)
      })
      const purchasedProductDetails=await Product.find({_id:{$in:purchasedProductId}})      
      
      res.status(200).json({message:"purchased item list",purchasedProductDetails,purchasedProductId})
      
      
    }catch(err){
      res.status(500).json({message:'cant find products of user',err})
      console.log(err)
    }
  }
  async removePurchase(req,res){
    const {userId}=req
    const productId=req.params.id
    const findPurchase=await Purchase.find({userId,productId})
    try{
      findPurchase.map(async(cartItem)=>{
      await Purchase.findByIdAndDelete(cartItem._id)
      })
      res.status(200).json({message:"cart-item deleated successfully",state:true})
    }catch(err){
      res.status(500).json({message:"error deleting purchase",state:false})
    }
    
  }

  async charge(req,res){

    const {userId}=req  
    const amount=req.body.amount
    try{
      let purchasedProductId=[]
      const findPurchased=await Purchase.find({userId})
      findPurchased.map((user)=>{
        return purchasedProductId.push(user.productId)
      })
      const purchasedProductDetails=await Product.find({_id:{$in:purchasedProductId}})   
      
      //stripe code
      const paymentIntent=await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        payment_method_types:['card']
       })
      
      res.status(200).json({message:"purchased item list",state:true,purchasedProductDetails,purchasedProductId, clientSecret:paymentIntent.client_secret})
      
      
    }catch(err){
      res.status(500).json({message:'cant find products of user',state:false,err})
      console.log(err)
    }


   
     
     

  }
}
export default UserConttroller;
