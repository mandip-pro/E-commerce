import mongoose from "mongoose";
class Database{
    static async connection(req,res){
        try{
           await mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce")
           console.log("database connectes successfully"); 
        }catch(err){
            console.log(`error connecting database: ${err}`);
        }
    }
}
export default Database
