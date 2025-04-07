import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from "bcrypt"
dotenv.config()

const userSchema = new mongoose.Schema(
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
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
userSchema.methods.comparePassword=async function (password) {
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken= function() {
  let sKey=process.env.JWT_SECRET
  let expire=process.env.JWT_EXPIRES_IN
  return jwt.sign({id:this._id},sKey,{expiresIn:expire})
}
userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    return userObject
}
export default mongoose.model("User", userSchema);