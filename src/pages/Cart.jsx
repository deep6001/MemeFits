import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../Store/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left: Items */}
            <div className="w-full lg:w-2/3">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 border-b pb-6"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-md bg-gray-100"
                    />

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-semibold mt-2">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-full lg:w-1/3 border p-6 rounded-lg bg-gray-50 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between border-t pt-3 mt-3">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">₹{subtotal}</p>
              </div>

              <button
                className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800"
               
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-20 text-lg">
            Your cart is empty 😢
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
