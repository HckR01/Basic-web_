import React from 'react';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';
import './Contact.css';

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
                                <p>+1 234 567 890</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Mail className="icon" size={24} />
                            <div>
                                <h3>Email</h3>
                                <p>hello@nailartistry.com</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin className="icon" size={24} />
                            <div>
                                <h3>Location</h3>
                                <p>123 Fashion Street, City, Country</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Instagram className="icon" size={24} />
                            <div>
                                <h3>Instagram</h3>
                                <p>@nailartistry_studio</p>
                            </div>
                        </div>

                        <div className="hours-section">
                            <h3><Clock size={20} /> Opening Hours</h3>
                            <ul>
                                <li><span>Mon - Fri:</span> 9:00 AM - 7:00 PM</li>
                                <li><span>Saturday:</span> 10:00 AM - 6:00 PM</li>
                                <li><span>Sunday:</span> Closed</li>
                            </ul>
                        </div>
                    </div>

                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Studio Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
