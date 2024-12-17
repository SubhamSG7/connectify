import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { resendOTP, sendOTP } from "../Handlers/otpHandler";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, setBackendResponse, setLoading } from "../Slices/OtpSlice";
import { useNavigate } from "react-router-dom";

function ValidateOTP() {
  const inputRef = useRef([]);
  const { backendResponse, loading } = useSelector((state) => state.otpSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  function handleChange(e, index) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value.length === 1 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  function handlePrev(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      e.preventDefault();
      inputRef.current[index - 1].focus();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = inputRef.current.map((ele) => ele?.value || "").join("");
    if (data.length < 4) {
      toast.error("All fields are required.");
      return;
    }
    try {
      dispatch(setLoading(true));
      const response = await sendOTP(data);
      dispatch(setBackendResponse(response));
      dispatch(setLoading(false));

      if (response?.valid) {
        toast.success("OTP validated successfully!");
        dispatch(clearAll());
        navigate("/login");
      } else {
        toast.error(response?.message || "Failed to validate OTP.");
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      toast.error("Something went wrong. Please try again.");
      dispatch(setLoading(false));
    }
  }

  async function handleResend() {
    try {
      const response = await resendOTP();
      if (response?.valid) toast.success(response?.message);
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h3 className="text-center text-2xl text-gray-700">Validate OTP</h3>
        <div className="flex">
          {[...Array(4)].map((_, index) => (
            <input
              type="text"
              key={index}
              className="border border-cyan-900 w-10 h-10 text-center mx-1"
              maxLength={1}
              ref={(el) => (inputRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handlePrev(e, index)}
              aria-label={`OTP input ${index + 1}`}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 text-xl bg-cyan-900 text-white rounded hover:bg-orange-900"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <button
        onClick={handleResend}
        className="mt-4 text-blue-500 underline"
        disabled={loading}
      >
        Resend OTP
      </button>
    </div>
  );
}

export default ValidateOTP;
