import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Star, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { dispatch } = useCart();

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', product });
    dispatch({ type: 'CLOSE_CART' });
    // Open cart drawer
    setTimeout(() => dispatch({ type: 'TOGGLE_CART' }), 50);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Product details for ${product.name}`}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative md:w-1/2 h-64 md:h-auto shrink-0">
            <img
              src={product.image}
              alt={`${product.name} floral arrangement`}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold font-sans bg-sage text-ivory">
                {product.badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col p-8 md:w-1/2 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-sans text-xs tracking-widest uppercase text-sage">
                  {product.category}
                </span>
                <h2 className="font-serif text-2xl text-charcoal mt-1">{product.name}</h2>
              </div>
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-ivory-dark transition-colors text-warm-gray hover:text-charcoal"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
              <span className="font-sans text-sm text-warm-gray ml-2">4.9 (48 reviews)</span>
            </div>

            {/* Price */}
            <div className="font-serif text-3xl text-sage-dark font-semibold mb-4">
              ${product.price}
            </div>

            {/* Description */}
            <p className="font-sans text-warm-gray text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* What's Included */}
            <div className="mb-6">
              <h3 className="font-serif text-sm text-charcoal mb-3">What's Included</h3>
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 font-sans text-sm text-warm-gray">
                    <CheckCircle size={14} className="text-sage shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Options */}
            <div className="mb-8">
              <h3 className="font-serif text-sm text-charcoal mb-3">Color Palette</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 border border-ivory-dark rounded-full font-sans text-xs text-warm-gray"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              id={`modal-add-cart-${product.id}`}
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-sage text-ivory font-sans text-sm tracking-widest uppercase font-medium rounded-full hover:bg-sage-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingBag size={16} />
              Add to Cart — ${product.price}
            </button>

            <p className="font-sans text-xs text-center text-warm-gray mt-3">
              Free delivery on orders over $100 · Same-day available
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
