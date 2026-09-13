import generateToken from "../utils/generateToken.js";
import Auth from "../models/authModel.js";
import jwt from "jsonwebtoken";
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "No token provided",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Auth.findById(decoded.id);
    next();
  } catch (error) {
    res.status(500).json({
      message: "Invalid or Expired token",
      error: error.message,
    });
  }
};

export default protect