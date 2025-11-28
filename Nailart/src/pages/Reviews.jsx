import React, { useState } from 'react';
import { Star, User } from 'lucide-react';
import './Reviews.css';

const initialReviews = [
    { id: 1, name: 'Sarah J.', rating: 5, date: '2 days ago', text: 'Absolutely love my nails! The attention to detail is amazing. Will definitely be coming back.' },
    { id: 2, name: 'Emily R.', rating: 5, date: '1 week ago', text: 'Best nail tech in the city. My gel extensions lasted over 4 weeks without lifting!' },
    { id: 3, name: 'Jessica M.', rating: 4, date: '2 weeks ago', text: 'Great service and lovely atmosphere. Highly recommend the custom nail art.' },
];

const Reviews = () => {
    const [reviews, setReviews] = useState(initialReviews);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const review = {
                id: reviews.length + 1,
                ...newReview,
                date: 'Just now'
            };
            setReviews([review, ...reviews]);
            setNewReview({ name: '', rating: 5, text: '' });
            setIsSubmitting(false);
            alert('Thank you for your review!');
        }, 1000);
    };

    return (
        <div className="reviews-page page-content">
            <div className="container">
                <div className="reviews-header text-center mb-4">
                    <h1>Client Love</h1>
                    <p>Read what our beautiful clients have to say about their experience.</p>
                </div>

                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="avatar">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4>{review.name}</h4>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                </div>
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < review.rating ? "#D4AF37" : "none"}
                                            color={i < review.rating ? "#D4AF37" : "#ddd"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="review-text">"{review.text}"</p>
                        </div>
                    ))}
                </div>

                <div className="add-review-section section">
                    <div className="review-form-container">
                        <h2>Share Your Experience</h2>
                        <p>We'd love to hear from you!</p>

                        <form onSubmit={handleSubmit} className="review-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Rating</label>
                                <div className="rating-input">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={star <= newReview.rating ? 'active' : ''}
                                        >
                                            <Star size={24} fill={star <= newReview.rating ? "#D4AF37" : "none"} color={star <= newReview.rating ? "#D4AF37" : "#ddd"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Review</label>
                                <textarea
                                    required
                                    value={newReview.text}
                                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                    placeholder="Tell us about your visit..."
                                    rows="4"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Posting...' : 'Post Review'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
