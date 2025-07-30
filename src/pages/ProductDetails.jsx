import React from 'react';
import { allProducts } from './Shop';
import { addToCart } from '../Store/CartSlice';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';


function ProductDetails() {
    const { id } = useParams();
    const dispatch =useDispatch();
  const product = allProducts.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
    <Helmet>
      <title>MemeFits | {product.name}</title>
      <meta name="description" content={product.description} />
    </Helmet>
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-2">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Sizes */}
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Available Sizes:</h2>
            <div className="flex gap-3">
              {product.size}
            </div>
          </div>

          {/* Buttons */}
          <button

          onClick={()=>dispatch(addToCart(product))}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Extra Details */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p className="text-gray-700">
          100% cotton, machine washable, and designed for all-day comfort. 
          Perfect for casual outings, parties, and everyday wear. 
          This product is eligible for free returns within 7 days.
        </p>
      </div>
    </div>
    </>
  );
}

export default ProductDetails;
