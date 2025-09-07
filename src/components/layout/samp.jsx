import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

// --- Helper Data ---
const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#catering', label: 'Catering' },
    { href: '#gallery', label: 'Gallery'},
    { href: '#contact', label: 'Contact' },
];

const galleryImages = [
    { src: "https://placehold.co/500x700/000/fff?text=Masala+Dosa", aspectRatio: "aspect-[5/7]" },
    { src: "https://placehold.co/500x500/000/fff?text=Samosa+Chaat", aspectRatio: "aspect-square" },
    { src: "https://placehold.co/500x500/000/fff?text=Paneer+Frankie", aspectRatio: "aspect-square" },
    { src: "https://placehold.co/500x700/000/fff?text=Food+Truck+Vibes", aspectRatio: "aspect-[5/7]" },
    { src: "https://placehold.co/500x700/000/fff?text=Happy+Customers", aspectRatio: "aspect-[5/7]" },
    { src: "https://placehold.co/500x500/000/fff?text=Pav+Bhaji", aspectRatio: "aspect-square" },
    { src: "https://placehold.co/500x500/000/fff?text=Gobi+Manchurian", aspectRatio: "aspect-square" },
    { src: "https://placehold.co/500x700/000/fff?text=Hyderabadi+Biryani", aspectRatio: "aspect-[5/7]" }
];


// --- Sub-components ---

// A reusable component to animate elements as they scroll into view
const AnimateOnScroll = ({ children, className, animationClass = 'opacity-100 translate-y-0', initialClass = 'opacity-0 translate-y-5' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`${className} transition-all duration-700 ease-out ${isVisible ? animationClass : initialClass}`}>
            {children}
        </div>
    );
};

const LazyImage = ({ src, alt, className = 'object-cover', wrapperClassName = '' }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        let observer;
        if (imageRef.current) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        observer.unobserve(imageRef.current);
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(imageRef.current);
        }
        return () => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        };
    }, [src]);

    return (
        <div ref={imageRef} className={`bg-gray-700 rounded-lg overflow-hidden ${wrapperClassName}`}>
             <img
                src={imageSrc}
                alt={alt}
                className={`w-full h-full transition-opacity duration-500 ${imageSrc ? 'opacity-100' : 'opacity-0'} ${className}`}
                onLoad={(e) => e.target.style.opacity = 1}
            />
        </div>
    );
};

const ContactForm = ({ subjectDefault = '' }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: subjectDefault, message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: '', email: '', phone: '', subject: subjectDefault, message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone" required className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500" />
                </div>
            </div>
            <input type="hidden" name="subject" value={formData.subject} />
            <div>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-amber-500 focus:border-amber-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-colors duration-300">Send Message</button>
        </form>
    );
};

const Header = ({ isMenuOpen, setIsMenuOpen, activeSection, isScrolled }) => {
    const headerClasses = `bg-gray-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`;

    return (
        <>
            <header id="header" className={headerClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <a href="#home" className="text-3xl font-display font-bold text-white">Dallaspuram</a>
                        
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className={`nav-link text-lg font-medium hover:text-amber-500 ${activeSection === link.href.substring(1) ? 'active' : ''}`}>{link.label}</a>
                            ))}
                        </nav>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white z-50">
                            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Full screen menu overlay */}
            <div className={`fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                     {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-3xl font-medium text-white hover:text-amber-500 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                            style={{ transitionDelay: `${100 + index * 50}ms` }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

const Hero = ({ sectionRef }) => (
    <section id="home" ref={sectionRef} className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-tight mb-4">Authentic Indian Street Food</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300">From crispy Dosas to flavorful Chaat and our signature Biryani, get a taste of authentic Indian street food on wheels.</p>
            <a href="#menu" className="bg-amber-500 text-gray-900 font-bold py-4 px-10 rounded-lg text-lg hover:bg-amber-400 transition-colors duration-300 inline-block">View Menu</a>
        </div>
    </section>
);

const About = ({ sectionRef }) => (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <AnimateOnScroll>
                    <LazyImage 
                        src="https://placehold.co/600x700/333333/FFFFFF?text=Dallaspuram+Food+Truck" 
                        alt="Dallaspuram Food Truck"
                        wrapperClassName="aspect-[6/7]"
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

const MenuSection = ({ sectionRef }) => (
    <section id="menu" ref={sectionRef} className="py-24 bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Our Food Truck <span className="text-amber-500">Menu</span></h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto">Our menu is packed with flavor, featuring everything from breakfast Tiffins and Dosas to Bombay Chaat and our famous Truck Specials. Click to view our full menu.</p>
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

const Catering = ({ sectionRef }) => (
    <section id="catering" ref={sectionRef} className="py-24 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimateOnScroll className="text-center lg:text-left">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Event <span className="text-amber-500">Catering</span></h2>
                    <p className="text-lg mt-4 max-w-xl mx-auto lg:mx-0">
                        Bring the authentic flavors of Dallaspuram to your special events. From intimate gatherings to large celebrations, we offer customized catering packages. Fill out the form to get started.
                    </p>
                </AnimateOnScroll>
                <AnimateOnScroll className="bg-gray-800 p-8 rounded-lg shadow-lg">
                     <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">Request a Quote</h3>
                     <ContactForm subjectDefault="Catering Inquiry" />
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

const Gallery = ({ sectionRef }) => (
    <section id="gallery" ref={sectionRef} className="py-24 bg-gray-800 overflow-hidden">
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

const Contact = ({ sectionRef }) => (
    <section id="contact" ref={sectionRef} className="py-24 bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Get In <span className="text-amber-500">Touch</span></h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto">Follow our social media for our weekly location schedule or contact us for catering inquiries.</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-12">
                <AnimateOnScroll>
                    <h3 className="text-2xl font-bold text-white mb-4">Contact Details</h3>
                    <div className="space-y-4 text-lg">
                        <p className="flex items-center"><MapPin className="w-6 h-6 mr-3 text-amber-500" />Serving the Dallas-Fort Worth Area</p>
                        <p className="flex items-center"><Phone className="w-6 h-6 mr-3 text-amber-500" />+1 (940) 123-4567</p>
                        <p className="flex items-center"><Mail className="w-6 h-6 mr-3 text-amber-500" />contact@dallaspuram.com</p>
                    </div>
                     <div className="mt-8 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!m12!1m3!1d429177.3702118361!2d-97.16333331086257!3d32.82092957134835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sDallas%2C%2T!5e0!3m2!1sen!2sus!4v1694123456789!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dallas Area Map"
                        ></iframe>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll className="bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                    <ContactForm subjectDefault="General Inquiry" />
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-black py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-amber-500"><Facebook /></a>
                <a href="#" className="hover:text-amber-500"><Instagram /></a>
                <a href="#" className="hover:text-amber-500"><Twitter /></a>
            </div>
            <p>&copy; 2024 Dallaspuram. All Rights Reserved.</p>
        </div>
    </footer>
);

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const sectionRefs = {
        home: useRef(null), about: useRef(null), menu: useRef(null),
        catering: useRef(null), gallery: useRef(null), contact: useRef(null),
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            let currentSection = 'home';
            for (const sectionName in sectionRefs) {
                const ref = sectionRefs[sectionName];
                if (ref.current && window.scrollY >= ref.current.offsetTop - 150) {
                    currentSection = sectionName;
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            <style jsx global>{`
                html { scroll-behavior: smooth; }
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #111827;
                    color: #d1d5db;
                }
                .font-display { font-family: 'Playfair Display', serif; }
                .hero-bg {
                    background-image: linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop');
                    background-size: cover;
                    background-position: center;
                }
                .nav-link { position: relative; transition: color 0.3s ease; }
                .nav-link::after {
                    content: ''; position: absolute; width: 0; height: 2px;
                    bottom: -4px; left: 50%; transform: translateX(-50%);
                    background-color: #f59e0b; transition: width 0.3s ease;
                }
                .nav-link:hover::after, .nav-link.active::after { width: 100%; }
            `}</style>
            
            <Header 
                isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} 
                activeSection={activeSection} isScrolled={isScrolled} 
            />
            <main>
                <Hero sectionRef={sectionRefs.home} />
                <About sectionRef={sectionRefs.about} />
                <MenuSection sectionRef={sectionRefs.menu} />
                <Catering sectionRef={sectionRefs.catering} />
                <Gallery sectionRef={sectionRefs.gallery}/>
                <Contact sectionRef={sectionRefs.contact} />
            </main>
            <Footer />
        </>
    );
}

