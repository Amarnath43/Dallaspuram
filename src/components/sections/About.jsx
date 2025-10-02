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
                    <p className="text-lg mb-6">At Dallaspuram, we believe food is a celebration. Our name itself is a fusion—'Dallas' for the spirit of our home and 'puram,' a word for town or village, representing the community and tradition at the heart of Indian culture. Nestled in Aubrey, our one-of-a-kind outdoor setting invites you to dine under the open sky, surrounded by the sizzling sounds and aromatic spices of authentic desi street food. Every dish on our menu is a tribute to the bustling food stalls of India, crafted with passion and the freshest ingredients. Dallaspuram is more than a restaurant; it's a gathering place for friends and family to share stories, create memories, and savor an unforgettable culinary journey.</p>
                    <p className="text-lg">Join us at Dallaspuram, where every meal is a vibrant celebration of flavor, culture, and community. We can't wait to welcome you!</p>
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

export default About;
