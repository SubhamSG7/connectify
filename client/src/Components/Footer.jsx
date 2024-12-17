import React from "react";

function Footer() {
  return (
    <footer>
      <div className="w-screen sm:w-screen flex flex-col gap-y-3 text-xs bg-black text-white sm:flex sm:flex-row sm:text-sm sm:h-[20vh] sm:justify-around">
        <div className="w-screen flex flex-col justify-center items-center sm:w-[30%] mt-2">
          <p className="hover:text-[#FCC737] hover:cursor-pointer">MEMBERS</p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">
            CONTRIBUTE
          </p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">FAQ</p>
        </div>
        <div className="w-screen flex flex-col justify-center items-center sm:w-[30%]">
          <p className="hover:text-[#FCC737] hover:cursor-pointer">
            CONNECT WITH US
          </p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">SAFETY</p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">
            PRIVACY POLICY
          </p>
        </div>
        <div className="w-screen flex flex-col justify-center items-center sm:w-[30%] mb-2">
          <p className="hover:text-[#FCC737] hover:cursor-pointer">
            COOKIE POLICY
          </p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">TOS</p>
          <p className="hover:text-[#FCC737] hover:cursor-pointer">
            COOKIE SETTINGS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
