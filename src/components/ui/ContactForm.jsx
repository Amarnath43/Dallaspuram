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

    const p = fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      return data;
    });

    // Toast with loading/success/error
    toast.promise(p, {
      loading: 'Sending message…',
      success: 'Message sent! We’ll get back to you soon.',
      error: (err) => err.message || 'Failed to send message',
    });

    try {
      await p;
      // reset form only on success
      setFormData({ name: '', email: '', phone: '', subject: subjectDefault, message: '' });
    } catch {
      toast.error(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="Your Name" required
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="Your Email" required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div>
          <input
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            placeholder="Your Phone" required
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>
      <input type="hidden" name="subject" value={formData.subject} />
      <div>
        <textarea
          name="message" rows="5" value={formData.message} onChange={handleChange}
          placeholder="Your Message" required
          className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
}
