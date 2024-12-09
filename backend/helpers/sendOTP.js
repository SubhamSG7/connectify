import nodemailer from "nodemailer";
import "dotenv/config";

const accountName = process.env.googleAppMail;
const accountPassword = process.env.googelAppPassword;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountName,
    pass: accountPassword,
  },
});

async function sendOTP(email, otp) {
  const mailOption = {
    from: accountName,
    to: email,
    subject: "OTP VERIFICATION",
    text: `Here is your OTP:${otp} valid for 3 mins`,
  };
  try {
    const info = await transporter.sendMail(mailOption);
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendOTP;
