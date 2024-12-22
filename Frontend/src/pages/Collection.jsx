import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  // Destructure necessary values from ShopContext
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false); // State to control visibility of filter section
  const [filterProducts, setFilterProducts] = useState([]); // State to store filtered products
  const [category, setCategory] = useState([]); // Selected categories for filtering
  const [subCategory, setSubCategory] = useState([]); // Selected sub-categories for filtering
  const [sortType, setSortType] = useState("relavent"); // State for sorting products

  // Toggle function for category filter
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // If category is already selected, remove it from the category list
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // Otherwise, add it to the category list
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Toggle function for sub-category filter
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // If sub-category is already selected, remove it from the sub-category list
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // Otherwise, add it to the sub-category list
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filters based on selected categories, sub-categories, and search query
  const applyFilter = () => {
    let productsCopy = products.slice(); // Create a shallow copy of the products array
    // Filter by category if categories are selected
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }
    // Filter by sub-category if sub-categories are selected
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    // Filter by search query if search exists
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilterProducts(productsCopy); // Update the filtered products
  };

  // Sort products based on selected sort type (low-high, high-low, or default)
  const sortProduct = () => {
    let fpCopy = filterProducts.slice(); // Create a shallow copy of the filtered products
    switch (sortType) {
      case "low-high":
        // Sort products from low to high price
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        // Sort products from high to low price
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        // Apply filters without sorting if the default option is selected
        applyFilter();
        break;
    }
  };

  // Re-run applyFilter whenever category, subCategory, search, or showSearch change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  // Re-run sortProduct whenever sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t">
      {/* Filter options */}
      <div className="min-w-60 mt-10">
        <p
          onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon} // Dropdown icon for filters
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} // Rotate icon when filters are shown
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-3 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gary-700">
            <p className="flex gap-2">
              <input type="checkbox" value={"Men"} onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 mt-3 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gary-700">
            <p className="flex gap-2">
              <input type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 mt-10">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          
          {/* Sort products dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)} // Change sort type
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
