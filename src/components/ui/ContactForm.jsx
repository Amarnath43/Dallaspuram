// ContactForm.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm({ subjectDefault = '' }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: subjectDefault, message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // This is a simulated API call. Replace this with your actual form submission logic.
    // We create a promise that resolves after 2 seconds to mimic a network request.
    const apiCallPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // To test a success, we resolve the promise.
        resolve('Success!');
        // To test an error, uncomment the line below and comment out the resolve() line.
        // reject(new Error('This is a simulated network error.'));
      }, 2000);
    });

    // Use toast.promise to automatically handle loading, success, and error states.
    toast.promise(apiCallPromise, {
      loading: 'Sending message…',
      success: 'Message sent! We’ll get back to you soon.',
      error: (err) => err.message || 'Failed to send message. Please try again.',
    });

    try {
      await apiCallPromise;
      // Reset form only on successful submission
      setFormData({ name: '', email: '', phone: '', subject: subjectDefault, message: '' });
    } catch (error) {
      // Error is already handled by toast.promise, but you can log it here if needed.
      console.error("Form submission failed:", error);
    }
  };

  return (
    // The form is now responsive with max-width, horizontal centering, and responsive padding.
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg"
    >
      <div>
        <label htmlFor="name" className="sr-only">Your Name</label>
        <input
          id="name"
          type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="Your Name" required
          // Added responsive text size for better readability on all devices
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
        />
      </div>
      {/* This grid stacks on mobile and becomes 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="sr-only">Your Email</label>
          <input
            id="email"
            type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="Your Email" required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Your Phone</label>
          <input
            id="phone"
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            placeholder="Your Phone" required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
          />
        </div>
      </div>
      <input type="hidden" name="subject" value={formData.subject} />
      <div>
        <label htmlFor="message" className="sr-only">Your Message</label>
        <textarea
          id="message"
          name="message" rows="5" value={formData.message} onChange={handleChange}
          placeholder="Your Message" required
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
        />
      </div>
      <button
        type="submit"
        // Button now has responsive padding and text size
        className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors duration-300 text-base sm:text-lg"
      >
        Send Message
      </button>
    </form>
  );
}
