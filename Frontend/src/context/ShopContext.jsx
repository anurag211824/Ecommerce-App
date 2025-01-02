import { toast } from "react-toastify";
// import { products } from "../assets/frontend_assets/assets";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$"; // Currency symbol
  const delivery_fee = 10; // Fixed delivery fee
  const backEndUrl=import.meta.env.VITE_BACKEND_URL
  // State for search input and its visibility
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products,setproducts]=useState([])


  // State to store cart items
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // Add an item to the cart with selected size
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product size"); // Error if no size selected
      return;
    }

    // Create a copy of the cart items to update
    let cartData = structuredClone(cartItems);

    // If the item exists, update the quantity for the selected size
    if (cartItems[itemId]) {
      if (cartItems[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1; // Add new size
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1; // Add new item with size
    }

    setCartItems(cartData); // Update cart
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;

    // Loop through cart items and their quantities
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]; // Accumulate total count
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return totalCount;
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity; // Update quantity for specific item and size
    setCartItems(cartData); // Update cart
  };

  // Calculate the total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;

    // Loop through cart items and calculate total cost
    for (const items in cartItems) {
      let itemInfo = products.find((product) => items === product._id);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]; // Multiply price by quantity
          }
        } catch (error) {
          console.error("Error calculating cartAmount:", error);
        }
      }
    }
    return totalAmount; // Return total cart amount
  };

  // Log cart items on change
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  
  const getProductsData= async ()=>{
    try{
      const response=await axios.get(`${backEndUrl}/api/product/list`)
      console.log(response.data);

      
    }
    catch(error){

    }
  }
  useEffect(()=>{
   getProductsData()
  },[])
  return (
    <ShopContext.Provider
      value={{
        currency,
        delivery_fee,
        products,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,backEndUrl
      }}
    >
      {props.children} {/* Render child components */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
