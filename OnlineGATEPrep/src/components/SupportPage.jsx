import { useState } from "react";
import { Link } from "react-router-dom";

function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log("Form submitted:", formData);
        setSubmitted(true);
        // Reset after some time or keep it submitted
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            {/* Navbar (Simplified for consistency, or reuse a Layout component if available) */}
            <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-gray-100">
                                Online<span className="text-blue-400">GetPrep</span>
                            </span>
                        </Link>
                        <nav className="hidden md:flex space-x-4">
                            <Link to="/" className="text-gray-300 hover:text-white">
                                Home
                            </Link>
                            <Link to="/topics" className="text-gray-300 hover:text-white">
                                Topics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-white mb-4">
                            Contact Support
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Have a question or need help? Fill out the form below and we'll get
                            back to you as soon as possible.
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="h-20 w-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    ✓
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Message Sent!
                                </h2>
                                <p className="text-gray-400 mb-8">
                                    Thank you for reaching out. Our team will review your message
                                    and respond shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-blue-400 hover:text-blue-300 font-medium underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-300 mb-2"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    >
                                        <option value="" disabled>
                                            Select a topic
                                        </option>
                                        <option value="general">General Inquiry</option>
                                        <option value="technical">Technical Issue</option>
                                        <option value="billing">Billing & Account</option>
                                        <option value="feedback">Feedback</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SupportPage;
