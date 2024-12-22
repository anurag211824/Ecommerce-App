import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
  const { currency } = useContext(ShopContext); // Retrieve the currency from the context

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}> {/* Link to product details page */}
      <div className='overflow-hidden'>
        <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out' /> {/* Product image with hover effect */}
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p> {/* Product name */}
      <p className='text-sm font-medium'>{currency}{price}</p> {/* Product price with currency */}
    </Link>
  );
};

export default ProductItem;
