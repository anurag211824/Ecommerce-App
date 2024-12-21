import { products } from "../assets/frontend_assets/assets";
import { createContext } from "react";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  return (
    <ShopContext.Provider value={{ currency,  delivery_fee,products}}>
        {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider