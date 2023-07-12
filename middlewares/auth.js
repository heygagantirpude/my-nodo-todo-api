import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      message: `Login First`,
    });
  }

  const decoded = jwt.verify(token, process.env.JSONWEBTOKEN);
  req.user = await userModel.findById(decoded._id);
  next();
};

export default isAuthenticated;