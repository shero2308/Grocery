"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.jpg";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="font-rubik bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={130} height={50} className="rounded-full" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Center Nav (Desktop Only) */}
        {isLoggedIn && (
          <div className="hidden md:flex flex-1 justify-center items-center gap-6">
            <Link href="/" className="text-black hover:text-gray-600">Home</Link>
            <Link href="/products" className="text-black hover:text-gray-600">Products</Link>
            <Link href="/orders" className="text-black hover:text-gray-600">My Orders</Link>
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search product..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
        )}

        {/* Right side icons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && (
            <>
              <ShoppingCartIcon className="w-6 h-6 text-green-700 hover:text-green-500 cursor-pointer" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:scale-105 transition-transform"
                >
                  <UserCircleIcon className="w-8 h-8 text-green-700 hover:text-green-500" />
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
          )}
          {!isLoggedIn && (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link href="/" className="text-black hover:text-gray-600">Home</Link>
          <Link href="/products" className="text-black hover:text-gray-600">Products</Link>
          {isLoggedIn && (
            <Link href="/orders" className="text-black hover:text-gray-600">My Orders</Link>
          )}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="flex justify-between items-center">
            {isLoggedIn ? (
              <>
                <ShoppingCartIcon className="w-6 h-6 text-green-700 hover:text-green-500 cursor-pointer" />
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600 w-full"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
