// ContactForm.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', botfield: ''
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if this hidden field is filled, treat as spam and bail
    if (formData.botfield) return;

    // Basic email check (optional)
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email);
    if (!emailOk) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const params = {
      // Must match your EmailJS template variable names
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    const promise = emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TPL_CONTACT,
      params,
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY  }
    );

    setSending(true);
    toast.promise(promise, {
      loading: 'Sending message…',
      success: 'Message sent! We’ll get back to you soon.',
      error: (err) => err?.text || err?.message || 'Failed to send message. Please try again.',
    });

    try {
      await promise;
      setFormData({ name: '', email: '', phone: '', message: '', botfield: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg"
      noValidate
    >
      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="botfield"
        value={formData.botfield}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="sr-only">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="sr-only">Your Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Your Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Your Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors duration-300 text-base sm:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
