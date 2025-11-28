import React from 'react';
import { Check } from 'lucide-react';
import './Services.css';

const servicesData = [
    {
        category: 'Nail Extensions',
        items: [
            { name: 'Acrylic Full Set', price: '₹2500', desc: 'Classic acrylic extensions with gel polish.' },
            { name: 'Gel Extensions', price: '₹3000', desc: 'Lightweight and flexible gel extensions.' },
            { name: 'Ombre Full Set', price: '₹3500', desc: 'Two-tone gradient effect.' },
            { name: 'Refill (Acrylic/Gel)', price: '₹2000', desc: 'Maintenance for your extensions.' },
        ]
    },
    {
        category: 'Manicure & Pedicure',
        items: [
            { name: 'Classic Manicure', price: '₹1000', desc: 'Cuticle care, shape, and polish.' },
            { name: 'Gel Manicure', price: '₹1500', desc: 'Long-lasting gel polish on natural nails.' },
            { name: 'Spa Pedicure', price: '₹2000', desc: 'Relaxing foot soak, scrub, and polish.' },
            { name: 'Gel Pedicure', price: '₹2500', desc: 'Durable gel polish for your toes.' },
        ]
    },
    {
        category: 'Nail Art & Add-ons',
        items: [
            { name: 'Simple Nail Art (per nail)', price: '₹200+', desc: 'Lines, dots, or simple patterns.' },
            { name: 'Intricate Nail Art (per nail)', price: '₹400+', desc: 'Hand-painted characters, flowers, etc.' },
            { name: 'French Tip Design', price: '₹500', desc: 'Classic or colored french tips.' },
            { name: 'Chrome / Holo Powder', price: '₹500', desc: 'Metallic or holographic finish.' },
            { name: 'Swarovski Crystals', price: '₹50/ea', desc: 'Genuine crystals for extra sparkle.' },
        ]
    }
];

const Services = () => {
    return (
        <div className="services-page page-content">
            <div className="container">
                <div className="services-header text-center mb-4">
                    <h1>Services & Pricing</h1>
                    <p>Transparent pricing for premium nail care services.</p>
                </div>

                <div className="services-container">
                    {servicesData.map((section, index) => (
                        <div key={index} className="service-category">
                            <h2>{section.category}</h2>
                            <div className="service-list">
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="service-item">
                                        <div className="service-details">
                                            <div className="service-name-row">
                                                <h3>{item.name}</h3>
                                                <span className="price">{item.price}</span>
                                            </div>
                                            <p>{item.desc}</p>
                                        </div>
                                        <button className="book-btn-small">Book</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="custom-request-section text-center section">
                    <h2>Have a specific design in mind?</h2>
                    <p>I love creating custom designs! Send me a picture or describe what you want.</p>
                    <a href="/contact" className="btn btn-primary">Request Custom Design</a>
                </div>
            </div>
        </div>
    );
};

export default Services;
