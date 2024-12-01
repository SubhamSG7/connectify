import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInfo, checkValidation } from "../Slices/signupSlice";
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const { userInfo, validationError } = useSelector(
    (state) => state.SignupSlice
  );
  useEffect(() => {
    let latestErrorKey = Object.keys(validationError).at(-1);
    if (latestErrorKey) toast.error(validationError[latestErrorKey]);
  }, [validationError]);
  return (
    <>
      <form>
        <p>Welcome User</p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e?.target?.value }))
          }
          onBlur={(e) => dispatch(checkValidation({ type: e.target.name }))}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(checkValidation({ type: e.target.name }))}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(checkValidation({ type: e.target.name }))}
        />
        <div>
          <select
            name="county-code"
            required
            onChange={(e) =>
              dispatch(addInfo({ name: e.target.name, value: e.target.value }))
            }
            onBlur={(e) => dispatch(checkValidation({ type: e.target.name }))}
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
          <input
            type="tel"
            placeholder="Mobile"
            name="mobile"
            onChange={(e) =>
              dispatch(
                addInfo({ name: e.target.name, value: e?.target?.value })
              )
            }
            onBlur={(e) => dispatch(checkValidation({ type: e.target.name }))}
          />
        </div>
        <input type="submit" />
      </form>
    </>
  );
}

export default Signup;
