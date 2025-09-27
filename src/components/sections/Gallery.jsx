import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import LazyImage from '../ui/LazyImage';

const galleryImages = [
    { src: "masala_dosa.png", aspectRatio: "aspect-[5/7]" },
    { src: "samosa_chat.png", aspectRatio: "aspect-square" },
    { src: "chicken_manchurian.png", aspectRatio: "aspect-square" },
    { src: "veg_friedrice.png", aspectRatio: "aspect-[5/7]" },
    { src: "chicken_noodles.png", aspectRatio: "aspect-[5/7]" },
    { src: "gulab_jamun.png", aspectRatio: "aspect-square" },
    { src: "chicken_frankie.png", aspectRatio: "aspect-square" },
    { src: "chicken_biryani.png", aspectRatio: "aspect-[5/7]" }
];

const Gallery = ({ sectionRef }) => (
    <section id="gallery" ref={sectionRef} className="py-24 bg-gray-800 overflow-hidden scroll-mt-30">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">A Glimpse of our <span className="text-amber-500">Creations</span></h2>
            </AnimateOnScroll>
            <div className="columns-2 md:columns-4 gap-4 space-y-4">
                {galleryImages.map((image, index) => (
                    <AnimateOnScroll key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                        <LazyImage src={image.src} alt={`Food creation ${index + 1}`} wrapperClassName={`w-full ${image.aspectRatio}`} />
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    </section>
);

export default Gallery;
