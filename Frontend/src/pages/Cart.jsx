import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  // Destructure necessary values from the ShopContext
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]); // State to hold the formatted cart data

  useEffect(() => {
    const tempData = [];
    if (products.length > 0) {
    
      // Loop through cartItems and push valid items to tempData
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            // Ensure item quantity is positive
            tempData.push({
              _id: items, // Product ID
              size: item, // Product size
              quantity: cartItems[items][item], // Product quantity
            });
          }
        }
      }
    }
    // Generate cartData from the cartItems in the context

    setCartData(tempData); // Set formatted data to state
  }, [cartItems,products]); // Re-run whenever cartItems changes

  return (
    <div className="border-t pt-14">
      {/* Cart Header */}
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Loop through cartData to display each item in the cart */}
      <div>
        {cartData.map((item, index) => {
          // Find the corresponding product data from the products array
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Info: Image, Name, Price */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]} // Display the product's first image
                  alt={productData.name} // Product name as alt text
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name} {/* Product name */}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price} {/* Display product price */}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size} {/* Display product size */}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input: Update quantity */}
              <input
                onChange={(e) =>
                  // Update the quantity when the user enters a new value
                  e.target.value === "" || e.target.value == 0
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1} // Set minimum value to 1
                defaultValue={item.quantity} // Set default quantity to current cart value
              />

              {/* Remove Item: Click to remove item from cart */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)} // Set quantity to 0 (removes item)
                src={assets.bin_icon}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt="Remove item" // Alt text for accessibility
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal /> {/* Displays the total price of the cart */}
          <div className="w-full text-end">
            {/* Button to proceed to checkout page */}
            <button
              onClick={() => navigate("./place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
