import { decodeToken } from "../helpers/jwtToken.js";
import otpGenerator from "../helpers/otpGenerator.js";
import { storeOTP } from "../helpers/redixOTP.js";
import sendOTP from "../helpers/sendOTP.js";
import User from "../model/userSchema.js";

export async function resendOTP(req, res) {
  const token = req?.cookies?.authToken;
  if (!token) return res.status(400).json({ message: "Token Not Found" });
  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken)
      return res.status(400).json({ message: "Token Invalid" });
    const userDetails = await User.findById(decodedToken._id);
    const otp = otpGenerator();
    await sendOTP(userDetails?.email, otp);
    const otpStored = await storeOTP(
      decodedToken._id.toString(),
      otp.toString()
    );
    if (!otpStored) {
      return res
        .status(500)
        .json({ message: "Failed to store OTP. Please try again." });
    }
    res.status(200).json({ message: "OTP SuccesFully Send", valid: true });
  } catch (error) {
    console.log(error);
  }
}
