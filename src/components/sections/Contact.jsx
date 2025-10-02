import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import ContactForm from '../ui/ContactForm';

const Contact = ({ sectionRef }) => (
    <section id="contact" ref={sectionRef} className="py-14 bg-gray-900 overflow-hidden scroll-mt-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Get In <span className="text-amber-500">Touch</span></h2>
                <p className="text-lg mt-4 max-w-2xl mx-auto">Follow our social media for our weekly location schedule or contact us for catering inquiries.</p>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 gap-12 gap-y-12">
                <AnimateOnScroll>
                    <h3 className="text-2xl font-bold text-white mb-4">Contact Details</h3>
                    <div className="space-y-4 text-lg">
                        <p className="flex items-center"><MapPin className="w-6 h-6 mr-3 text-amber-500" />13927 Rockin Riley Rd, Aubrey, TX 76227</p>
                        <p className="flex items-center"><Phone className="w-6 h-6 mr-3 text-amber-500" />+1 (234) 999-6669</p>
                        <p className="flex items-center"><Mail className="w-6 h-6 mr-3 text-amber-500" />contact@dallaspuram-usa.com</p>
                    </div>


                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.755964347817!2d-96.89544412451829!3d33.27288057346043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c470015157b1b%3A0xbfdb7e4dbb2ddd12!2sSri%20Sai%20Sannidhi%20temple!5e0!3m2!1sen!2sin!4v1758997316672!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map of Dallaspuram Location"
                        />
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                    <ContactForm subjectDefault="General Inquiry" />
                </AnimateOnScroll>
            </div>
        </div>
    </section>
);

export default Contact;
