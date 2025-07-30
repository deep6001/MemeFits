import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "John Doe",
    text: "This product changed the way we manage our business. Highly recommended!",
    designation: "CEO, Company X",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sarah Williams",
    text: "Amazing experience! The customer support is top-notch.",
    designation: "Manager, Company Y",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Mike Johnson",
    text: "The features are exactly what we needed for our workflow.",
    designation: "CTO, Company Z",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Davis",
    text: "Super smooth experience. Worth every penny!",
    designation: "Founder, Startup A",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const TestimonialMarquee = () => {
  return (
    <div className="w-full bg-white py-10">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
      <Marquee   speed={50} gradient={false}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 text-center w-80 mx-4"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TestimonialMarquee;
