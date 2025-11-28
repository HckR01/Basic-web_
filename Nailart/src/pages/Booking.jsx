import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, FileText } from 'lucide-react';
import './Booking.css';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Booking Data:', formData);
            alert(`Thank you, ${formData.name}! Your appointment request for ${formData.service} on ${formData.date} at ${formData.time} has been sent. We will confirm with you shortly.`);
            setFormData({
                name: '',
                phone: '',
                date: '',
                time: '',
                service: '',
                notes: ''
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="booking-page page-content">
            <div className="container">
                <div className="booking-container">
                    <div className="booking-header text-center">
                        <h1>Book Your Appointment</h1>
                        <p>Ready for a transformation? Fill out the form below to secure your spot.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label><User size={16} /> Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Full Name"
                                />
                            </div>
                            <div className="form-group">
                                <label><Phone size={16} /> Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><Calendar size={16} /> Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><Clock size={16} /> Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    required
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Service</label>
                            <select
                                name="service"
                                required
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="">Select a Service</option>
                                <option value="Acrylic Full Set">Acrylic Full Set</option>
                                <option value="Gel Extensions">Gel Extensions</option>
                                <option value="Gel Manicure">Gel Manicure</option>
                                <option value="Nail Art">Custom Nail Art</option>
                                <option value="Pedicure">Spa Pedicure</option>
                                <option value="Other">Other (Describe in notes)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label><FileText size={16} /> Special Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any specific design requests or allergies?"
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending Request...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
