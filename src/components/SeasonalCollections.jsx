import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const seasons = [
  {
    season: 'Spring',
    tagline: 'Awakening',
    description: 'Tulips, peonies, and cherry blossom branches usher in the season of renewal.',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=700&q=80',
    palette: ['#f8c8d4', '#d4e8c8', '#f5f0e8'],
    price: 'From $48',
  },
  {
    season: 'Summer',
    tagline: 'Radiance',
    description: 'Sunflowers, dahlias, and garden roses in full, vibrant bloom.',
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc7b?w=700&q=80',
    palette: ['#f5d87a', '#f59d7a', '#f5f0e8'],
    price: 'From $55',
  },
  {
    season: 'Autumn',
    tagline: 'Warmth',
    description: 'Copper dahlias, marigolds, and foliage in amber, burgundy, and gold.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=700&q=80',
    palette: ['#c87941', '#8b3a3a', '#d4a96a'],
    price: 'From $62',
  },
  {
    season: 'Winter',
    tagline: 'Stillness',
    description: 'Amaryllis, hellebores, and frosted branches in the quietest season.',
    image: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=700&q=80',
    palette: ['#c4cdd4', '#8a9aa8', '#f5f0e8'],
    price: 'From $58',
  },
];

export default function SeasonalCollections() {
  return (
    <section id="seasonal" className="py-28 bg-ivory" aria-labelledby="seasonal-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage font-medium">
            The Seasons
          </span>
          <h2
            id="seasonal-heading"
            className="font-serif text-4xl md:text-5xl text-charcoal mt-3 mb-4"
          >
            Seasonal Collections
          </h2>
          <p className="font-sans text-warm-gray max-w-xl mx-auto leading-relaxed">
            We follow the rhythm of the seasons, curating arrangements that reflect nature's
            most beautiful moments throughout the year.
          </p>
        </motion.div>

        {/* Season Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seasons.map((item, i) => (
            <motion.div
              key={item.season}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ height: i % 2 === 0 ? '420px' : '380px' }}
              onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${item.season} collection`}
              onKeyDown={(e) => { if (e.key === 'Enter') document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <img
                src={item.image}
                alt={`${item.season} floral arrangement: ${item.description}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/70 mb-1 block">
                      {item.season} Collection
                    </span>
                    <h3 className="font-serif text-3xl text-ivory font-semibold mb-2">
                      {item.tagline}
                    </h3>
                    <p className="font-sans text-sm text-ivory/70 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-ivory text-sm mb-2">{item.price}</div>
                    <div className="w-10 h-10 rounded-full bg-ivory/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-sage transition-all duration-300">
                      <ArrowRight size={16} className="text-ivory" />
                    </div>
                  </div>
                </div>

                {/* Color palette dots */}
                <div className="flex gap-2 mt-4">
                  {item.palette.map((color) => (
                    <div
                      key={color}
                      className="w-3 h-3 rounded-full border border-white/40"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
