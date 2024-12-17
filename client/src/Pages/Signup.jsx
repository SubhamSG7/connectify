import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInfo,
  checkValidation,
  clearError,
  clearInfo,
  sendSignupData,
} from "../Slices/signupSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Signup = () => {
  const dispatch = useDispatch();
  const { userInfo, validationError, error, backendResponse, loading } =
    useSelector((state) => state.SignupSlice);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(addInfo({ name: e.target.name, value: e.target.value }));
  };

  const handleBlur = (e) => {
    dispatch(checkValidation({ type: e.target.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(validationError).length > 0) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }
    dispatch(sendSignupData(userInfo));
  };

  useEffect(() => {
    const latestErrorKey = Object.keys(validationError).at(-1);
    if (latestErrorKey) {
      toast.error(validationError[latestErrorKey]);
    }
  }, [validationError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (backendResponse?.message === "Registered Successfully") {
      dispatch(clearInfo());
      navigate("/validateotp");
    }
  }, [backendResponse, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[65vh] bg-gradient-to-r from-[#ebe8dc] to-[#D6CFB4] ">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col w-[70%] sm:w-[50%] text-center justify-center items-center gap-5 p-[5%] rounded-xl m-[2%] shadow-2xl shadow-black bg-white"
      >
        <p className="text-sm sm:text-lg font-sans">Hey,There Welcome</p>
        <input
          id="name"
          type="text"
          placeholder="Name"
          name="name"
          className="text-center w-[80%] text-sm sm:text-base sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-center w-[80%] text-sm sm:text-base sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-center w-[80%] text-sm sm:text-base sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
        />
        <select
          id="countrycode"
          name="countrycode"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue=""
          className="text-center text-sm sm:text-base w-[80%] sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
        >
          <option value="" disabled>
            Country-Code
          </option>
          <option value="+91">+91 (India)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+61">+61 (Australia)</option>
        </select>
        <input
          id="mobile"
          type="tel"
          placeholder="Mobile"
          name="mobile"
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-center text-sm sm:text-base w-[80%] sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="text-center text-sm sm:text-base w-[80%] sm:w-[60%] border-gray-300 focus:outline-none  px-0 py-2 border-b-4 focus:border-b-[#F3C623] rounded-2xl"
        />
        <button
          type="submit"
          disabled={Object.keys(validationError).length > 0}
          className="mt-3 text-center w-[60%] text-sm sm:text-base sm:w-[40%]  bg-transparent font-serif border text-gray-500 font-semibold py-2 border-b-4 border-gray-300 hover:border-b-[#47663B] hover:text-[#47663B] transition-all bg-white "
        >
          {loading ? (
            <div className="flex justify-center">
              <PacmanLoader />
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
