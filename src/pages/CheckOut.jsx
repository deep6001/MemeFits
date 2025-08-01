import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CheckOut() {
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3, "Name must be at least 3 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().min(5, "Address too short").required("Address is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().matches(/^[0-9]{6}$/, "Must be a valid 6-digit ZIP code").required("ZIP Code is required"),
    cardNumber: Yup.string().matches(/^[0-9]{16}$/, "Must be 16-digit card number").required("Card Number is required"),
  });

  // Initial form values
  const initialValues = {
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
  };

  const handleSubmit = (values) => {
    console.log("Checkout Data: ", values);
    alert("Order placed successfully!");
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Form */}
          <div className="w-full lg:w-2/3">
            <div className="border p-6 rounded-lg shadow-md bg-gray-50">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block font-semibold">Full Name</label>
                    <Field name="fullName" type="text" className="w-full border p-2 rounded" />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-semibold">Email</label>
                    <Field name="email" type="email" className="w-full border p-2 rounded" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-semibold">Address</label>
                    <Field name="address" type="text" className="w-full border p-2 rounded" />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* City & Zip */}
                  <div className="flex gap-5">
                    <div className="w-1/2">
                      <label className="block font-semibold">City</label>
                      <Field name="city" type="text" className="w-full border p-2 rounded" />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="w-1/2">
                      <label className="block font-semibold">ZIP Code</label>
                      <Field name="zipCode" type="text" className="w-full border p-2 rounded" />
                      <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block font-semibold">Card Number</label>
                    <Field name="cardNumber" type="text" className="w-full border p-2 rounded" />
                    <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800"
                  >
                    Place Order
                  </button>
                </Form>
              </Formik>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3 border p-6 rounded-lg bg-gray-50 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
