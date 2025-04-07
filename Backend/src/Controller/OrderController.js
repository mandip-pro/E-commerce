import Order from "../Models/OrderModel.js"
class OrderController{
    async post(req,res){
        try{
            await Order.create(req.body)
            res.status(200).json({message:"successfully created order"})

        }catch(err){
            res.status(500).json({message:"error posting order"})
            console.log(err)
        }
    }
    async get(req,res){
        try {
            const data = await Order.find({});
            res.status(200).json({data});
          } catch (err) {
            console.log(err);
            res.status(500).json({ message: "error while fetching data" });
          }
    }
}
export default OrderController