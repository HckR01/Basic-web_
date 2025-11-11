import React from "react";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";
import product6 from "../assets/product6.jpg";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Classic Red Nail Polish",
      price: "Rs. 250",
      image: product1,
    },
    {
      id: 2,
      name: "Nail Extensions Kit",
      price: "Rs. 1200",
      image: product2,
    },
    {
      id: 3,
      name: "Gel Polish Set",
      price: "Rs. 800",
      image: product3,
    },
    {
      id: 4,
      name: "Nail Art Tools",
      price: "Rs. 450",
      image: product4,
    },
    {
      id: 5,
      name: "French Manicure Set",
      price: "Rs. 650",
      image: product5,
    },
    {
      id: 6,
      name: "Nail Care Cream",
      price: "Rs. 300",
      image: product6,
    },
  ];

  return (
    <div className="bg-pink-50 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-pink-800 mb-12"
          style={{ fontFamily: "cursive" }}
        >
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover hover:brightness-110 transition-all duration-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-bold text-base">
                  {product.price}
                </p>
                <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#shop"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 inline-block"
          >
            Show More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
