import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-28 bg-ivory-dark" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage font-medium">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif text-4xl md:text-5xl text-charcoal mt-3 mb-4"
          >
            Loved by Our Customers
          </h2>
          <p className="font-sans text-warm-gray max-w-md mx-auto text-sm leading-relaxed">
            ✦ These are sample testimonials for demonstration purposes. ✦
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 border border-ivory-dark relative ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Quote icon */}
              <Quote size={28} className="text-blush-light absolute top-6 right-6 opacity-60" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="font-serif text-lg text-charcoal leading-relaxed mb-6 italic">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage to-blush flex items-center justify-center text-ivory font-serif text-base font-semibold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <cite className="not-italic font-serif text-charcoal font-semibold text-base">
                    {t.name}
                  </cite>
                  <p className="font-sans text-xs text-warm-gray">{t.role} · {t.date}</p>
                </div>
              </div>

              {/* Sample content notice */}
              <div className="mt-4 pt-4 border-t border-ivory-dark">
                <p className="font-sans text-xs text-warm-gray/60 italic">
                  Sample content for illustration only
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 bg-sage rounded-2xl p-8 grid grid-cols-3 gap-6 text-center"
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '2,400+', label: 'Happy Customers' },
            { value: '98%', label: 'Would Recommend' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl text-ivory font-semibold mb-1">{stat.value}</div>
              <div className="font-sans text-xs text-ivory/70 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
