import { Router } from "express";
import User from "../model/userSchema.js";
import otpGenerator from "../helpers/otpGenerator.js";
import sendOTP from "../helpers/sendOTP.js";
import { storeOTP } from "../helpers/redixOTP.js";
import { generateToken } from "../helpers/jwtToken.js";
import validateOTP from "../controllers/validateOTP.js";
import { resendOTP } from "../controllers/resenOTP.js";

const router = Router();

router.post("/", async (req, res) => {
  const incomingData = req.body;
  try {
    const newUser = new User(incomingData);
    const email = incomingData.email;
    const otp = otpGenerator();
    await newUser.save();
    const otpInfo = await sendOTP(email, otp);
    if (!otpInfo) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP. Please try again." });
    }
    const identifier = newUser._id;
    const otpStored = await storeOTP(identifier.toString(), otpInfo.toString());
    if (!otpStored) {
      return res
        .status(500)
        .json({ message: "Failed to store OTP. Please try again." });
    }
    const token = generateToken({
      name: newUser.name,
      _id: identifier,
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({
          message: "Please Check all the fields.",
          details: error.errors,
        });
    }
    res
      .status(500)
      .json({ message: "An unexpected error occurred. Please try again." });
  }
});

router.post("/validateotp", validateOTP);

router.get("/resendotp", resendOTP);

export default router;
