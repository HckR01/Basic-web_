import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Calendar, ShoppingBag } from 'lucide-react';
import heroImage from '../assets/hero.png';
import serviceExtensions from '../assets/service-extensions.png';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1>Elevate Your Style with <span className="highlight">Exquisite Nail Art</span></h1>
                        <p>Professional nail care and stunning designs tailored to your unique personality.</p>
                        <div className="hero-buttons">
                            <Link to="/book" className="btn btn-primary">Book Appointment</Link>
                            <Link to="/gallery" className="btn btn-outline">View Gallery</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={heroImage} alt="Elegant Nail Art" />
                        <div className="floating-card card-1">
                            <Star size={20} fill="#D4AF37" color="#D4AF37" />
                            <span>Premium Quality</span>
                        </div>
                        <div className="floating-card card-2">
                            <Calendar size={20} color="#E8B4B8" />
                            <span>Easy Booking</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="intro-section section container text-center">
                <h2>Welcome to Nail Artistry</h2>
                <p className="intro-text">
                    I am a passionate nail artist dedicated to bringing your nail dreams to life.
                    Whether you're looking for simple elegance or intricate designs, I provide
                    top-tier service using only the best products.
                </p>
            </section>

            {/* Featured Services */}
            <section className="featured-section section">
                <div className="container">
                    <h2 className="text-center mb-4">Featured Services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-img">
                                <img src={serviceExtensions} alt="Nail Extensions" />
                            </div>
                            <div className="service-info">
                                <h3>Nail Extensions</h3>
                                <p>Durable and natural-looking extensions to give you the length you desire.</p>
                                <Link to="/services" className="link-arrow">Learn More <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-img">
                                <img src="https://images.unsplash.com/photo-1754951661104-2a13d50d4741?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN1c3RvbSUyMG5haWx8ZW58MHx8MHx8fDA%3D" alt="Custom Nail Art" />
                            </div>
                            <div className="service-info">
                                <h3>Custom Nail Art</h3>
                                <p>Hand-painted designs, gems, and foils to make your nails a masterpiece.</p>
                                <Link to="/services" className="link-arrow">Learn More <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="service-img">
                                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80" alt="Gel Polish" />
                            </div>
                            <div className="service-info">
                                <h3>Gel Polish</h3>
                                <p>Long-lasting, chip-resistant color in a wide variety of shades.</p>
                                <Link to="/services" className="link-arrow">Learn More <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links-section section">
                <div className="container">
                    <div className="quick-links-grid">
                        <Link to="/gallery" className="quick-link-card">
                            <h3>Gallery</h3>
                            <p>Browse our portfolio</p>
                            <ArrowRight className="icon" />
                        </Link>
                        <Link to="/book" className="quick-link-card highlight">
                            <h3>Book Now</h3>
                            <p>Secure your slot</p>
                            <Calendar className="icon" />
                        </Link>
                        <Link to="/shop" className="quick-link-card">
                            <h3>Shop</h3>
                            <p>Nail care products</p>
                            <ShoppingBag className="icon" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
