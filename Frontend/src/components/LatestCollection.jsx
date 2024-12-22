import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Access product data from context
  const [latestProducts, setLatestProducts] = useState([]); // State to store the latest products

  useEffect(() => {
    // Set the first 10 products as the latest products on component mount
    setLatestProducts(products.slice(0, 10));
  }, [products]); // Depend on products to update when context changes

  return (
    <div className="my-10">
      {/* Section title */}
      <div className="text-center py-18 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-3">
          Explore our new arrivals and timeless classics, designed for style and
          quality!
        </p>
      </div>

      {/* Grid layout to render product items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index} // Unique key for each product
            id={item._id} // Product ID
            image={item.image} // Product image
            name={item.name} // Product name
            price={item.price} // Product price
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
