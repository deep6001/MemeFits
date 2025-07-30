import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function WhyUsSection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = []; // Reset refs before animation

    const ctx = gsap.context(() => {
      // Title and paragraph animation
      gsap.from([".whyus-title", ".whyus-para"], {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Cards animation
      gsap.from(cardRefs.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white pb-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="whyus-title text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-500" />
          Why MemeFits?
        </h2>

        <p className="whyus-para text-lg text-gray-700 mb-6 leading-relaxed">
          We believe memes aren’t just to scroll — they’re meant to be worn.  
          MemeFits turns your daily dose of internet humor into bold, wearable statements.  
          High-quality cotton. Limited drops.  
          No cringe. All drip. 💧
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "🔥 Viral Designs", desc: "Fresh memes from Instagram, Reddit & more." },
            { title: "🧵 Premium Cotton", desc: "Soft, breathable, and made to last." },
            { title: "💯 Limited Drops", desc: "Once it's gone, it's gone. No restocks." },
          ].map((item, idx) => (
            <div
              key={idx}
              ref={(el) => cardRefs.current[idx] = el}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <span className="font-semibold text-blue-600 mb-2">{item.title}</span>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
