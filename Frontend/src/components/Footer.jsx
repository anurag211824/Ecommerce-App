import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-28" />
          <p className="w-full text md:w-2/3 text-gray-600">
            "Discover a seamless shopping experience with Forever.
            Explore our wide range of high-quality products, exclusive deals,
            and fast delivery. We're committed to providing you with exceptional
            service and a hassle-free shopping journey. Stay connected and shop
            with confidence!"
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gary-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gary-600" >
                <li>+91 9334759512</li>
                <li>contactForever@gmail.com</li>
            </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center ">Copyright 2024@ forever.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
