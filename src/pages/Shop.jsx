import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Featured1 from "../assets/Featured1.webp";
import Featured2 from "../assets/Featured2.png";
import Featured3 from "../assets/Featured3.webp";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../Store/CartSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

export const allProducts = [
  {
    id: 1,
    name: "No Wifi No Life Tee",
    price: 699,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured1,
    description:
      "Stay connected in style with this premium cotton tee. Soft, breathable, and perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Sarcasm Loading Tee",
    price: 749,
    size: ["S", "M", "L", "XL"],
    color: "White",
    img: Featured2,
    description:
      "Show off your wit with this trendy sarcasm tee. Made with 100% cotton for all-day comfort.",
  },
  {
    id: 3,
    name: "Meme King Oversized",
    price: 799,
    size: ["M", "L", "XL"],
    color: "Black",
    img: Featured3,
    description:
      "Rule the meme world with this oversized fit tee. Designed for those who love comfort and style.",
  },
  {
    id: 4,
    name: "Work Hard Chill Tee",
    price: 699,
    size: ["S", "M", "L"],
    color: "White",
    img: Featured1,
    description:
      "A perfect balance of motivation and relaxation. Lightweight and comfortable for daily wear.",
  },
  {
    id: 5,
    name: "Weekend Vibes Tee",
    price: 749,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured2,
    description:
      "Capture the essence of weekends with this sleek and comfy tee. Ideal for outings and casual hangouts.",
  },
  {
    id: 6,
    name: "Vintage Oversized",
    price: 799,
    size: ["M", "L", "XL"],
    color: "White",
    img: Featured3,
    description:
      "Step back in style with this vintage-inspired oversized tee. Ultra-soft and breathable for all-day wear.",
  },
  {
    id: 7,
    name: "Mood Swings Tee",
    price: 699,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured1,
    description:
      "Express your mood with this soft and comfy tee. Perfect for any casual day.",
  },
  {
    id: 8,
    name: "404 Not Found Tee",
    price: 749,
    size: ["S", "M", "L"],
    color: "White",
    img: Featured2,
    description:
      "Techie vibes with a dash of humor. 100% cotton tee for the coder in you.",
  },
  {
    id: 9,
    name: "Procrastinator Club Tee",
    price: 799,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured3,
    description:
      "Join the club of productive procrastinators. Soft, durable, and effortlessly cool.",
  },
  {
    id: 10,
    name: "Netflix & Chill Tee",
    price: 699,
    size: ["S", "M", "L"],
    color: "White",
    img: Featured1,
    description:
      "A classic comfort-fit tee for your perfect binge-watching sessions.",
  },
  {
    id: 11,
    name: "Sleepyhead Tee",
    price: 749,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured2,
    description:
      "Designed for those who love their naps. Soft cotton fabric for everyday relaxation.",
  },
  {
    id: 12,
    name: "Zero Motivation Tee",
    price: 799,
    size: ["M", "L", "XL"],
    color: "White",
    img: Featured3,
    description:
      "Keep it real with this fun tee. Ideal for lazy weekends and casual hangouts.",
  },
  {
    id: 13,
    name: "Social Distancing Pro Tee",
    price: 699,
    size: ["S", "M", "L"],
    color: "Black",
    img: Featured1,
    description:
      "Stay safe and stylish with this witty social distancing tee.",
  },
  {
    id: 14,
    name: "Code Eat Sleep Tee",
    price: 749,
    size: ["S", "M", "L", "XL"],
    color: "White",
    img: Featured2,
    description:
      "Every developer's mantra on a super-soft, premium-quality tee.",
  },
  {
    id: 15,
    name: "Keyboard Warrior Tee",
    price: 799,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured3,
    description:
      "Perfect for online debaters and digital hustlers alike. Relaxed fit for all-day comfort.",
  },
  {
    id: 16,
    name: "FOMO Squad Tee",
    price: 699,
    size: ["S", "M", "L"],
    color: "White",
    img: Featured1,
    description:
      "Join the squad in this trendy cotton tee. Everyday comfort with a dash of humor.",
  },
  {
    id: 17,
    name: "Daily Sarcasm Dose Tee",
    price: 749,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured2,
    description:
      "A witty design on a durable, stylish tee. Be the life of the party (or the meme).",
  },
  {
    id: 18,
    name: "Battery Low Tee",
    price: 799,
    size: ["M", "L", "XL"],
    color: "White",
    img: Featured3,
    description:
      "For days when you're running on empty. Super comfy and lightweight.",
  },
  {
    id: 19,
    name: "Keep It Simple Tee",
    price: 699,
    size: ["S", "M", "L", "XL"],
    color: "Black",
    img: Featured1,
    description:
      "Minimalist style that speaks volumes. A must-have for your casual wardrobe.",
  },
  {
    id: 20,
    name: "Infinite Scroll Tee",
    price: 749,
    size: ["S", "M", "L"],
    color: "White",
    img: Featured2,
    description:
      "For social media addicts who can’t stop scrolling. 100% cotton and ultra-comfy.",
  },
];



const sizes = ["S", "M", "L", "XL"];
const colors = ["Black", "White"];

function ShopPage() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const itemsPerPage = 4;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // Animate title on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".shop-title ", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle filters
  const toggleSize = (size) => {
  setSelectedSizes((prev) =>
    prev.includes(size)
      ? prev.filter((s) => s !== size) // remove if selected
      : [...prev, size] // add if not selected
  );
  setCurrentPage(1); // reset pagination if needed
};

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  // Filter and sort products
  let filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
    return matchesSearch && matchesSize && matchesColor;
  });

  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <title>Shop | T-Shirt Store</title>
        <meta name="description" content="MemeFits - Trendy meme-themed t-shirts and apparel. Shop high-quality, stylish and affordable meme fashion online." />
      </Helmet>
      <section ref={sectionRef} className="w-full bg-white py-16 px-6 md:px-20 min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <h2 className="shop-title text-2xl font-bold text-gray-900 mb-6">Filters</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search T-Shirts..."
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Sort by price */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Sort by Price</h3>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Select</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <label
                    key={size}
                    className={`cursor-pointer px-4 py-2 border rounded-md text-sm font-medium
        ${selectedSizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>


            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Colors</h3>
              {colors.map((color) => (
                <label key={color} className="block text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <h2 className="shop-title text-2xl font-bold text-gray-900 mb-6">T-Shirt Collection</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const inCart = cartItems.find((item) => item.id === product.id);

                  return (
                    <div
                      key={product.id}
                      ref={(el) => (cardRefs.current[product.id] = el)}
                      className="Products group cursor-pointer overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div
                        onClick={() => navigate(`/shop/${product.id}`)}

                        className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
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
                        <p className="text-gray-600 mt-1">₹{product.price}</p>
                        <p className="text-sm text-gray-500">
                         Color | {product.color}
                        </p>

                        {/* Add to Cart or Quantity Controls */}
                        {inCart ? (
                          <div className="flex justify-center items-center gap-3 mt-3">
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
                            className="mt-3 bg-black text-white px-4 py-1 rounded cursor-pointer hover:bg-gray-800"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-3 text-center text-gray-500">No products found.</p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded ${currentPage === index + 1
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800"
                      }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopPage;
