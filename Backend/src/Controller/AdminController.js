import Admin from "../Models/AdminModel.js";
class AdminController{
    async post(req, res) {
        const existingAdmin = await Admin.findOne({ email: req.body.email });
    
        if (existingAdmin) {
          res.json({ message: "admin already exists", state: false });
        } else {
          try {
            await Admin.create(req.body);
            res
              .status(200)
              .json({ message: "admin added succesfully", state: true });
          } catch (err) {
            // console.log(err.errors['email'].message)
            console.log(err)
            res.status(400).json({ message: "fill all the fields", state: false });
          }
        }
      }

      async login(req,res){
        const {email,password}=req.body
        let findAdmin=await Admin.findOne({email:email})
        if (!findAdmin){
            res.status(403).json({message:'admin not found',state:false})
        }else{
            let isMatch= await findAdmin.comparePassword(password)
            if (!isMatch){
                res.status(403).json({message:'invalid password',state:false})
            }else{
                
                const token=await findAdmin.generateToken()
                const cookieOptions={
                    expires:new Date(Date.now()+24*60*60*1000),//1d
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:'Strict'
                }
                res.cookie('jwt',token,cookieOptions)
                res.status(200).json({message:'admin logged in successfully',state:true,token,user:findAdmin})

            }
        }
    }
    async logout(req,res){
        try{
            if(!req.cookies.jwt) {
                return res.status(400).json({message:"you are not logged in"})
            }
            res.clearCookie('jwt')
            res.status(200).json({message:'logged out successfully'})
        }catch(err){
            res.status(400).json({message:"error logging out"})
            console.log(err)
        }
       
    }

}
export default AdminController

/* 1.token verify at RouteMiddlewere and Purchase model (table of foreign keys)
2.user - purchase route to get product bought by a user and product-buy to buy product
3.admin controller model and router and define signin logout and login route
*/