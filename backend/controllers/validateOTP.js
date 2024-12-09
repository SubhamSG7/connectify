import { decodeToken } from "../helpers/jwtToken.js";
import { compareOTP } from "../helpers/redixOTP.js";

async function validateOTP(req, res) {
  try {
    const { otp } = req.body;
    const token = req.cookies?.authToken;

    // Input validations
    if (!token) return res.status(400).json({ message: "Session expired" });
    if (!otp) return res.status(400).json({ message: "Please Provide OTP!" });

    // Decode token and validate
    const getDetails = decodeToken(token);
    if (!getDetails) return res.status(400).json({ message: "Invalid token" });

    // Compare OTP
    const checkOTP = await compareOTP(getDetails._id.toString(), otp);
    if (!checkOTP.valid) return res.status(400).json(checkOTP);

    // Success response
    res.status(200).json(checkOTP);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default validateOTP;
