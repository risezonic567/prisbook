import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authUser(req, res, next) {
  console.log("AUTH MIDDLEWARE HIT");

  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        result: "Fail",
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1]

    

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decode.data;

    // console.log(req.user)


    if (req.user.role?.toLowerCase() === "user") {
      next();
    } else {
      return res.status(403).send({
        result: "Fail",
        message: "Not Authorized"
      });
    }

  } catch (error) {
    return res.status(401).send({
      result: "Fail",
      message: "Invalid or Expired Token"
    });
  }
}