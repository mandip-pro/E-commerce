import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from "bcrypt"
dotenv.config()

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true,"enter email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
adminSchema.methods.comparePassword=async function (password) {
  return await bcrypt.compare(password,this.password)
}
adminSchema.methods.generateToken= function() {
  let sKey=process.env.JWT_ADMIN_SECRET
  let expire=process.env.JWT_ADMIN_EXPIRES_IN
  return jwt.sign({id:this._id},sKey,{expiresIn:expire})
}
adminSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}
export default mongoose.model("Admin", adminSchema);