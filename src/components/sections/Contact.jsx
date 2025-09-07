import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import ContactForm from '../ui/ContactForm';

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

export default Contact;
