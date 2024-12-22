import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* Contact Us Title Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Store Information Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Store Image */}
        <img
          src={assets.contact_img} // Image of the store
          className="w-full md:max-w-[480px]" // Responsive image width
          alt=""
        />
        
        {/* Store Details */}
        <div className="flex flex-col justify-center items-start gap-6">
          {/* Store Address */}
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            67 Shivalik Nagar <br />
            Suite 210, Haridwar, Uttarakhand, India
          </p>
          <p className="text-gray-500">
            Tel: 91+ 9334759512 <br />
            Email: admin@forever.com
          </p>

          {/* Careers Information */}
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings
          </p>

          {/* Explore Jobs Button */}
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            {" "}
            Explore jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box Component */}
      <NewsletterBox/>
    </div>
  );
};

export default Contact;
