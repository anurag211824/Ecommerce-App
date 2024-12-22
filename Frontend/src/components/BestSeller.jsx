import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext); // Access the product data from context.
  const [bestSeller, setBestSeller] = useState([]); // State to store the top 5 bestseller products.

  useEffect(() => {
    // Filter products to include only those marked as bestseller.
    const bestProducts = products.filter((item) => item.bestseller);

    // Store the top 5 bestseller products in the state.
    setBestSeller(bestProducts.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      {/* Section title */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-3">
          Our most loved and top-rated products, chosen just for you. Explore
          now!
        </p>
      </div>

      {/* Grid layout to display bestseller products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index} // Unique key for each product item.
            id={item._id} // Product ID.
            image={item.image} // Product image URL.
            name={item.name} // Product name.
            price={item.price} // Product price.
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
