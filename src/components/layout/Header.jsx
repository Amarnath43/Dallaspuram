import React from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#catering', label: 'Catering' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
];

const Header = ({ isMenuOpen, setIsMenuOpen, activeSection, isScrolled }) => {
    const headerClasses = `bg-gray-900/80 backdrop-blur-md sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`;

    return (
        <>
            <header id="header" className={headerClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-30">
                        <a href="/" aria-label="Dallaspuram Home">
                            <img
                                src="https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fit,w_120/v1759399237/logo_fuftwz.png"
                                srcSet="
      https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fit,w_120/v1759399237/logo_fuftwz.png 120w,
      https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fit,w_240/v1759399237/logo_fuftwz.png 240w,
      https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fit,w_360/v1759399237/logo_fuftwz.png 360w
    "
                                sizes="120px"
                                alt="Dallaspuram"
                                className="h-30 w-auto"   // adjust height to your navbar (e.g., h-10 = 40px)
                                decoding="async"
                                fetchPriority="high"
                            />
                        </a>


                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className={`nav-link text-lg font-medium hover:text-amber-500 transition-colors duration-300 ${activeSection === link.href.substring(1) ? 'text-amber-500' : 'text-white'}`}>{link.label}</a>
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

export default Header;

