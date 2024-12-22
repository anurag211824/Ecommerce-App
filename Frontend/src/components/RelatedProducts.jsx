import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext); // Access products from the context
  const [related, setRelated] = useState([]); // State to store filtered related products

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice(); // Create a shallow copy of products
      // Filter products by category and subCategory
      productsCopy = productsCopy.filter((item) => item.category === category);
      productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);
      setRelated(productsCopy.slice(0, 5)); // Set the first 5 related products
    }
  }, [products, category, subCategory]); // Re-run when products, category, or subCategory change

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* Render each related product */}
        {related.map((item, index) => (
          <ProductItem key={index} id={item._id} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
