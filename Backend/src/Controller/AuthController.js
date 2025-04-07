import User from "../Models/UserModel.js"
class AuthController{
    async login(req,res){
        const {email,password}=req.body
        let findUser=await User.findOne({email:email})
        if (!findUser){
            res.status(403).json({message:'user not found',state:false})
        }else{
            let isMatch= await findUser.comparePassword(password)
            if (!isMatch){
                res.status(403).json({message:'invalid password',state:false})
            }else{
                
                const token=await findUser.generateToken()
                const cookieOptions={
                    expires:new Date(Date.now()+24*60*60*1000),//1d
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'Strict'
                }
                res.cookie('jwt',token,cookieOptions)
                res.status(200).json({message:'logged in successfully',state:true,token,user:findUser})

            }
        }
    }
    async logout(req,res){
        try{ 
            res.clearCookie('jwt')
            res.status(200).json({message:'logged out successfully',state:true})
        }catch(err){
            res.status(400).json({message:"error logging out" ,state:false})
        }
       
    }
}
export default AuthController