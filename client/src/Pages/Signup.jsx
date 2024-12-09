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

const Signup = () => {
  const dispatch = useDispatch();
  const { userInfo, validationError, error, backendResponse } = useSelector(
    (state) => state.SignupSlice
  );
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
    <form onSubmit={handleSubmit}>
      <p>Welcome User</p>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <select
        id="countrycode"
        name="countrycode"
        required
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue=""
      >
        <option value="" disabled>
          Country-Code
        </option>
        <option value="+91">+91 (India)</option>
        <option value="+44">+44 (UK)</option>
        <option value="+1">+1 (USA)</option>
        <option value="+61">+61 (Australia)</option>
      </select>
      <label htmlFor="mobile">Mobile</label>
      <input
        id="mobile"
        type="tel"
        placeholder="Mobile"
        name="mobile"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button type="submit" disabled={Object.keys(validationError).length > 0}>
        Submit
      </button>
    </form>
  );
};

export default Signup;
