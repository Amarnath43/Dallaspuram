import React, { useState } from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

// Demo menu data for the catering item selection
const menuData = {
    Tiffins: [
        { name: "Plain Idli", price: "$4.99" },
        { name: "Sambar Mini Idli", price: "$9.99" },
        { name: "Poori Bhaji", price: "$9.99" },
    ],
    Dosa: [
        { name: "Plain Dosa", price: "$6.99" },
        { name: "Masala Dosa", price: "$8.99" },
        { name: "Onion Karam Dosa", price: "$9.99" },
        { name: "Ghee Karam Podi Dosa", price: "$10.99" },
    ],
    Appetizers: [
        { name: "Veg Manchurian", price: "$10.99" },
        { name: "Gobi 65", price: "$10.99" },
        { name: "Chilli Chicken (Hyderabad Style)", price: "$11.99" },
        { name: "Chicken 555", price: "$11.99" },
    ],
    "Fried Rice / Noodles": [
        { name: "Veg Fried Rice", price: "$10.99" },
        { name: "Double Egg Fried Rice", price: "$11.99" },
        { name: "Chicken Hakka Noodles", price: "$12.99" },
        { name: "Double Egg Chicken Hakka Noodles", price: "$13.99" },
    ],
    "Truck Special": [
        { name: "Chicken Curry (with Roti/Poori/Chapathi)", price: "$12.99" },
        { name: "MLA Pesarattu", price: "$10.99" },
        { name: "Veg Kurma", price: "$9.99" },
    ],
    Snacks: [
        { name: "Veg Samosa", price: "$2.99" },
        { name: "Chitti Punugulu", price: "$5.99" },
        { name: "Mirchi Bajji", price: "$6.99" },
    ],
};

// Env (Vite or CRA)
const SERVICE_ID =
    import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_TPL_CATERING || process.env.REACT_APP_EMAILJS_TPL_CATERING;
const PUBLIC_KEY =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Optional: init once
if (PUBLIC_KEY) {
    emailjs.init({ publicKey: PUBLIC_KEY });
}

const Catering = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        eventTime: 'Lunch',
        guestCount: '',
        message: '',
        botfield: '', // honeypot
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [showItemSelection, setShowItemSelection] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemSelect = (e) => {
        const { value, checked } = e.target;
        setSelectedItems(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Honeypot: if filled, skip
        if (formData.botfield) return;

        // Validate envs
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setError('Email service not configured. Check your .env values and restart the dev server.');
            return;
        }

        // Required fields
        if (!formData.name || !formData.phone || !formData.email || !formData.message) {
            setError('Please fill all required fields.');
            return;
        }

        // Email format
        const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email);
        if (!emailOk) {
            setError('Please enter a valid email address.');
            return;
        }

        // Guest count
        if (formData.guestCount && Number(formData.guestCount) < 0) {
            setError('Guest count cannot be negative.');
            return;
        }

        // Build items string for {{selected_items}}
        const itemsStr = selectedItems.length ? selectedItems.join(', ') : '(no items selected)';

        // Map to your template's exact variable names (Option A)
        const params = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            eventDate: formData.eventDate || '(not specified)',
            eventTime: formData.eventTime,
            guestCount: formData.guestCount || '(not specified)',
            selected_items: itemsStr,
            message: formData.message,
        };

        const promise = emailjs.send(SERVICE_ID, TEMPLATE_ID, params);

        setSending(true);
        toast.promise(promise, {
            loading: 'Sending request…',
            success: 'Request sent! We’ll be in touch soon.',
            error: (err) => err?.text || err?.message || 'Failed to send. Please try again.',
        });

        try {
            await promise;
            // Clear form & selections (keep the form visible)
            setFormData({
                name: '',
                phone: '',
                email: '',
                eventDate: '',
                eventTime: 'Lunch',
                guestCount: '',
                message: '',
                botfield: '',
            });
            setSelectedItems([]);
            setShowItemSelection(false);
        } catch (err) {
            // already handled by toast
            console.error('EmailJS error:', err);
        } finally {
            setSending(false);
        }
    };

    return (
        <section ref={ref} id="catering" className="py-14 bg-stone-900 overflow-hidden scroll-mt-24 md:scroll-mt-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Event <span className="text-orange-500">Catering</span>
                            </h2>
                            <p className="text-lg mt-4 max-w-xl mx-auto lg:mx-0 text-gray-300">
                                Bring the authentic flavors of Dallaspuram to your special events. From intimate
                                gatherings to large celebrations, we offer customized catering packages. Fill out the
                                form to get started.
                            </p>
                            <div className="mt-8">
                                <img
                                    src="https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_475,h_475/v1759399237/c_zqbfeq.png"
                                    srcSet="
                    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_475,h_475/v1759399237/c_zqbfeq.png 475w,
                    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_950,h_950/v1759399237/c_zqbfeq.png 950w,
                    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_1425,h_1425/v1759399237/c_zqbfeq.png 1425w
                  "
                                    alt="Catering Spread"
                                    className="rounded-lg shadow-2xl w-full h-auto object-cover"
                                    width={475} height={475}
                                />
                            </div>
                        </div>

                        <div className="bg-stone-800 p-8 rounded-lg shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                                    Request a Quote
                                </h3>

                                {/* Honeypot */}
                                <input
                                    type="text"
                                    name="botfield"
                                    value={formData.botfield}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                    tabIndex="-1"
                                    autoComplete="off"
                                    aria-hidden="true"
                                />

                                {error && (
                                    <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 px-3 py-2 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        required
                                        className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Your Phone *"
                                        required
                                        className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        onChange={handleChange}
                                        value={formData.phone}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email *"
                                        required
                                        className="w-full sm:col-span-2 bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        onChange={handleChange}
                                        value={formData.email}
                                    />
                                    <div className="min-w-0">
                                        <input
                                            type="date"
                                            name="eventDate"
                                            className="w-full min-w-0 max-w-full bg-stone-700 text-white p-3 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-orange-500
                 appearance-none [color-scheme:dark] pr-10 text-base
                 overflow-hidden text-ellipsis"
                                            onChange={handleChange}
                                            value={formData.eventDate}
                                        />
                                    </div>
                                    <select
                                        name="eventTime"
                                        className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        onChange={handleChange}
                                        value={formData.eventTime}
                                    >
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                    </select>
                                    <input
                                        type="number"
                                        name="guestCount"
                                        placeholder="Guest count"
                                        className="sm:col-span-2 w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        onChange={handleChange}
                                        value={formData.guestCount}
                                        min="0"
                                    />
                                </div>

                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Additional message..."
                                    className="w-full bg-stone-700 text-white p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    onChange={handleChange}
                                    value={formData.message}
                                ></textarea>

                                <button
                                    type="button"
                                    onClick={() => setShowItemSelection(!showItemSelection)}
                                    className="w-full mb-6 bg-orange-600 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg"
                                >
                                    {showItemSelection ? 'Hide Menu Items' : 'Choose Items for Your Event'}
                                </button>

                                {showItemSelection && (
                                    <div className="bg-stone-900 p-4 rounded-lg mb-6 max-h-64 overflow-y-auto">
                                        <h4 className="text-xl font-bold text-white mb-4">Select Items</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {Object.entries(menuData).map(([category, items]) => (
                                                <div key={category}>
                                                    <h5 className="text-lg font-semibold text-orange-400 mb-2">
                                                        {category}
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {items.map(item => (
                                                            <label
                                                                key={item.name}
                                                                className="flex items-center text-gray-300 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    value={item.name}
                                                                    onChange={handleItemSelect}
                                                                    className="h-4 w-4 rounded bg-stone-700 border-gray-600 text-orange-500 focus:ring-orange-500"
                                                                    checked={selectedItems.includes(item.name)}
                                                                />
                                                                <span className="ml-3">{item.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-stone-900 p-4 rounded-lg mb-6">
                                    <h4 className="text-lg font-bold text-white mb-2">Summary</h4>
                                    <div className="min-h-[5rem] max-h-32 overflow-y-auto text-gray-400 pr-2">
                                        {selectedItems.length > 0 ? selectedItems.join(', ') : 'No items selected.'}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {sending ? 'Sending…' : 'Submit Catering Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
});

export default Catering;
