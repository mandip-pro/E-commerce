import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class AdminMiddlewere {
  static async check(req, res, next) {
    let sKey = process.env.JWT_ADMIN_SECRET;
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(500).json({ message: "no token of user" });
    }
    try {
      token = token.split(" ")[1];
      const result = jwt.verify(token, sKey);
      req.adminId = result.id;
      next();
    } catch (err) {
      return res.status(500).json({ message: "error verifying" });
    }
  }
}
export default AdminMiddlewere;
