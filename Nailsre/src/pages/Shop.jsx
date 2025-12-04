import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '@clerk/clerk-react';
import './Shop.css';

const products = [
    { id: 1, name: 'Luxury Press-On Set', price: 1200, category: 'Press-Ons', image: 'https://images.unsplash.com/photo-1632973542291-06e9f763e984?auto=format&fit=crop&w=800&q=80', rating: 5 },
    { id: 2, name: 'Cuticle Oil Pen', price: 500, category: 'Care', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
    { id: 3, name: 'Gel Polish Kit', price: 2500, category: 'Kits', image: 'https://images.unsplash.com/photo-1599693976860-15e8392138c7?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
    { id: 4, name: 'Nail Art Brushes', price: 800, category: 'Tools', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80', rating: 4.7 },
    { id: 5, name: 'Glass Nail File', price: 300, category: 'Tools', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
    { id: 6, name: 'Hand Cream', price: 600, category: 'Care', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
];

const Shop = () => {
    const { addToCart } = useCart();
    const { isSignedIn } = useUser();

    const handleAddToCart = (product) => {
        if (!isSignedIn) {
            alert("Please log in to add items to the cart");
            return;
        }
        addToCart(product);
    };

    return (
        <div className="shop-page page-content">
            <div className="container">
                <div className="shop-header text-center mb-4">
                    <h1>Shop Essentials</h1>
                    <p>Professional quality products for your nail care routine.</p>
                </div>

                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} loading="lazy" />
                                <span className="product-category">{product.category}</span>
                            </div>
                            <div className="product-info">
                                <div className="product-rating">
                                    <Star size={14} fill="#D4AF37" color="#D4AF37" />
                                    <span>{product.rating}</span>
                                </div>
                                <h3>{product.name}</h3>
                                <p className="product-price">₹{product.price.toFixed(2)}</p>
                                <button
                                    className="btn btn-primary btn-sm add-to-cart-btn"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    <ShoppingBag size={16} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
