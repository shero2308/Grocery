import Image from "next/image";
import logo from "../assets/logo.jpg";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

// Simulate login status (replace this with real auth logic)
const isLoggedIn = true;

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-md bg-white gap-4 md:gap-0">
      
      {/* Logo */}
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={150} height={50} className="rounded-full" />
      </div>

      {/* Nav + Search */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex gap-6">
          <a href="" className="text-black hover:text-gray-600">Home</a>
          <a href="/products" className="text-black hover:text-gray-600">Products</a>
        </div>

        {/* Search with icon */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <ShoppingCartIcon className="w-6 h-6 text-green-700 hover:text-green-500 cursor-pointer" />
        )}
        <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-600">
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
