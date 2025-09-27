import React from 'react';
import { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';
import { TypeAnimation } from 'react-type-animation';


const offers = [
    {
        title: "First 50 Customers: FREE Snack with Any Main!",
        description: "Be one of the first 50 customers of the day and get a FREE Veg Samosa or Gobi 65 (mini) with the purchase of any Dosa, Frankie, or Fried Rice/Noodles!",
        image: "1.png",
    },
    {
        title: "Double Delight: Buy 1 Get 1 HALF OFF on ALL Tiffins!",
        description: "Bring a friend or treat yourself! Purchase any Tiffin (Idli, Dosa, Uttapam) and get the second one (of equal or lesser value) at 50% off.",
        image: "2.png",
    },
    {
        title: "Future Flavor Card: Get 10% Off Your Next Visit!",
        description: "Make a purchase during our launch week and receive a 'Future Flavor Card' for 10% off your next order, valid for one month!",
        image: "3.png",
    }
];

const Hero = React.forwardRef((props, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []); // Dependency array can be empty as offers.length is static

    const grandOpeningDate = "2025-10-05T18:00:00-05:00";

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20 scroll-mt-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <div className="mb-8">
                    <div className="h-[70px] flex justify-center items-center">
                        <TypeAnimation
                            sequence={[
                                'GRAND OPENING SOON!',
                                3000,
                                '',
                                1000,
                            ]}
                            wrapper="h1"
                            speed={8}
                            cursor={false}
                            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-orange-500 tracking-tight leading-tight mb-4"
                            repeat={Infinity}
                        />
                    </div>
                    <CountdownTimer targetDate={grandOpeningDate} />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
                        Dallaspuram: Where Dallas Grit Meets Desi Spice.
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
                        Get ready, Aubrey! We're firing up the grills to bring you an unforgettable fusion of flavor. Follow our journey for the official launch date and grand opening specials!
                    </p>
                    <div className="flex justify-center">
                        <a href="https://www.instagram.com/dallaspuram.aubrey?igsh=emlvNmdwamQwbDZv" target="_blank" aria-label="Instagram" className="text-gray-300 hover:text-orange-500 transition duration-300">
                            {/* Instagram SVG Icon */}
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.62c-2.403 0-2.73.01-3.69.055-1.144.053-1.623.22-1.992.373a3.272 3.272 0 00-1.15 1.15c-.153.37-.32 1.03-.373 1.992-.045.96-.055 1.287-.055 3.69s.01 2.73.055 3.69c.053 1.144.22 1.623.373 1.992a3.272 3.272 0 001.15 1.15c.37.153 1.03.32 1.992.373.96.045 1.287.055 3.69.055s2.73-.01 3.69-.055c1.144-.053 1.623-.22 1.992-.373a3.272 3.272 0 001.15-1.15c.153-.37.32-1.03.373-1.992.045-.96.055-1.287.055-3.69s-.01-2.73-.055-3.69c-.053-1.144-.22-1.623-.373-1.992a3.272 3.272 0 00-1.15-1.15c-.37-.153-1.03-.32-1.992-.373-.96-.045-1.287-.055-3.69-.055zm0 3.882a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg>
                        </a>

                    </div>
                </div>

                <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-4 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">A Taste of What's to Come</h3>
                    <div className="relative h-64 sm:h-180 overflow-hidden rounded-lg">
                        {offers.map((offer, index) => (
                            <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                                    <h4 className="text-xl font-bold mb-2">{offer.title}</h4>
                                    <p className="text-sm text-gray-300 text-center">{offer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4 space-x-2">
                        {offers.map((_, index) => (
                            <button key={index} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-orange-500' : 'bg-gray-500 hover:bg-gray-400'}`}></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Hero;