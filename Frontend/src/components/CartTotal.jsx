import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  // Extract currency, delivery fee, and cart amount calculation function from context.
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      {/* Section title */}
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Cart totals breakdown */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal display */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />

        {/* Shipping fee display */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />

        {/* Total amount display, conditionally handles empty cart */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
