import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { profileHandler } from "../Handlers/profileHandler";
import { useDispatch, useSelector } from "react-redux";
import { setProfileResponse } from "../Slices/ProfileSlice";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valid } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const headerContent = {
    valid: ["HOME", "GLOBAL", "PRIVATE", "PROFILE"],
    inValid: ["HOME", "ABOUT", "SIGNUP", "LOGIN"],
  };
  function handleClick(pathName) {
    if (pathName === "HOME") navigate("/");
    else navigate(`/${pathName.toLowerCase()}`);
  }
  function dynamiColor(buttonName) {
    const pathName = location.pathname;
    if (pathName === "/" && buttonName === "HOME") return "text-[#FCC737]";
    if (pathName.split("/")[1] === buttonName.toLowerCase())
      return "text-[#FCC737]";
    return "text-white";
  }
  useEffect(() => {
    async function handleProfileData() {
      const getProfile = await profileHandler();
      dispatch(setProfileResponse(getProfile));
    }
    handleProfileData();
  }, [location.pathname]);
  return (
    <header>
      <div className="h-[15vh] sm:h-[15vh] w-screen sm:w-screen sm:justify-between sm:text-xl flex-col sm:flex sm:flex-row  text-xs font-serif  bg-black text-white ">
        <div className="flex h-[50%] w-screen sm:w-[50vw] sm:h-[100%] sm:justify-start sm:pl-8 justify-center">
          <img src={logo} alt="server" className="sm:h-24 h-20" />
        </div>
        <div className="sm:flex sm:justify-evenly sm:w-[50vw] sm:h-[100%] h-[50%] w-screen flex justify-evenly mt-2 ">
          {headerContent[valid ? "valid" : "inValid"].map((val, index) => {
            return (
              <button
                className={`hover:text-[#FCC737] ${dynamiColor(val)}`}
                key={index}
                onClick={(e) => handleClick(val)}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
