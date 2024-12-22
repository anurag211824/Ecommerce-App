import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SerachBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext); // Context values for search and visibility
  const [visible, setVisible] = useState(false); // Local state to control visibility of search bar
  const location = useLocation(); // Hook to get current route location

  useEffect(() => {
    // Show search bar only on the 'collection' page
    if (location.pathname.includes("collection")) {
      setVisible(true); // Set search bar visible
    } else {
      setVisible(false); // Hide search bar on other pages
    }
  }, [location]); // Re-run effect when the location changes

  return showSearch && visible ? (
    // Render search bar only if showSearch is true and visible is true
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-between border border-gray-300 bg-white shadow-sm px-4 py-2 mx-auto rounded-full w-11/12 sm:w-2/3 md:w-1/2">
        <input
          value={search} // Controlled input for search query
          onChange={(e) => setSearch(e.target.value)} // Update search query
          className="flex-1 outline-none bg-transparent text-gray-700 text-sm placeholder-gray-400"
          type="text"
          placeholder="Search"
        />
        <div className="flex items-center space-x-2">
          <img
            className="w-5 cursor-pointer"
            src={assets.search_icon} // Search icon
            alt="Search"
          />
          <img
            onClick={() => setShowSearch(false)} // Close search on click
            className="w-4 cursor-pointer"
            src={assets.cross_icon} // Close icon
            alt="Close"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default SerachBar;
