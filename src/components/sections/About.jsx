import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import LazyImage from '../ui/LazyImage';

const About = ({ sectionRef }) => (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-900 overflow-hidden scroll-mt-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <AnimateOnScroll>
                    <LazyImage
                        src="https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto:eco,c_fit/v1759399237/logo_fuftwz.png"
                        srcset="
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto:eco,c_fit,w_150/v1759399237/logo_fuftwz.png 150w,
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto:eco,c_fit,w_300/v1759399237/logo_fuftwz.png 300w,
    https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto:eco,c_fit,w_450/v1759399237/logo_fuftwz.png 450w
  "
                        sizes="150px"
                        alt="Dallaspuram"
                        width="150" height="150"
                        decoding="async"
                        fetchpriority="high"
                    />
                </AnimateOnScroll>
                <AnimateOnScroll>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Welcome to <span className="text-amber-500">Dallaspuram</span></h2>
                    <p className="text-lg mb-6">Dallaspuram is more than just a food truck; it's a culinary experience on wheels. We bring the vibrant street food culture of India to the heart of Dallas. Our menu is a celebration of flavors, featuring a wide array of Tiffins, Dosas, Bombay Chaat, and our special Truck Curries.</p>
                    <p className="text-lg">Our mission is to serve you the most authentic dishes, all prepared fresh with traditional recipes and the finest spices. Find us and taste the tradition!</p>
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

export default About;
