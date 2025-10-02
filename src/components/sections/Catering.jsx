import React, { useState } from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';

// Demo menu data for the catering item selection
const menuData = {
    "Tiffins": [
        { name: "Plain Idli", price: "$4.99" },
        { name: "Sambar Mini Idli", price: "$9.99" },
        { name: "Poori Bhaji", price: "$9.99" },
    ],
    "Dosa": [
        { name: "Plain Dosa", price: "$6.99" },
        { name: "Masala Dosa", price: "$8.99" },
        { name: "Onion Karam Dosa", price: "$9.99" },
        { name: "Ghee Karam Podi Dosa", price: "$10.99" },
    ],
    "Appetizers": [
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
    "Snacks": [
        { name: "Veg Samosa", price: "$2.99" },
        { name: "Chitti Punugulu", price: "$5.99" },
        { name: "Mirchi Bajji", price: "$6.99" },
    ]
};


const Catering = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', eventDate: '', eventTime: 'Lunch', guestCount: '', message: '' });
    const [selectedItems, setSelectedItems] = useState([]);
    const [showItemSelection, setShowItemSelection] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemSelect = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedItems(prev => [...prev, value]);
        } else {
            setSelectedItems(prev => prev.filter(item => item !== value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Catering Inquiry:", { ...formData, selectedItems });
        setSubmitted(true);
    };

    return (
        <section ref={ref} id="catering" className="py-24 bg-stone-900 overflow-hidden scroll-mt-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimateOnScroll>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-white">Event <span className="text-orange-500">Catering</span></h2>
                            <p className="text-lg mt-4 max-w-xl mx-auto lg:mx-0 text-gray-300">
                                Bring the authentic flavors of Dallaspuram to your special events. From intimate gatherings to large celebrations, we offer customized catering packages. Fill out the form to get started.
                            </p>
                            <div className="mt-8">
                                <img src="https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_475,h_475/v175.../c_zqbfeq.png"
                                    srcSet="
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_475,h_475/v1759399237/c_zqbfeq.png 475w,
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_950,h_950/v1759399237/c_zqbfeq.png 950w,
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fill,g_auto,w_1425,h_1425/v1759399237/c_zqbfeq.png 1425w
  " alt="Catering Spread" className="rounded-lg shadow-2xl w-full h-auto object-cover" />
                            </div>
                        </div>

                        <div className="bg-stone-800 p-8 rounded-lg shadow-lg">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <h3 className="text-3xl font-bold text-orange-500 mb-4">Thank You!</h3>
                                    <p className="text-lg text-gray-300">Your catering request has been sent. We'll be in touch with you shortly!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">Request a Quote</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                                        <input type="text" name="name" placeholder="Your Name *" required className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                                        <input type="tel" name="phone" placeholder="Your Phone *" required className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                                        <input type="email" name="email" placeholder="Your Email *" required className="w-full sm:col-span-2 bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                                        <input type="date" name="eventDate" className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                                        <select name="eventTime" className="w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange}>
                                            <option>Breakfast</option>
                                            <option>Lunch</option>
                                            <option>Dinner</option>
                                        </select>
                                        <input type="number" name="guestCount" placeholder="Guest count" className="sm:col-span-2 w-full bg-stone-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                                    </div>
                                    <textarea name="message" rows="4" placeholder="Additional message..." className="w-full bg-stone-700 text-white p-3 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange}></textarea>

                                    <button type="button" onClick={() => setShowItemSelection(!showItemSelection)} className="w-full mb-6 bg-orange-600 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg">
                                        {showItemSelection ? 'Hide Menu Items' : 'Choose Items for Your Event'}
                                    </button>

                                    {showItemSelection && (
                                        <div className="bg-stone-900 p-4 rounded-lg mb-6 max-h-64 overflow-y-auto">
                                            <h4 className="text-xl font-bold text-white mb-4">Select Items</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {Object.entries(menuData).map(([category, items]) => (
                                                    <div key={category}>
                                                        <h5 className="text-lg font-semibold text-orange-400 mb-2">{category}</h5>
                                                        <div className="space-y-2">
                                                            {items.map(item => (
                                                                <label key={item.name} className="flex items-center text-gray-300 cursor-pointer">
                                                                    <input type="checkbox" value={item.name} onChange={handleItemSelect} className="h-4 w-4 rounded bg-stone-700 border-gray-600 text-orange-500 focus:ring-orange-500" />
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

                                    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300 shadow-lg">
                                        Submit Catering Request
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
});

export default Catering;
