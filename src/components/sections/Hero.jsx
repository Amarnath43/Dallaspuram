// Hero.jsx
import React, { useState, useEffect } from 'react';
import CountdownTimer from '../ui/CountdownTimer';
import { TypeAnimation } from 'react-type-animation';

const offers = [
  {
    title: "First 50 Customers: FREE Snack with Any Main!",
    description: "Be one of the first 50 customers of the day and get a FREE Veg Samosa or Gobi 65 (mini) with the purchase of any Dosa, Frankie, or Fried Rice/Noodles!",
    image: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,dpr_auto,c_fill,g_auto,w_415,h_415/v1759399237/1_n1krj5.png`,
  },
  {
    title: "Double Delight: Buy 1 Get 1 HALF OFF on ALL Tiffins!",
    description: "Bring a friend or treat yourself! Purchase any Tiffin (Idli, Dosa, Uttapam) and get the second one (of equal or lesser value) at 50% off.",
    image: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,dpr_auto,c_fill,g_auto,w_415,h_415/v1759399236/2_gqoedd.png`,
  },
  {
    title: "Future Flavor Card: Get 10% Off Your Next Visit!",
    description: "Make a purchase during our launch week and receive a 'Future Flavor Card' for 10% off your next order, valid for one month!",
    image: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,dpr_auto,c_fill,g_auto,w_415,h_415/v1759399241/3_bi9cwz.png`,
  }
];

export default function Hero({ sectionRef }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((p) => (p === offers.length - 1 ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const grandOpeningDate = "2025-10-05T18:00:00-05:00";

  return (
    <section
      id="home"                                // 👈 anchor target
      ref={sectionRef}                         // 👈 using your prop ref
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20 scroll-mt-24"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3')` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="mb-8">
          <div className="h-[70px] flex justify-center items-center">
            <TypeAnimation
              sequence={["GRAND OPENING SOON!", 3000, "", 1000]}
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
            <a
              href="https://www.instagram.com/dallaspuram.aubrey?igsh=emlvNmdwamQwbDZv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-orange-500 transition duration-300"
            >
              {/* instagram svg */}
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 ..."/>
              </svg>
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-4">A Taste of What's to Come</h3>

          <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg">
            {offers.map((offer, i) => (
              <div
                key={i}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== currentSlide}
              >
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
                  <h4 className="text-xl font-bold mb-2">{offer.title}</h4>
                  <p className="text-sm text-gray-300 text-center">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2" role="tablist" aria-label="Offer slides">
            {offers.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === currentSlide}
                role="tab"
                className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? 'bg-orange-500' : 'bg-gray-500 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
