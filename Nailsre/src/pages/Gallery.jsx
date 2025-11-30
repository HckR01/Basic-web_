import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import './Gallery.css';

// Placeholder data for gallery images
const galleryItems = [
    { id: 1, category: 'Nail Art', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', title: 'Floral Elegance' },
    { id: 2, category: 'Extensions', image: 'https://images.unsplash.com/photo-1612887390768-fb02affea7a6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Long Acrylics' },
    { id: 3, category: 'Gel Polish', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80', title: 'Classic Red' },
    { id: 4, category: 'Bridal', image: 'https://images.unsplash.com/photo-1591926079847-8181980b0f09?q=80&w=689&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Wedding Day' },
    { id: 5, category: 'Nail Art', image: 'https://images.unsplash.com/photo-1720343409646-960f6dcccae3?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Abstract Lines' },
    { id: 6, category: 'Extensions', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80', title: 'Stiletto Shape' },
    { id: 7, category: 'Gel Polish', image: 'https://plus.unsplash.com/premium_photo-1671719428436-806b92f38a50?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Pastel Vibes' },
    { id: 8, category: 'Bridal', image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Soft Glam' },
];

const categories = ['All', 'Bridal', 'Gel Polish', 'Nail Art', 'Extensions'];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="gallery-page page-content">
            <div className="container">
                <div className="gallery-header text-center mb-4">
                    <h1>Our Portfolio</h1>
                    <p>Explore our collection of stunning nail designs and transformations.</p>
                </div>

                <div className="gallery-filters">
                    <div className="filter-icon">
                        <Filter size={20} />
                        <span>Filter:</span>
                    </div>
                    <div className="filter-buttons">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gallery-grid">
                    {filteredItems.map(item => (
                        <div key={item.id} className="gallery-item">
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <div className="gallery-overlay">
                                <h3>{item.title}</h3>
                                <span>{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
