import { Router } from "express";
import User from "../model/userSchema.js";
import { generateToken } from "../helpers/jwtToken.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "USER NOT FOUND" });
    }
    if (!user?.verified)
      return res.status(400).json({ message: "OTP NOT VERIFIED" });

    const isMatched = await user.comparePassword(password);
    if (isMatched) {
      const token = generateToken({
        name: user.name,
        _id: user._id,
      });
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Logged in" });
    }
  } catch (error) {
    console.log(error);
  }
});
export default router;
