import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    src: '/hero-1.jpg',
    alt: 'Luxurious arrangement of garden roses, peonies and ranunculus in blush and ivory tones',
    label: 'Garden Romance',
    tagline: 'Handcrafted with Love',
  },
  {
    src: '/hero-2.jpg',
    alt: 'Bride holding a white bridal bouquet in a sunlit garden at golden hour',
    label: 'Wedding Florals',
    tagline: 'For Your Most Important Day',
  },
  {
    src: '/hero-3.jpg',
    alt: 'Overhead flat lay of seasonal wildflowers, sunflowers and lavender on white wood',
    label: 'Seasonal Collections',
    tagline: 'Following Nature\'s Rhythm',
  },
  {
    src: '/hero-4.jpg',
    alt: 'Moody florist studio with burgundy dahlias and pampas grass on a marble counter',
    label: 'The Studio',
    tagline: 'Where Every Petal Has a Purpose',
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const scrollToShop = () => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slideshow images ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/35 via-transparent to-transparent z-10" />

      {/* ── Slide label pill ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="absolute top-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        >
          <div className="h-px w-8 bg-blush-light/70" />
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-blush-light">
            {slides[current].tagline}
          </span>
          <div className="h-px w-8 bg-blush-light/70" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`heading-${current}`}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-ivory leading-tight mb-6"
          >
            Where Flowers
            <br />
            <span className="italic text-blush-light">Tell Your Story</span>
          </motion.h1>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Artisan bouquets and bespoke floral designs for life's most meaningful moments.
          From intimate gestures to grand celebrations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-shop-btn"
            onClick={scrollToShop}
            className="px-8 py-4 bg-sage text-ivory font-sans text-sm tracking-widest uppercase font-medium rounded-full hover:bg-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            Shop Bouquets
          </button>
          <button
            id="hero-inquiry-btn"
            onClick={scrollToContact}
            className="px-8 py-4 border border-ivory/60 text-ivory font-sans text-sm tracking-widest uppercase font-medium rounded-full hover:bg-ivory/10 transition-all duration-300 backdrop-blur-sm"
          >
            Book a Consultation
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          {[
            { value: '12+', label: 'Years' },
            { value: '5K+', label: 'Bouquets' },
            { value: '500+', label: 'Weddings' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl text-ivory font-semibold">{stat.value}</div>
              <div className="font-sans text-xs text-ivory/60 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        id="hero-prev-btn"
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ivory/10 hover:bg-ivory/25 backdrop-blur-sm text-ivory flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        id="hero-next-btn"
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ivory/10 hover:bg-ivory/25 backdrop-blur-sm text-ivory flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5" role="tablist" aria-label="Slide indicators">
        {slides.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            onClick={() => setCurrent(i)}
            className="relative h-1 rounded-full transition-all duration-500 overflow-hidden"
            style={{ width: i === current ? '32px' : '8px', backgroundColor: 'rgba(255,255,255,0.35)' }}
          >
            {i === current && !paused && (
              <motion.div
                className="absolute inset-y-0 left-0 bg-ivory rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                key={`progress-${current}`}
              />
            )}
            {i === current && (
              <div className="absolute inset-0 bg-ivory rounded-full opacity-90" />
            )}
          </button>
        ))}
      </div>

      {/* ── Slide name badge ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${current}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-20 right-8 z-20 hidden md:block"
        >
          <span className="font-serif italic text-ivory/60 text-sm">{slides[current].label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Scroll arrow */}
      <motion.button
        onClick={scrollToShop}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-ivory/50 hover:text-ivory transition-colors"
        aria-label="Scroll to shop"
      >
        <ArrowDown size={22} />
      </motion.button>
    </section>
  );
}
