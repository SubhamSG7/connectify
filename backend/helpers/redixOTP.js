import redisClient from "../connections/redis.js";
import User from "../model/userSchema.js";

export async function storeOTP(identifier, otp) {
  try {
    await redisClient.setEx(identifier, 180, otp);
    return true;
  } catch (error) {
    console.error("Error storing OTP:", error);
    throw new Error("Failed to store OTP in Redis.");
  }
}

export async function compareOTP(identifier, enteredOtp) {
  try {
    const storedOTP = await redisClient.get(identifier);
    if (storedOTP === enteredOtp) {
      // await redisClient.del(identifier);
      await User.findByIdAndUpdate(identifier, { verified: true });
      return { valid: true, message: "OTP is valid" };
    } else {
      return { valid: false, message: "Invalid or expired OTP" };
    }
  } catch (error) {
    console.error("Error validating OTP:", error);
    return { valid: false, message: "Error validating OTP" };
  }
}
