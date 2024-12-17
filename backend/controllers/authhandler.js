import { decodeToken } from "../helpers/jwtToken.js";
import User from "../model/userSchema.js";

export async function authHandler(req, res) {
  const token = req?.cookies?.authToken;
  if (!token)
    return res
      .status(400)
      .json({ message: "Session Expired Please Login", status: false });
  const getUser = decodeToken(token);
  try {
    const userInDB = await User.findById(getUser._id);
    if (userInDB?.verified)
      return res.status(200).json({ message: "Valid", status: true });
    return res.status(401).json({
      message: "Please verify your OTP unless not allowed",
      status: false,
    });
  } catch (error) {
    return res.status(401).json({ message: "Not a valid User", status: false });
  }
}
