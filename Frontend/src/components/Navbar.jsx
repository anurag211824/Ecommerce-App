import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext); // Access context values
  const [visible, setVisible] = useState(false); // Manage visibility of mobile menu
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo and app link */}
      <Link to="./">
        <img src={assets.logo} className="w-28" />
      </Link>

      {/* Main navigation links (hidden on small screens) */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline-custom" : "text-gray-700"
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive ? "underline-custom" : "text-gray-700"
            }
          >
            COLLECTION
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "underline-custom" : "text-gray-700"
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "underline-custom" : "text-gray-700"
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Search, profile, and cart icons */}
      <div className="flex items-center gap-6">
        {/* Search icon */}
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection"); // Navigate to collection page when search is clicked
          }}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />

        {/* Profile icon with dropdown */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {/* DropDown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-black">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart icon with item count */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()} {/* Display the cart item count */}
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt=""
          className="w-5 sm:hidden cursor-pointer"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Close button for sidebar */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>

          {/* Mobile navigation links */}
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2 pl-6 border ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700"
              }`
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2 pl-6 border ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700"
              }`
            }
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2 pl-6 border ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700"
              }`
            }
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className={({ isActive }) =>
              `py-2 pl-6 border ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-700"
              }`
            }
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
