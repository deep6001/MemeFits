import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Featured1 from '../assets/Featured1.png';
import Featured2 from '../assets/Featured2.png';
import Featured3 from '../assets/Featured3.png';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "No Wifi No Life Tee",
    price: "₹699",
    img: Featured1,
  },
  {
    id: 2,
    name: "Sarcasm Loading Tee",
    price: "₹749",
    img: Featured2,
  },
  {
    id: 3,
    name: "Meme King Oversized",
    price: "₹799",
    img: Featured3,
  },
];

function BestSeller() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".bestseller-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Cards animation
      gsap.from(".Cards", {
        y: 60,
        opacity: 0,
        duration: 0.3,
        
        
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="bestseller-title text-3xl md:text-4xl font-bold mb-10 text-gray-900">
          Featured Products / Best Sellers
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              
              className="Cards group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSeller;
