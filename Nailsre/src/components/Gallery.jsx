import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());
  const imageRefs = useRef([]);

  const handleImageError = (index) => {
    setImageErrors((prev) => new Set([...prev, index]));
  };

  const galleryImages = [
    {
      src: "https://via.placeholder.com/400x300/ff7f50/ffffff?text=French+Manicure",
      alt: "Elegant French Manicure",
      size: "large", // spans 2 columns and 2 rows - BIG
    },
    {
      src: "https://via.placeholder.com/200x200/ffb6c1/000000?text=Nail+Art+2",
      alt: "Nail Art Design",
      size: "small", // small square
    },
    {
      src: "https://via.placeholder.com/300x400/ff1493/ffffff?text=Nail+Art+3",
      alt: "Gel Polish Application",
      size: "tall", // tall image
    },
    {
      src: "https://via.placeholder.com/200x200/ffc0cb/000000?text=Nail+Art+4",
      alt: "Nail Care Treatment",
      size: "small", // small square
    },
    {
      src: "https://via.placeholder.com/400x300/ff69b4/ffffff?text=Nail+Art+5",
      alt: "Colorful Nail Art",
      size: "large", // spans 2 columns and 2 rows - BIG
    },
    {
      src: "https://via.placeholder.com/250x350/ffb6c1/000000?text=Nail+Art+6",
      alt: "Professional Manicure",
      size: "tall", // tall image
    },
    {
      src: "https://via.placeholder.com/200x200/ff1493/ffffff?text=Nail+Art+7",
      alt: "Nail Extension Work",
      size: "small", // small square
    },
    {
      src: "https://via.placeholder.com/400x250/ffc0cb/000000?text=Nail+Art+8",
      alt: "Beauty Salon Interior",
      size: "wide", // wide image
    },
    {
      src: "https://via.placeholder.com/200x200/ff69b4/ffffff?text=Nail+Art+9",
      alt: "Nail Polish Collection",
      size: "small", // small square
    },
    {
      src: "https://via.placeholder.com/300x300/ffb6c1/000000?text=Nail+Art+10",
      alt: "Client Consultation",
      size: "square", // regular square
    },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleImages((prev) => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getGridClasses = (size) => {
    switch (size) {
      case "large":
        return "col-span-1 md:col-span-2 row-span-1 md:row-span-2";
      case "tall":
        return "col-span-1 row-span-1 md:row-span-2";
      case "wide":
        return "col-span-1 md:col-span-2 row-span-1";
      case "medium":
        return "col-span-1 row-span-1";
      case "square":
        return "col-span-1 row-span-1";
      case "small":
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div
      id="gallery"
      className="bg-pink-50 py-12 px-4 lg:px-8 dark:bg-gray-900"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-pink-800 mb-12 dark:text-pink-400"
          style={{ fontFamily: "cursive" }}
        >
          Our Gallery
        </h1>
        <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl mx-auto dark:text-gray-300">
          Explore our stunning collection of nail art and client
          transformations. Each piece showcases our creativity and attention to
          detail.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[150px] md:auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 dark:shadow-gray-900 ${getGridClasses(
                image.size
              )} ${
                visibleImages.has(index)
                  ? `opacity-100 translate-y-0 delay-${Math.min(
                      index * 100,
                      500
                    )}`
                  : "opacity-0 translate-y-8"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                onError={() => handleImageError(index)}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  imageErrors.has(index) ? "opacity-50" : ""
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
