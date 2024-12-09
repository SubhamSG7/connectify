import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.tokenSecret;

export function generateToken(data) {
  try {
    const token = jwt.sign(data, secretKey, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
}

export function decodeToken(token) {
  try {
    const decode = jwt.verify(token, secretKey);
    return decode;
  } catch (error) {
    console.log(error);
    return false;
  }
}
