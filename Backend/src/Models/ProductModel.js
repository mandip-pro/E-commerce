import mongoose from "mongoose";
import User from "./UserModel.js";
const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        old_price:{
            type:String,
            required:true
        },
        new_price:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true,
            enum:["mens","womens","child"]
        },
        additional_description:{
            type:String
        },
        image:{
            type:String
        },
        creatorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        },
        quantity:{
            type:Number,
            default:1
        }
    },{
        versionKey:false
    }
)
productSchema.methods.toJSON=function(){
    const product=this
    if (product.image){
        product.image=`http://127.0.0.1:3000/products/${product.image}`
    }
    return product
}
export default mongoose.model('Product',productSchema)