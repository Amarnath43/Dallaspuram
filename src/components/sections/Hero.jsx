import React from 'react';

const Hero = ({ sectionRef }) => (
    <section id="home" ref={sectionRef} className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-tight mb-4">Authentic Indian Street Food</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300">From crispy Dosas to flavorful Chaat and our signature Biryani, get a taste of authentic Indian street food on wheels.</p>
            <a href="#menu" className="bg-amber-500 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg hover:bg-amber-400 transition-colors duration-300 inline-block">View Menu</a>
        </div>
    </section>
);

export default Hero;
