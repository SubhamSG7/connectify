import React from "react";
import logo from "../assets/logo.png";
function Header() {
  return (
    <header>
      <div className="h-[15vh] flex justify-between  bg-[#F5F0CD] text-[#111827] ">
        <div className="h-[100%] w-[100%]">
          <img src={logo} alt="server" className="h-32 w-32" />
        </div>
        <div className="flex gap-x-2  px-2">
          <button>Dekhlena</button>
          <button>About</button>
          <button>Signup</button>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
