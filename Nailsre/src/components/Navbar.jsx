import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  // Initialize theme state synchronously
  const savedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "dark");

  useEffect(() => {
    // Sync the DOM class with the state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <nav className="flex justify-between items-center pl-4 pr-8 py-4 bg-linear-to-r from-pink-50 to-pink-100 shadow-lg relative border z-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
      <span
        className="text-2xl font-bold text-pink-800 pl-4 hover:text-pink-900 transition-colors duration-300 dark:text-pink-400 dark:hover:text-pink-300"
        style={{ fontFamily: "cursive" }}
      >
        NailsRe
      </span>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="mr-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <span className="text-yellow-500 text-xl"></span>
        ) : (
          <span className="text-gray-800 text-xl"></span>
        )}
      </button>

      <button
        className="md:hidden text-gray-800 focus:outline-none hover:text-pink-600 transition-colors duration-300 dark:text-gray-200 dark:hover:text-pink-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          ></span>
        </div>
      </button>
      <ul
        className={`md:flex list-none m-0 p-0 space-x-6 ${
          isOpen
            ? "flex flex-col absolute top-full left-0 w-full bg-linear-to-r from-pink-50 to-pink-100 shadow-lg p-4 space-y-4 border-t border-pink-200 transition-all duration-300 ease-in-out z-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700"
            : "hidden"
        }`}
      >
        <li>
          <Link
            to="/"
            className="text-gray-800 hover:text-pink-600 font-medium transition-all duration-300 block py-2 px-4 rounded-md hover:bg-pink-200 dark:text-gray-200 dark:hover:text-pink-400 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            🏠 Home
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="text-gray-800 hover:text-pink-600 font-medium transition-all duration-300 block py-2 px-4 rounded-md hover:bg-pink-200 dark:text-gray-200 dark:hover:text-pink-400 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            🛍️ Shop
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            className="text-gray-800 hover:text-pink-600 font-medium transition-all duration-300 block py-2 px-4 rounded-md hover:bg-pink-200 dark:text-gray-200 dark:hover:text-pink-400 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📸 Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/reviews"
            className="text-gray-800 hover:text-pink-600 font-medium transition-all duration-300 block py-2 px-4 rounded-md hover:bg-pink-200 dark:text-gray-200 dark:hover:text-pink-400 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ⭐ Reviews
          </Link>
        </li>
        <li className="relative">
          <button
            className="text-gray-800 hover:text-pink-600 font-medium transition-all duration-300 block py-2 px-4 rounded-md hover:bg-pink-200 w-full text-left md:w-auto dark:text-gray-200 dark:hover:text-pink-400 dark:hover:bg-gray-700"
            onClick={() => setIsContactOpen(!isContactOpen)}
          >
            📞 Contact
          </button>
          {isContactOpen && (
            <ul className="md:absolute md:top-full md:left-0 md:bg-linear-to-r md:from-pink-50 md:to-pink-100 md:shadow-lg md:border md:border-pink-200 md:rounded-md md:p-2 md:space-y-1 md:z-50 ml-4 mt-2 space-y-2 md:ml-0 md:mt-0 dark:md:from-gray-800 dark:md:to-gray-900 dark:md:border-gray-700">
              <li>
                <a
                  href="https://wa.me/918850614922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 block py-1 px-2 rounded hover:bg-pink-100 dark:text-gray-300 dark:hover:text-pink-400 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_nailshre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 block py-1 px-2 rounded hover:bg-pink-100 dark:text-gray-300 dark:hover:text-pink-400 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@nailsre.com"
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 block py-1 px-2 rounded hover:bg-pink-100 dark:text-gray-300 dark:hover:text-pink-400 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Email
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
