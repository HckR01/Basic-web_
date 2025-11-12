import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import VideoIntro from "./VideoIntro";
import About from "./About";
import Product from "./Product";
import Footer from "./Footer";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.section;
          setVisibleSections((prev) => new Set([...prev, sectionId]));
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900">
      <marquee
        className="text-center text-xs md:text-sm font-bold text-pink-700 mt-2 mb-1 px-4 lg:px-8 dark:text-pink-300"
        behavior="scroll"
        direction="left"
        scrollamount="12"
        loop="infinite"
      >
        Book your appointment here and get 20% off, share with friends and
        family! &nbsp;&nbsp;&nbsp; Book your appointment here and get 20% off,
        share with friends and family!
      </marquee>
      <Navbar />

      <div
        ref={(el) => (sectionRefs.current[0] = el)}
        data-section="video"
        className={`transition-all duration-1000 ${
          visibleSections.has("video")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <VideoIntro />
      </div>

      <div
        ref={(el) => (sectionRefs.current[1] = el)}
        data-section="about"
        className={`transition-all duration-1000 delay-200 ${
          visibleSections.has("about")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <About />
      </div>

      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        data-section="product"
        className={`transition-all duration-1000 delay-300 ${
          visibleSections.has("product")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <Product />
      </div>

      <div
        ref={(el) => (sectionRefs.current[3] = el)}
        data-section="footer"
        className={`transition-all duration-1000 delay-400 ${
          visibleSections.has("footer")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Home;
