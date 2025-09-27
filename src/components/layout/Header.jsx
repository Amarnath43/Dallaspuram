import React from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#catering', label: 'Catering' },
    { href: '#gallery', label: 'Gallery'},
    { href: '#contact', label: 'Contact' },
];

const Header = ({ isMenuOpen, setIsMenuOpen, activeSection, isScrolled }) => {
    const headerClasses = `bg-gray-900/80 backdrop-blur-md sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`;

    return (
        <>
            <header id="header" className={headerClasses}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-30">
                        <a href="#home" aria-label="Dallaspuram Home">
                            {/* Replaced the SVG component with an img tag for the logo */}
                            <img src='d.png' alt="Dallaspuram Logo" className="h-30 w-auto" />
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

