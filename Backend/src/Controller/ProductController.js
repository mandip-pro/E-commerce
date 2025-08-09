import Product from "../Models/ProductModel.js";
import Purchase from "../Models/PurchaseModel.js";


class ProductController {
  async get(req, res) {
    try {
      const data = await Product.find({});
      res.status(200).json({ message: "successfully fetched data", data });
    } catch (err) {
      res.status(500).json({ message: "error getting product" });
    }
  }
  async getOneProduct(req, res) {
    try {
      const data = await Product.findById(req.params.id);      
      res.status(200).json({ message: "successfully getting one data", data });
    } catch (err) {
      res.status(500).json({ message: "error fetching product" });
    }
  }
  async post(req, res) {
    try {
      const { adminId } = req;
      let image =''
      if(req.file){
        image=req.file.filename
      }
      const data = {
        ...req.body,
        image,
        creatorId: adminId,
      };
      await Product.create(data);
      res.status(200).json({ message: "successfully saved product" ,state:true});
    } catch (err) {
       res.status(500).json({ message: "error posting product",state:false });
    }
  }
  async put(req, res) {
    try {
      const { adminId } = req;
      let image =''
      if(req.file){
        image=req.file.filename
      }
      const data = {
        ...req.body,
        image,
        creatorId: adminId,
      }; 
      const responce=await Product.findByIdAndUpdate(req.params.id, data,);
      res.status(200).json({ message: "successfully updated data" ,data});
    } catch (err) {
      res.status(500).json({ message: "error formatting product" });
    }
  }
  async delete(req, res) {
    try {
      const { adminId } = req;
      await Product.findByIdAndDelete({
        _id: req.params.id,
        creatorId: adminId,
      });
      res.status(200).json({ message: "successfully deleated data",state:true });
    } catch (err) {
      res.status(500).json({ message: "error deleting product" ,state:false});
    }
  }

  async buy(req, res) {
    const { userId } = req;
    const productId = req.params.id;
    try {
      const findProduct = await Product.findById(productId);
      if (!findProduct) {
        return res
          .status(500)
          .json({ message: "np product with such id", state: false });
      }
     
     
      const newPurchase = new Purchase({ userId, productId });
      await newPurchase.save();
      res
        .status(200)
        .json({
          message: "product added to cart successfully",
          state: true,
          newPurchase,
          findProduct,
        });
    } catch (err) {
      console.log(err)
      res
        .status(400)
        .json({ message: "error in product adding to cart", state: false });
    }
  }

  
}
export default ProductController;
