// src/components/sections/Hero.jsx
import React, { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';
import { TypeAnimation } from 'react-type-animation';
import { Instagram } from 'lucide-react';
import { cldUrl, buildSrcSet } from '../../helper';

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


const offers = [
    {
        title: "First 50 Customers: FREE Snack!",
        description: "Be one of the first 50 customers and get a FREE Veg Samosa or Gobi 65 with any main course purchase.",
        id: "v1759399237/1_n1krj5.png",
        aspect: "4:3",          // matches your mobile design
    },
    {
        title: "Double Delight: BOGO 50% OFF!",
        description: "Buy any Tiffin (Idli, Dosa, etc.) and get the second one of equal or lesser value at 50% off.",
        id: "v1759399236/2_gqoedd.png",
        aspect: "4:3",
    },
    {
        title: "Future Flavor Card: 10% Off Next Visit!",
        description: "Make any purchase during our launch week and receive a card for 10% off your next order.",
        id: "v1759399241/3_bi9cwz.png",
        aspect: "4:3",
    },
];


export default function Hero({ sectionRef }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Central Time (CDT is -05:00). Adjust if needed.
    const grandOpeningDate = '2025-10-05T18:00:00-05:00';

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center md:bg-fixed pt-20 sm:pt-24 pb-10 scroll-mt-24"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3')",
            }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />

            <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center text-white">
                <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                    {/* Logo (responsive sizes) */}
                    <img
                        src={`https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,c_fit,w_180/v1759399237/logo_fuftwz.png`}
                        srcSet={`
              https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,c_fit,w_180/v1759399237/logo_fuftwz.png 180w,
              https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,c_fit,w_300/v1759399237/logo_fuftwz.png 300w,
              https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto:eco,c_fit,w_450/v1759399237/logo_fuftwz.png 450w
            `}
                        sizes="(max-width: 640px) 180px, 300px"
                        alt="Dallaspuram Logo"
                        className="w-45 sm:w-50 md:w-60 h-auto"
                        decoding="async"
                        fetchPriority="high"
                    />

                    {/* Heading + type line (no fixed height; avoid clipping) */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        <span className="text-gray-200">Dallaspuram:</span>
                        <span className="block text-orange-500 min-h-[5rem] sm:min-h-[5.25rem]  leading-tight">
                            <TypeAnimation
                                sequence={[
                                    'Where Dallas Grit Meets Desi Spice.',
                                    2500,
                                    'Authentic Indian Street Food.',
                                    2500,
                                    'Coming Soon to Aubrey!',
                                    2500,
                                ]}
                                wrapper="span"
                                speed={50}
                                cursor
                                repeat={Infinity}
                            />
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
                        Get ready, Aubrey! We&apos;re firing up the grills to bring you an unforgettable fusion of flavor. The countdown has begun!
                    </p>

                    <CountdownTimer targetDate={grandOpeningDate} />

                    <a
                        href="https://www.instagram.com/dallaspuram.aubrey?igsh=emlvNmdwamQwbDZv"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow us on Instagram"
                        className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-transform hover:scale-105 duration-300"
                    >
                        <Instagram className="w-5 h-5" />
                        Follow for Updates
                    </a>
                </div>

                {/* Offers Carousel */}
                <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Grand Opening Specials</h3>

                    <div className="grid rounded-xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden md:h-80">
                        {offers.map((offer, i) => (
                            <div
                                key={i}
                                // [IMPROVEMENT] Slides are stacked in the same grid cell instead of using absolute positioning.
                                className={`[grid-area:1/1] transition-all ease-in-out duration-700 ${i === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                                    }`}
                                aria-hidden={i !== currentSlide}
                                style={{ transitionDelay: i === currentSlide ? '150ms' : '0ms' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                    <div className="relative w-full">
                                        <img
                                            src={cldUrl(offer.id, { width: 415, aspect: offer.aspect })}
                                            alt={offer.title}
                                            className="w-full aspect-[4/3] md:aspect-auto md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center p-5 sm:p-6 bg-black/20 rounded-b-xl md:bg-transparent md:rounded-b-none md:rounded-r-xl">
                                        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400 mb-2">
                                            {offer.title}
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-200">{offer.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Carousel Dots */}
                    <div className="flex justify-center mt-5 sm:mt-6 space-x-3" role="tablist" aria-label="Offer slides">
                        {offers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-selected={i === currentSlide}
                                role="tab"
                                className={`w-3 h-3 rounded-full transition-transform duration-300 ${i === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-500 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}