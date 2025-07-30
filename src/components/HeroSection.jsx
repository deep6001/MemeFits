import React, { useEffect, useRef } from 'react';
import HeroImg from '../assets/heroImg.webp';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import HeroImg1 from '../assets/heroImg1.webp';
import HeroImg2 from '../assets/heroImg2.webp';
import { MoveRight } from 'lucide-react';

function HeroSection() {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const centerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

useEffect(() => {
  // Create timeline
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

  // Reset initial states before animating
  gsap.set([textRef.current, buttonRef.current, centerRef.current, leftRef.current, rightRef.current], { clearProps: 'all' });

  // Animate text & button first
  tl.from(textRef.current, { x: -80, opacity: 0 })
    .from(buttonRef.current, { y: 40, opacity: 1 }, "-=0.5") // opacity fixed to 0

    // Animate stacked images
    .from(centerRef.current, { y: 80, opacity: 0, scale: 0.9 }, "-=0.4")
    .from(leftRef.current, { y: 50, x: -50, opacity: 0, rotate: 0 }, "-=0.6")
    .to(leftRef.current, { rotate: -30, x: "-60%", y: 0, duration: 0.6 }, "-=0.5")
    .from(rightRef.current, { y: 50, x: 50, opacity: 0, rotate: 0 }, "-=0.8")
    .to(rightRef.current, { rotate: 30, x: "-40%", y: 0, duration: 0.6 }, "-=0.5");

  // Kill timeline when component unmounts
  return () => {
    tl.kill();
  };
}, []);

  return (
    <section className="w-full h-screen bg-white pt-16 ">
      <div className="max-w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-16">
        {/* Left Content */}
        <div ref={textRef} className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold  font-anton leading-tight text-gray-900">
            Make Your Outfit <br/><span className="text-blue-600 font-anton">Speak with MemeFits</span> 😎
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore unique MemeFits T-shirts that make you stand out. Wear the fun, wear the vibe!
          </p>

          <Link to="/shop">
            <button
              ref={buttonRef}
              className="mt-6 px-6 py-3  text-black border  cursor-pointer text-lg font-semibold hover:bg-black hover:text-white  transition-all duration-300 shadow-md"
            >
              Shop Now <MoveRight className="inline-block ml-2" />
            </button>
          </Link>
        </div>

        {/* Right Stacked Images */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Center T-shirt */}
          <img
            ref={centerRef}
            src={HeroImg}
            loading="eager"
            alt="MemeFits Hero"
            className="w-60 md:w-[500px] drop-shadow-xl relative z-20"
          />

          {/* Left T-shirt */}
          <img
            ref={leftRef}
            src={HeroImg1}
            loading="eager"
            alt=""
            className="w-60 md:w-[500px] absolute left-1/2 top-2 -translate-x-[60%] rotate-[-30deg] drop-shadow-md z-10"
          />

          {/* Right T-shirt */}
          <img
            ref={rightRef}
            src={HeroImg2}
            loading="eager"
            alt=""
            className="w-60 md:w-[500px] absolute left-1/2 top-2 -translate-x-[40%] rotate-[30deg] drop-shadow-md z-10"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
