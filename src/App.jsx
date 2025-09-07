// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import MenuSection from './components/sections/MenuSection';
import Catering from './components/sections/Catering';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    menu: useRef(null),
    catering: useRef(null),
    gallery: useRef(null),
    contact: useRef(null),
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        isScrolled={isScrolled}
      />
      <main>
        <Hero sectionRef={sectionRefs.home} />
        <About sectionRef={sectionRefs.about} />
        <MenuSection sectionRef={sectionRefs.menu} />
        <Catering sectionRef={sectionRefs.catering} />
        <Gallery sectionRef={sectionRefs.gallery} />
        <Contact sectionRef={sectionRefs.contact} />
      </main>
      <Footer />

      {/* Toasts (render once) */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1f2937', color: '#e5e7eb' }, // matches your dark UI
          success: { iconTheme: { primary: '#f59e0b', secondary: '#1f2937' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#1f2937' } },
        }}
      />
    </>
  );
}
