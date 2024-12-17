import axios from "axios";

const url = import.meta.env.VITE_BackendURL;

export async function profileHandler() {
  try {
    const response = await axios.get(`${url}/api/checkauth`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
