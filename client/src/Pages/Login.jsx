import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearInfo,
  sendLoginCredetials,
  setLoginCredentials,
  validate,
} from "../Slices/LoginSlice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginCredentials, validationError, error, backendResponse, loading } =
    useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions
    if (Object.keys(validationError).length > 0) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }
    dispatch(sendLoginCredetials(loginCredentials));
  }

  useEffect(() => {
    if (backendResponse?.message === "Logged in") {
      dispatch(clearInfo());
      navigate("/");
    }
  }, [backendResponse, dispatch, navigate]);

  useEffect(() => {
    if (validationError && Object.keys(validationError).length > 0) {
      Object.values(validationError).forEach((error) => {
        toast.error(error);
      });
    }
    if (error) {
      toast.error(error);
    }
  }, [validationError, error]);

  return (
    <div className="flex justify-center items-center h-[30vh] sm:min-h-[65vh] bg-gradient-to-l from-[#ebe8dc] to-[#D6CFB4]">
      <form
        className="flex flex-col rounded-lg w-[50%] min-h-[60%] sm:h-[60%] gap-y-3 bg-white justify-center items-center text-xs shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h3 className="sm:text-xl font-serif">Login</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          disabled={loading}
          className={`sm:w-[50%] border-gray-300 focus:outline-none px-0 py-2 border-b-4 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "focus:border-b-[#A7D477]"
          } text-center rounded-2xl`}
          onChange={(e) =>
            dispatch(
              setLoginCredentials({
                name: e.target.name,
                value: e.target.value,
              })
            )
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          disabled={loading}
          className={`sm:w-[50%] border-gray-300 focus:outline-none px-0 py-2 border-b-4 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "focus:border-b-[#A7D477]"
          } text-center rounded-2xl`}
          onChange={(e) =>
            dispatch(
              setLoginCredentials({
                name: e.target.name,
                value: e.target.value,
              })
            )
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        <button
          type="submit"
          aria-busy={loading}
          disabled={loading}
          className={`w-[50%] bg-transparent font-serif border focus:outline-none font-semibold py-2 border-b-4 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-b-[#E38E49] hover:text-[#E38E49]"
          } transition-all bg-white text-black`}
        >
          {loading ? <BeatLoader /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
