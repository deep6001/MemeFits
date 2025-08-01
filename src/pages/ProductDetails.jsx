import React, { useState } from 'react';
import { allProducts } from './Shop';
import { addToCart, increaseQty, decreaseQty } from '../Store/CartSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

function ProductDetails() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState([]);
  const dispatch = useDispatch();

  const product = allProducts.find((product) => product.id === parseInt(id));

  // Access cart items from Redux
  const items = useSelector((state) => state.cart.items);

  // Check if the product is in the cart
  const inCart = items.find((item) => item.id === product?.id);

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
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Choose Size</h3>
                <div className="flex gap-3">
                  {product.size.map((s) => (
                    <label
                      key={s}
                      className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium
          ${selectedSize === s
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={s}
                        className="hidden"
                        checked={selectedSize === s}
                        onChange={() => setSelectedSize(s)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            {inCart ? (
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => dispatch(decreaseQty(product.id))}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span className="font-semibold">{inCart.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(product.id))}
                  className="px-3 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 mt-3"
              >
                Add to Cart
              </button>
            )}
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
