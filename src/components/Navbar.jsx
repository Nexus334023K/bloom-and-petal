import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Flower } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Shop', href: '#shop' },
  { label: 'Weddings', href: '#weddings' },
  { label: 'Seasonal', href: '#seasonal' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, dispatch } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm shadow-sm border-b border-ivory-dark'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2 group"
              aria-label="Bloom & Petal - Home"
            >
              <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center group-hover:bg-sage-dark transition-colors duration-300">
                <Flower size={16} className="text-ivory" />
              </div>
              <span
                className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-charcoal' : 'text-ivory'
                }`}
              >
                Bloom &amp; Petal
              </span>
            </a>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`font-sans text-sm tracking-wide transition-colors duration-300 relative group ${
                      scrolled ? 'text-charcoal' : 'text-ivory/90'
                    } hover:text-sage`}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sage transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Cart + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                id="cart-toggle-btn"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className={`relative p-2 rounded-full transition-colors duration-300 ${
                  scrolled
                    ? 'text-charcoal hover:bg-ivory-dark'
                    : 'text-ivory hover:bg-white/10'
                }`}
                aria-label={`Open cart, ${totalItems} items`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-sage text-ivory text-xs font-semibold flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              <button
                id="mobile-menu-btn"
                className={`md:hidden p-2 transition-colors duration-300 ${
                  scrolled ? 'text-charcoal' : 'text-ivory'
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col pt-24 px-8 pb-8"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="font-serif text-3xl text-charcoal hover:text-sage transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pt-8 border-t border-ivory-dark">
              <p className="font-sans text-sm text-warm-gray">Open Mon–Sat, 9am – 6pm</p>
              <p className="font-sans text-sm text-warm-gray">hello@bloomandpetal.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
