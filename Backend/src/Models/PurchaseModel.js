import mongoose from "mongoose";
import User from "./UserModel.js";
import Product from "./ProductModel.js";
const purchaseSchema=new mongoose.Schema(
    {
        userId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:User,
        },
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:Product,
        }
    },{
        versionKey:false
    }
)
export default mongoose.model('Purchase',purchaseSchema)