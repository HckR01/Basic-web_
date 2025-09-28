import React from "react";

const Input = () => {
  return (
    <div className="input-card">
      <div className="card-content">
        <label htmlFor="location" className="input-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="location-input"
          placeholder="Enter your location...."
        />
      </div>
    </div>
  );
};

export default Input;
