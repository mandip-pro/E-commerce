import mongoose from "mongoose";
const orderSchema=new mongoose.Schema(
    {
        productIds:{
            type:Array
        },
        productDetails:{
            type:Array
        },
        userId:{
            type:String
        },
        email:{
            type:String
        },
        paymentId: {type:String},
        amount: {type:String},
        status: {type:String},
        purchaseDate:{
            type:Date,
            default:Date.now()
        }
    },{
        versionKey:false
    }
)
export default mongoose.model('Order',orderSchema)