import React, { useState } from "react";
import Navbar from "./Navbar";

const BookNow = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    phoneNumber: "+91",
    service: "",
    hasReferral: false,
    referralName: "",
    referralNumber: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phoneNumber") {
      // Handle phone number formatting for India
      let phoneValue = value;

      // Always start with +91
      if (!phoneValue.startsWith("+91")) {
        phoneValue = "+91" + phoneValue.replace(/^\+91/, "");
      }

      // Only allow 10 digits after +91
      const digitsOnly = phoneValue.replace(/\D/g, "");
      const indianNumber = digitsOnly.substring(0, 12); // +91 + 10 digits

      // Format as +91XXXXXXXXXX
      if (indianNumber.length >= 3) {
        phoneValue = "+91" + indianNumber.substring(2, 12);
      } else {
        phoneValue = "+91";
      }

      setFormData((prev) => ({
        ...prev,
        [name]: phoneValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create WhatsApp message
    let message = `🅱️ *New Booking Request*\n\n`;
    message += `👤 *Full Name:* ${formData.fullName}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📱 *Phone Number:* ${formData.phoneNumber}\n`;
    message += `🎂 *Age:* ${formData.age}\n`;
    message += `💅 *Service:* ${formData.service}\n`;

    if (formData.hasReferral) {
      message += `👥 *Referred by:* ${formData.referralName}\n`;
      message += `📱 *Referral Contact:* ${formData.referralNumber}\n`;
    }

    message += `\n💅 *Please confirm this booking!*`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918850614922?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-pink-50 min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:shadow-gray-900">
          <h1
            className="text-3xl font-bold text-center mb-8 text-pink-800 dark:text-pink-400"
            style={{ fontFamily: "cursive" }}
          >
            Book Your Appointment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                maxLength="13"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="+91 Enter 10 digits"
              />
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                Enter your 10-digit mobile number (without country code)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name} - {service.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="hasReferral"
                  checked={formData.hasReferral}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-700 font-medium dark:text-gray-300">
                  I was referred by someone
                </span>
              </label>
            </div>

            {formData.hasReferral && (
              <div className="space-y-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
                    Referral Name
                  </label>
                  <input
                    type="text"
                    name="referralName"
                    value={formData.referralName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter referral person's name"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 dark:bg-pink-500 dark:hover:bg-pink-600"
            >
              📱 Send via WhatsApp
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6 dark:text-gray-400">
            We'll contact you via WhatsApp to confirm your booking!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
