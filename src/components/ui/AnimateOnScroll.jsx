import React, { useState, useEffect, useRef } from 'react';

const AnimateOnScroll = ({ children, className, animationClass = 'opacity-100 translate-y-0', initialClass = 'opacity-0 translate-y-5' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.1 }
        );
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={ref} className={`${className || ''} transition-all duration-700 ease-out ${isVisible ? animationClass : initialClass}`}>
            {children}
        </div>
    );
};

export default AnimateOnScroll;

