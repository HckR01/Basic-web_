import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Shop = () => {
  const services = [
    { name: "Classic Manicure", price: "Rs. 500" },
    { name: "Gel Manicure", price: "Rs. 800" },
    { name: "French Manicure", price: "Rs. 700" },
    { name: "Pedicure", price: "Rs. 600" },
    { name: "Gel Pedicure", price: "Rs. 900" },
    { name: "Nail Art", price: "Rs. 300" },
    { name: "Full Set Extensions", price: "Rs. 1500" },
    { name: "Nail Polish Application", price: "Rs. 200" },
    { name: "Nail removal and shaping", price: "Rs. 200" },
  ];

  return (
    <div className="bg-pink-50 min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-3xl font-bold text-center mb-8 text-pink-800 dark:text-pink-400"
          style={{ fontFamily: "cursive" }}
        >
          Our Services & Prices
        </h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:shadow-gray-900">
          <table className="w-full table-auto">
            <thead className="bg-pink-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-semibold text-pink-800 dark:text-pink-400">
                  Service
                </th>
                <th className="px-6 py-4 text-right text-lg font-semibold text-pink-800 dark:text-pink-400">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={index}
                  className="border-b border-pink-200 hover:bg-pink-50 transition-colors duration-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-200">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 text-right text-pink-600 font-bold dark:text-pink-400">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Contact us to book an appointment!
          </p>
          <Link
            to="/book-now"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 dark:bg-pink-500 dark:hover:bg-pink-600"
          >
            📅 Book Now
          </Link>
        </div>
      </div>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918850614922"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
        title="Contact us on WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </a>
    </div>
  );
};

export default Shop;
