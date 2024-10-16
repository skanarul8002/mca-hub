import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex justify-between sticky bg-white top-0 flex-shrink-1 z-10 p-5 pl-4">
      <Link to="/">
        <h1 className="lg:ml-[100px] bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent sm:ml-[20px] text-xl font-semibold">
          MCA HUB
        </h1>
      </Link>

      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden px-4 py-2  rounded text-bg-gradient-to-r from-blue-600 to-red-600 "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div
          className={`w-1/2 absolute top-16 right-0  bg-white shadow-lg z-50 transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-start space-y-4 p-4 font-medium text-blue-600">
            <Link href="/" onClick={toggleDropdown}>
              <li className="hover:brightness-50 hover:cursor-pointer">Home</li>
            </Link>
            <Link href="/choose" onClick={toggleDropdown}>
              <li className="hover:brightness-50 hover:cursor-pointer">
                Login
              </li>
            </Link>
            <Link href="/Adminregister" onClick={toggleDropdown}>
              <li className="hover:brightness-50">Register</li>
            </Link>
            <Link href="/chooseasguest" onClick={toggleDropdown}>
              <li className="hover:brightness-50">Login as Guest</li>
            </Link>
          </ul>
        </div>
        {/*Larger Screen Sizes*/}
        <div className="hidden md:flex md:items-center md:w-auto w-full">
          <ul className="flex space-x-6 lg:mr-[100px] md:mr-[50px] mr-[5px] font-medium text-blue-600">
            <Link href="/">
              <li className="hover:brightness-50 hover:cursor-pointer">Home</li>
            </Link>
            <Link href="/choose">
              <li className="hover:brightness-50 hover:cursor-pointer">
                Login
              </li>
            </Link>
            <Link href="/Adminregister">
              <li className="hover:brightness-50">Register</li>
            </Link>
            <Link href="/chooseasguest">
              <li className="hover:brightness-50">Login as Guest</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
