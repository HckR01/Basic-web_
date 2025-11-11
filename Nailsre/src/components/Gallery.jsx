import React from "react";
import Navbar from "./Navbar";

const Gallery = () => {
  const galleryImages = [
    "https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Nail+Art+1",
    "https://via.placeholder.com/400x300/FFC0CB/FFFFFF?text=Nail+Art+2",
    "https://via.placeholder.com/400x300/FF69B4/FFFFFF?text=Nail+Art+3",
    "https://via.placeholder.com/400x300/FF1493/FFFFFF?text=Nail+Art+4",
    "https://via.placeholder.com/400x300/FFB6C1/FFFFFF?text=Nail+Art+5",
    "https://via.placeholder.com/400x300/FFC0CB/FFFFFF?text=Nail+Art+6",
    "https://via.placeholder.com/400x300/FF69B4/FFFFFF?text=Nail+Art+7",
    "https://via.placeholder.com/400x300/FF1493/FFFFFF?text=Nail+Art+8",
  ];

  return (
    <div id="gallery" className="bg-pink-50 py-12 px-4 lg:px-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-pink-800 mb-12"
          style={{ fontFamily: "cursive" }}
        >
          Our Gallery
        </h1>
        <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Explore our stunning collection of nail art and client
          transformations. Each piece showcases our creativity and attention to
          detail.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={image}
                alt={`Nail Art ${index + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
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
