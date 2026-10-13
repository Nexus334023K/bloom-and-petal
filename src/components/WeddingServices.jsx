import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: '💍',
    title: 'Bridal Bouquets',
    description: 'Your bouquet is the one detail you carry closest. We design stunning statement pieces tailored to your gown, venue, and personal style.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  },
  {
    id: 2,
    icon: '🌿',
    title: 'Ceremony Florals',
    description: 'Aisle arrangements, altar flowers, and ceremony installations that transform any space into a breathtaking backdrop for your vows.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80',
  },
  {
    id: 3,
    icon: '🥂',
    title: 'Reception Design',
    description: 'Centrepieces, table runners, sweetheart table florals, and bespoke installations that create an unforgettable atmosphere.',
    image: 'https://images.unsplash.com/photo-1478146059778-26a8d8f72e3b?w=600&q=80',
  },
];

export default function WeddingServices() {
  return (
    <section id="weddings" className="py-28 bg-ivory-dark" aria-labelledby="wedding-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage font-medium">
              Wedding Florals
            </span>
            <h2
              id="wedding-heading"
              className="font-serif text-4xl md:text-5xl text-charcoal mt-3 mb-6 leading-tight"
            >
              Your Dream Wedding,
              <br />
              <em className="text-blush-dark">Bloomed to Life</em>
            </h2>
            <p className="font-sans text-warm-gray leading-relaxed mb-6">
              We believe flowers should tell your love story. Our dedicated wedding team works
              with you from initial consultation to the final pin on your bouquet, ensuring
              every petal is exactly where it should be.
            </p>
            <p className="font-sans text-warm-gray leading-relaxed mb-8">
              Whether you envision a lush garden wedding or a minimalist modern celebration,
              we have the expertise to bring your vision to life. Every wedding design starts
              with a complimentary consultation.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {['Free Consultation', 'Bespoke Designs', 'Day-of Delivery', 'Setup Included'].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full font-sans text-sm text-sage-dark border border-sage/20"
                >
                  <Star size={12} className="fill-sage text-sage" />
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              id="wedding-inquiry-btn"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blush-dark text-ivory font-sans text-sm tracking-widest uppercase rounded-full hover:bg-charcoal transition-all duration-300 shadow-md"
            >
              <Heart size={14} />
              Book Wedding Consultation
            </a>
          </motion.div>

          {/* Right: Featured image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80"
                alt="Bride holding a cascading white bridal bouquet with orchids and roses"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-ivory-dark"
            >
              <div className="font-serif text-3xl text-charcoal font-semibold">500+</div>
              <div className="font-sans text-xs text-warm-gray mt-0.5">Weddings Celebrated</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-7">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 border border-ivory-dark"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-serif text-xl text-charcoal mb-2">{service.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
