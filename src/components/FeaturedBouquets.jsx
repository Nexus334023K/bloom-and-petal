import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const badgeColors = {
  Bestseller: 'bg-gold text-charcoal',
  New: 'bg-sage text-ivory',
  Seasonal: 'bg-blush text-charcoal',
  Wedding: 'bg-charcoal text-ivory',
  Limited: 'bg-blush-dark text-ivory',
};

export default function FeaturedBouquets() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedIds, setAddedIds] = useState(new Set());
  const { dispatch } = useCart();

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', product });
    setAddedIds(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="shop" className="py-24 bg-ivory" aria-labelledby="shop-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage font-medium">
              Our Collection
            </span>
            <h2
              id="shop-heading"
              className="font-serif text-4xl md:text-5xl text-charcoal mt-3 mb-4"
            >
              Featured Bouquets
            </h2>
            <p className="font-sans text-warm-gray max-w-lg mx-auto leading-relaxed">
              Each arrangement is crafted by hand, using the freshest seasonal flowers
              sourced from trusted local growers.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map(cat => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-sans text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-sage text-ivory shadow-md'
                    : 'bg-ivory-dark text-warm-gray hover:bg-blush-light hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 cursor-pointer border border-ivory-dark hover:border-blush"
                onClick={() => setSelectedProduct(product)}
                aria-label={`View details for ${product.name}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.image}
                    alt={`${product.name} floral arrangement`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold font-sans ${
                        badgeColors[product.badge] || 'bg-sage text-ivory'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="flex items-center gap-2 bg-ivory/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-sans text-charcoal">
                        <Eye size={14} />
                        Quick View
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-lg text-charcoal group-hover:text-sage-dark transition-colors">
                        {product.name}
                      </h3>
                      <span className="font-sans text-xs text-warm-gray">{product.category}</span>
                    </div>
                    <span className="font-serif text-lg text-sage-dark font-semibold whitespace-nowrap">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={11} className="fill-gold text-gold" />
                    ))}
                    <span className="font-sans text-xs text-warm-gray ml-1">(4.9)</span>
                  </div>

                  <button
                    id={`add-to-cart-${product.id}`}
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full py-2.5 rounded-full font-sans text-sm tracking-wide font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      addedIds.has(product.id)
                        ? 'bg-sage-dark text-ivory'
                        : 'bg-ivory-dark text-charcoal hover:bg-sage hover:text-ivory'
                    }`}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag size={14} />
                    {addedIds.has(product.id) ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
