import axios from "axios";

const url = import.meta.env.VITE_BackendURL;
export async function sendOTP(data) {
  try {
    const resp = await axios.post(
      `${url}/api/signup/validateotp`,
      { otp: data },
      { withCredentials: true }
    );
    return resp?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export async function resendOTP() {
  try {
    const resp = await axios.get(`${url}/api/signup/resendotp`, {
      withCredentials: true,
    });
    return resp?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
