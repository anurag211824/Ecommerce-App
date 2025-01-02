import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    // Destructuring the request body to extract product details
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Debugging log to check incoming files
    console.log("Files:", req.files);

    // Checking if image files exist and extracting them from req.files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // now we have to store these data and images in the database but in the database
    // we can not store the image,so first we have to uplaod these imagesa on cloudinary
    // and from the cloudinary we will get th url and we will store that url in our database

    // Creating an array of images while filtering out undefined values
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Uploading images to Cloudinary and collecting their URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image", // Uploading images as type 'image'
        });
        return result.secure_url; // Storing secure URL of uploaded image
      })
    );

    // Constructing the product data to be saved in the database
    const productData = {
      name, // Product name
      description, // Product description
      category, // Product category
      price: Number(price), // Converting price to number
      subCategory, // Product sub-category
      bestseller: bestseller === "true", // Converts string "true" to boolean true
      sizes: JSON.parse(sizes), // Parsing sizes (assumed to be a JSON string)
      image: imagesUrl, // Storing the image URLs from Cloudinary
      date: Date.now(), // Storing the current date and time
    };

    // Debugging log to check the product data
    console.log(productData);

    // Creating a new product object using the product data
    const product = new productModel(productData);

    // Saving the new product to the database
    await product.save();

    // Sending success response after successful product addition
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    // Logging the error if something goes wrong
    console.log(error);

    // Sending failure response with the error message
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// function for info of a single product
const singleProducts = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProducts };
