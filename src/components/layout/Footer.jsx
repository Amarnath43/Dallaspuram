import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => (
    <footer className="bg-black py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="hover:text-amber-500"><Facebook /></a>
                <a href="#" className="hover:text-amber-500"><Instagram /></a>
                
            </div>
            <p>&copy; 2025 Dallaspuram. All Rights Reserved.</p>
        </div>
    </footer>
);

export default Footer;
