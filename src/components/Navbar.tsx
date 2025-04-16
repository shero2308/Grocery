"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.jpg";
import { MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="font-rubik flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-md bg-white gap-4 md:gap-0">
      {/* Logo */}
      <div className="flex items-center">
        <Image src={logo} alt="Grocery App Logo" width={150} height={50} className="rounded-full" />
      </div>

      {/* Nav + Search */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex gap-6">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link>
          <Link href="/products" className="text-black hover:text-gray-600">Products</Link>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon aria-label="Search" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <ShoppingCartIcon 
              aria-label="Cart" 
              className="w-6 h-6 text-green-700 hover:text-green-500 cursor-pointer" 
            />
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                className="hover:scale-105 transition-transform"
              >
                <UserCircleIcon className="w-20 h-10 text-green-700 hover:text-green-500 cursor-pointer" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
