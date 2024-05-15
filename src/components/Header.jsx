import { IoMoon, IoSunny } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import logo from "../../public/pokemon-logo-black-transparent.png";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "night");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lemonade" ? "night" : "lemonade"));
  };

  const dayTheme = theme === "lemonade";

  return (
    <nav>
      <div className="navbar bg-primary">
        <div className="navbar-start flex items-center lg:items-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold text-lg font-mono"
            >
              <li>
                <a href="/fight">Fight</a>
              </li>
              <li>
                <a href="/pokemon">Pokemon</a>
              </li>
              <li>
                <a href="/leaderboard">Leaderboard</a>
              </li>
            </ul>
          </div>
          <a href="/" className="ml-auto lg:ml-0">
            <img
              src={logo}
              alt="Pokemon Logo"
              className="logo btn btn-ghost text-xl ml-auto lg:ml-0 bg-transparent"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold text-lg font-mono">
            <li>
              <a href="/fight">Fight</a>
            </li>
            <li>
              <a href="/pokemon">Pokemon</a>
            </li>
            <li>
              <a href="/leaderboard">Leaderboard</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn" onClick={toggleTheme}>
            {dayTheme ? <IoMoon /> : <IoSunny />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
