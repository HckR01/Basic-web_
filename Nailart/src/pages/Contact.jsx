import React from "react";
import { Phone, Mail, MapPin, Instagram, Clock } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page page-content">
      <div className="container">
        <div className="contact-header text-center mb-4">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Visit us or drop a message.</p>
        </div>

        <div className="contact-container">
          <div className="contact-info-card">
            <h2>Contact Info</h2>
            <div className="info-item">
              <Phone className="icon" size={24} />
              <div>
                <h3>Phone</h3>
                <p>+91 88506149220</p>
              </div>
            </div>
            <div className="info-item">
              <Mail className="icon" size={24} />
              <div>
                <h3>Email</h3>
                <p>shreya2007@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="icon" size={24} />
              <div>
                <h3>Location</h3>
                <p>maharastra</p>
              </div>
            </div>
            <div className="info-item">
              <Instagram className="icon" size={24} />
              <div>
                <h3>Instagram</h3>
                <p>@_nailshre</p>
              </div>
            </div>

            <div className="hours-section">
              <h3>
                <Clock size={20} /> Opening Hours
              </h3>
              <ul>
                <li>
                  <span>Mon - Fri:</span> 9:00 AM - 7:00 PM
                </li>
                <li>
                  <span>Saturday:</span> 10:00 AM - 6:00 PM
                </li>
                <li>
                  <span>Sunday:</span> Closed
                </li>
              </ul>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5!2d73.0587!3d19.2971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b3c123456789%3A0x123456789abcdef!2sBhiwandi%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1623345678901!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Studio Location in Bhiwandi, Maharashtra"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
