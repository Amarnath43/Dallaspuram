import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import LazyImage from '../ui/LazyImage';

const MenuSection = ({ sectionRef }) => (
    <section id="menu" ref={sectionRef} className="py-14 bg-gray-800 overflow-hidden scroll-mt-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white"> <span className="text-amber-500">Menu</span></h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto">Our menu is packed with flavor, featuring a wide range of authentic Indian dishes and our famous House Specials, all served in our unique outdoor setting.</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <AnimateOnScroll className="shadow-lg">
                    <LazyImage
                        src="https://placehold.co/800x1100/333333/FFFFFF?text=Menu+Page+1"
                        alt="Menu Card Page 1"
                        wrapperClassName="aspect-[8/11]"
                        className="object-contain"
                    />
                </AnimateOnScroll>
                <AnimateOnScroll className="shadow-lg" style={{ transitionDelay: '200ms' }}>
                    <LazyImage
                        src="https://placehold.co/800x1100/333333/FFFFFF?text=Menu+Page+2"
                        alt="Menu Card Page 2"
                        wrapperClassName="aspect-[8/11]"
                        className="object-contain"
                    />
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

export default MenuSection;
