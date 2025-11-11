import React from "react";
import cardImage from "../assets/card 2.jpg";

const About = () => {
  return (
    <div className="bg-pink-50 py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-pink-800 mb-8"
          style={{ fontFamily: "cursive" }}
        >
          About NailsRe
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
          <div className="w-full md:w-1/3">
            <div className="bg-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src={cardImage}
                alt="NailsRe Salon"
                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-semibold text-pink-700 mb-4">
              What We Do
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At NailsRe, we're passionate about nail art that enhances your
              beauty. Our expert technicians provide premium manicures,
              pedicures, extensions, and custom designs using top-quality
              products. Experience relaxation and style in a welcoming
              environment – book today for exceptional results!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
