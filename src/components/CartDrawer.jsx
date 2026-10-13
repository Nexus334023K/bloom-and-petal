import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { isOpen, items, subtotal, totalItems, dispatch } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity: qty });
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const close = () => dispatch({ type: 'CLOSE_CART' });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            role="complementary"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-ivory shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ivory-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-sage" />
                <h2 className="font-serif text-xl text-charcoal">Your Basket</h2>
                {totalItems > 0 && (
                  <span className="w-6 h-6 rounded-full bg-sage text-ivory text-xs font-semibold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                id="cart-close-btn"
                onClick={close}
                className="p-2 rounded-full hover:bg-ivory-dark transition-colors text-warm-gray hover:text-charcoal"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-ivory-dark flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-sage-light" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-2">Your basket is empty</h3>
                  <p className="font-sans text-sm text-warm-gray mb-6 max-w-xs">
                    Explore our collection and find the perfect arrangement.
                  </p>
                  <button
                    onClick={close}
                    className="px-6 py-2.5 bg-sage text-ivory font-sans text-sm rounded-full hover:bg-sage-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="flex gap-4 p-4 bg-white rounded-2xl border border-ivory-dark"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm text-charcoal leading-tight">{item.name}</h4>
                            <button
                              onClick={() => remove(item.id)}
                              className="text-warm-gray hover:text-blush-dark transition-colors shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <span className="font-sans text-xs text-warm-gray">{item.category}</span>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1 bg-ivory-dark rounded-full">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-warm-gray hover:text-charcoal transition-colors"
                                aria-label={`Decrease quantity for ${item.name}`}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-sans text-sm font-medium text-charcoal w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-warm-gray hover:text-charcoal transition-colors"
                                aria-label={`Increase quantity for ${item.name}`}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-serif text-sm font-semibold text-sage-dark">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ivory-dark px-6 py-6 space-y-4">
                {subtotal >= 100 ? (
                  <p className="font-sans text-xs text-center text-sage">✓ Free delivery on your order!</p>
                ) : (
                  <p className="font-sans text-xs text-center text-warm-gray">
                    Add ${(100 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}

                {/* Progress bar */}
                <div className="w-full bg-ivory-dark rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full bg-sage rounded-full"
                    animate={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-warm-gray">Subtotal</span>
                  <span className="font-serif text-xl text-charcoal font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-sans text-xs text-warm-gray">
                  Taxes and delivery calculated at checkout
                </p>
                <button
                  id="checkout-btn"
                  className="w-full py-4 bg-charcoal text-ivory font-sans text-sm tracking-widest uppercase font-medium rounded-full hover:bg-sage-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => alert('Checkout would connect to a payment processor in a production build. This is a demo.')}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="w-full py-2 font-sans text-sm text-warm-gray hover:text-blush-dark transition-colors text-center"
                >
                  Clear basket
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
