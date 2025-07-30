import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

function Policy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from(".policy-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".policy-title",
          start: "top 80%",
        },
      });

      // Animate each section (heading + content)
      gsap.utils.toArray(".policy-section").forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <Helmet>
      <title>Privacy Policy</title>
      <meta name="description" content="Privacy Policy for the MemeFits website" />
    </Helmet>
    <div
      ref={sectionRef}
      className="bg-white text-gray-900 min-h-screen py-16 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="policy-title text-4xl font-bold mb-8 text-center">
          Privacy & Policy
        </h1>

        {/* Introduction */}
        <p className="policy-section mb-6 text-gray-700 leading-relaxed text-lg">
          Welcome to our Privacy Policy page. Your privacy is critically
          important to us. This policy explains how we collect, use, and protect
          your information when you use our website and services.
        </p>

        {/* Section 1 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We may collect personal information such as your name, email
            address, shipping address, payment details, and purchase history. We
            also collect non-personal information such as device type, browser
            type, and browsing data to improve user experience.
          </p>
        </div>

        {/* Section 2 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To improve our website, products, and services</li>
            <li>To send promotional emails and offers (with your consent)</li>
            <li>To ensure the security of our platform</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Cookies and Tracking
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We use cookies and similar tracking technologies to analyze trends,
            administer the website, and track users’ movements around the site.
            You can choose to disable cookies in your browser settings.
          </p>
        </div>

        {/* Section 4 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We do not sell, rent, or trade your personal information with third
            parties. However, we may share your data with trusted service
            providers (e.g., payment gateways, shipping partners) to fulfill
            your orders.
          </p>
        </div>

        {/* Section 5 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Return & Refund Policy
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We accept returns within 7 days of delivery, provided the product is
            unused and in its original packaging. Refunds will be processed to
            the original payment method within 5-7 business days.
          </p>
        </div>

        {/* Section 6 */}
        <div className="policy-section">
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our policy, please contact us at{" "}
            <span className="font-semibold">support@yourwebsite.com</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Policy;
