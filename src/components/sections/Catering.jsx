import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import ContactForm from '../ui/ContactForm';

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

export default Catering;
