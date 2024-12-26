import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";

const Add = ({ token }) => {
  // State variables for storing image files
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // State variables for storing product details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men"); // Default category is 'Men'
  const [subCategory, setSubCategory] = useState("Topwear"); // Default subcategory is 'Topwear'
  const [bestseller, setBestseller] = useState(false); // Default bestseller status is false
  const [sizes, setSizes] = useState([]); // Stores selected sizes

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData(); // Create FormData object for sending files and data

      // Append product details to FormData
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to JSON string

      // Append image files to FormData if selected
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Send POST request to backend API
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/add`, // API endpoint
        formData,
        {
          headers: {
            token, // Attach authorization token in headers
          },
        }
      );
      console.log(response.data); // Log response data
    } catch (error) {
      console.log(error); // Log errors if any occur
    }
  };

  return (
    // Form layout
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image upload section */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {/* Image 1 */}
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])} // Update image1 state
            />
          </label>
          {/* Image 2 */}
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])} // Update image2 state
            />
          </label>
          {/* Image 3 */}
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])} // Update image3 state
            />
          </label>
          {/* Image 4 */}
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])} // Update image4 state
            />
          </label>
        </div>
      </div>

      {/* Product details inputs */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      {/* Product category and price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      {/* Submit button */}
      <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Add;