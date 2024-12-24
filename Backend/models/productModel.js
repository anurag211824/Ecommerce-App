import mongoose, { model } from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, required: true },
  date: { type: Number, required: true },
});
// using this  productSchemawe will create productModel
// if the productModel is already availabel then that model will be used
const productModel =
  mongoose.model.product || mongoose.model("product", productSchema);

export default productModel;