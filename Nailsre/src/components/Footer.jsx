import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <Link to="/" className="footer-logo">
            Nail<span>Artistry</span>
          </Link>
          <p className="footer-desc">
            Elevating your style with exquisite nail art and premium care.
          </p>
          <div className="social-links">
            <a
              href="https://www.instagram.com/_nailshre/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/book">Book Appointment</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin size={18} />
              <span>Mumbai, Maharashtra, India</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+91 8850614922</span>
            </li>
            <li>
              <Mail size={18} />
              <span>shreyadhumale2007@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Nail Artistry. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
