import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "Unauthorized" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ success: false, errorMessage: "Invalid Token!" });
    }
    req.userId = decode.id; // Add userId to the request object
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
