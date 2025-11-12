import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Reviews = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Animate clients count from 0 to 50
    const clientsInterval = setInterval(() => {
      setClientsCount((prev) => {
        if (prev >= 50) {
          clearInterval(clientsInterval);
          return 50;
        }
        return prev + 1;
      });
    }, 50);

    // Animate rating from 0 to 5.0
    const ratingInterval = setInterval(() => {
      setRating((prev) => {
        if (prev >= 5.0) {
          clearInterval(ratingInterval);
          return 5.0;
        }
        return Math.min(prev + 0.1, 5.0);
      });
    }, 100);

    return () => {
      clearInterval(clientsInterval);
      clearInterval(ratingInterval);
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      image: "https://via.placeholder.com/100x100?text=Priya",
      message:
        "Absolutely loved my manicure at NailsRe! The staff is so professional and the results are amazing. My nails look perfect and lasted for weeks. Highly recommend!",
      rating: 5,
    },
    {
      id: 2,
      name: "Anjali Patel",
      image: "https://via.placeholder.com/100x100?text=Anjali",
      message:
        "Best nail salon in town! I got gel extensions and they look so natural. The atmosphere is clean and relaxing. Will definitely be back for more services.",
      rating: 5,
    },
    {
      id: 3,
      name: "Kavita Singh",
      image: "https://via.placeholder.com/100x100?text=Kavita",
      message:
        "NailsRe exceeded my expectations! The nail art was creative and beautiful. The prices are reasonable and the service is top-notch. Five stars!",
      rating: 5,
    },
    {
      id: 4,
      name: "Meera Joshi",
      image: "https://via.placeholder.com/100x100?text=Meera",
      message:
        "I've been coming here for months now. The pedicure is always perfect and the staff remembers my preferences. Such a welcoming place!",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-pink-50 min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-3xl font-bold text-center mb-12 text-pink-800 dark:text-pink-400"
          style={{ fontFamily: "cursive" }}
        >
          Customer Reviews
        </h1>

        {/* Statistics Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center dark:bg-gray-800 dark:shadow-gray-900">
              <div className="text-4xl font-bold text-pink-600 mb-2 dark:text-pink-400">
                {rating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 font-medium dark:text-gray-300">
                Average Rating
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center dark:bg-gray-800 dark:shadow-gray-900">
              <div className="text-4xl font-bold text-pink-600 mb-2 dark:text-pink-400">
                {clientsCount}+
              </div>
              <p className="text-gray-600 font-medium dark:text-gray-300">
                Happy Clients Served
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-6 dark:bg-gray-800 dark:shadow-gray-900"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-200"
              />
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mr-4 dark:text-gray-200">
                    {review.name}
                  </h3>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-600 leading-relaxed dark:text-gray-300">
                  {review.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
