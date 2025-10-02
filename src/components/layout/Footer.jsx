import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Catering', href: '#catering' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => (
  <footer className="bg-zinc-900 text-gray-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Logo and Brand */}
        <div className="md:col-span-3 lg:col-span-1 flex flex-col items-center md:items-start">
          <img
            src="https://res.cloudinary.com/dic4irwzb/image/upload/f_auto,q_auto,c_fit,w_120/v1759399237/logo_fuftwz.png"
            alt="Dallaspuram Logo"
            className="h-16 w-auto mb-4"
          />
          <p className="text-center md:text-left text-gray-400">
            Where Dallas Grit Meets Desi Spice. Authentic Indian street food in the heart of Aubrey.
          </p>
          <div className="flex space-x-4 mt-4">
            <a 
              href="https://www.instagram.com/dallaspuram.aubrey?igsh=emlvNmdwamQwbDZv" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram" 
              className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-orange-500 transition-colors duration-300">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Column 3: Contact/Visit Us */}
        <div>
           <h3 className="text-lg font-semibold text-white mb-4">Visit Us</h3>
           <div className="space-y-3">
             <div className="flex items-start">
               <MapPin className="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0" />
               <span>13927 Rockin Riley Rd,<br/>Aubrey, TX 76227</span>
             </div>
             <div className="flex items-center">
               <Phone className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
               <span>(234) 999-6669</span>
             </div>
           </div>
        </div>

        {/* Column 4: Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
          <div className="space-y-2 text-gray-400">
            <div className="flex gap-2">
              <span>Mon - Thu:</span>
              <span>5 PM - 12 AM</span>
            </div>
            <div className="flex gap-2">
              <span>Fri - Sun:</span>
              <span>7 AM - 12 AM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center">
        <p className="text-sm text-gray-500">&copy; 2025 Dallaspuram. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
