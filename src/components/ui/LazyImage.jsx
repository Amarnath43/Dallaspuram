import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className = 'object-cover', wrapperClassName = '' }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        let observer;
        const currentRef = imageRef.current;
        if (currentRef) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        if (currentRef) {
                           observer.unobserve(currentRef);
                        }
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(currentRef);
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
                src={imageSrc || undefined}
                alt={alt}
                className={`w-full h-full transition-opacity duration-500 ${imageSrc ? 'opacity-100' : 'opacity-0'} ${className}`}
                onLoad={(e) => e.target.style.opacity = 1}
            />
        </div>
    );
};

export default LazyImage;

