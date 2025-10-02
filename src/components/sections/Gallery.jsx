import React from 'react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import LazyImage from '../ui/LazyImage';
import { cldUrl, buildSrcSet } from '../../helper';

const galleryImages = [
  { id: "v1759398802/masala_dosa_g7yfgr.png",        aspect: "5:7" },
  { id: "v1759398800/samosa_chat_q2bp2x.png",        aspect: "1:1" },
  { id: "v1759398798/chicken_manchurian_ttveja.png", aspect: "1:1" },
  { id: "v1759398803/veg_friedrice_o0r42v.png",      aspect: "5:7" },
  { id: "v1759398810/chicken_noodles_bf9kad.png",    aspect: "5:7" },
  { id: "v1759398801/gulab_jamun_ujkpnd.png",        aspect: "1:1" },
  { id: "v1759398798/chicken_frankie_tk8nx3.png",    aspect: "1:1" },
  { id: "v1759398799/chicken_biryani_tkw9og.png",    aspect: "5:7" },
];

const SIZES = '(max-width: 768px) 50vw, 25vw';

const Gallery = ({ sectionRef }) => (
  <section id="gallery" ref={sectionRef} className="py-24 bg-gray-800 overflow-hidden scroll-mt-30">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimateOnScroll className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
          A Glimpse of our <span className="text-amber-500">Creations</span>
        </h2>
      </AnimateOnScroll>

      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {galleryImages.map((img, index) => {
          const aspectClass = img.aspect === '1:1' ? 'aspect-square' : 'aspect-[5/7]';

          // ✅ Pass { width, aspect } object
          const src = cldUrl(img.id, { width: 720, aspect: img.aspect });
          const srcSet = buildSrcSet(img.id, img.aspect);

          const alt = img.id.split('/').pop().replace(/[_-]/g, ' ').replace(/\.\w+$/, '');

          return (
            <AnimateOnScroll key={index} style={{ transitionDelay: `${index * 50}ms` }}>
              <LazyImage
                src={src}
                srcSet={srcSet}
                sizes={SIZES}
                alt={alt}
                wrapperClassName={`w-full ${aspectClass} overflow-hidden rounded-lg bg-black/10`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </AnimateOnScroll>
          );
        })}
      </div>
    </div>
  </section>
);

export default Gallery;
