import React from "react";
import { Award, Heart, Clock } from "lucide-react";
import withCImage from "../assets/withC.jpg";
import "./About.css";

const About = () => {
  return (
    <div className="about-page page-content">
      <div className="container">
        <div className="about-header text-center mb-4">
          <h1>About The Artist</h1>
          <p>The passion and story behind Nail Artistry.</p>
        </div>

        <div className="about-content">
          <div className="about-image">
            <img src={withCImage} alt="Nail Artist" id="image" />
          </div>
          <div className="about-text">
            <h2>Hi, I'm Shreya</h2>
            <p>
              I have been a professional nail artist for over 5 years,
              specializing in intricate nail art and healthy nail care. My
              journey began in art school where I discovered my love for
              miniature painting, which naturally evolved into nail artistry.
            </p>
            <p>
              I believe that your nails are your best accessory. Whether you
              want a clean, natural look or a bold, artistic statement, I am
              dedicated to providing you with a personalized experience and
              results that exceed your expectations.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <Award size={24} color="#D4AF37" />
                <h3>1+ Years</h3>
                <p>Experience</p>
              </div>
              <div className="stat-item">
                <Heart size={24} color="#E8B4B8" />
                <h3>100 +</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <Clock size={24} color="#D4AF37" />
                <h3>Certified</h3>
                <p>Professional</p>
              </div>
            </div>
          </div>
        </div>

        <div className="certifications-section section text-center">
          <h2>Certifications & Training</h2>
          <div className="cert-list">
            <div className="cert-item">Master Nail Technician -2023</div>
            <div className="cert-item">Advanced Nail Artistry - 2024</div>
            <div className="cert-item">Hygiene & Safety Certified - 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
