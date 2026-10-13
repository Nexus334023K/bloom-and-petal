import { motion } from 'framer-motion';
import { Leaf, Award, Heart } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'We partner with local, eco-conscious growers who share our commitment to the environment.',
  },
  {
    icon: Award,
    title: 'Award-Winning Design',
    description: 'Recognised by the British Florist Association for floral artistry two years running.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every stem is placed by hand. Every arrangement tells a unique story — yours.',
  },
];

export default function BrandStory() {
  return (
    <section id="story" className="py-28 bg-charcoal" aria-labelledby="story-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1490750967868-88df5691cc7b?w=400&q=80"
                    alt="Florist arranging wildflowers by hand"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=400&q=80"
                    alt="Close-up of fresh rose petals in morning light"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-10">
                <div className="rounded-2xl overflow-hidden h-40 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80"
                    alt="Spring tulips and peonies at the flower market"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1487530811015-780780169cb9?w=400&q=80"
                    alt="Completed bouquet wrapped in kraft paper"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Floating quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-sage text-ivory px-6 py-3 rounded-full shadow-lg whitespace-nowrap"
            >
              <span className="font-serif italic text-sm">"Where every petal has a purpose"</span>
            </motion.div>
          </motion.div>

          {/* Right: Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:pl-6"
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-light font-medium">
              Our Story
            </span>
            <h2
              id="story-heading"
              className="font-serif text-4xl md:text-5xl text-ivory mt-3 mb-6 leading-tight"
            >
              Born from a Passion
              <br />
              <em className="text-sage-light">for the Garden</em>
            </h2>

            <div className="space-y-4 font-sans text-ivory/70 leading-relaxed">
              <p>
                Bloom & Petal was founded in 2013 by <strong className="text-ivory/90">Eleanor Ashworth</strong>,
                a former botanical illustrator who traded her sketchbook for a florist's shears.
                Starting from a small garage studio in Bath, Eleanor's arrangements quickly caught
                the attention of local brides and galleries alike.
              </p>
              <p>
                Today, our team of seven passionate florists work from our light-filled studio
                in Clifton, sourcing the majority of our flowers from within 50 miles. We believe
                that the most beautiful arrangements come from understanding the flowers themselves —
                their seasons, their stories, and their natural forms.
              </p>
              <p>
                Every bouquet that leaves our studio is wrapped in recycled kraft paper, tied with
                natural twine, and accompanied by a handwritten care card. Because we believe
                that the details matter.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 space-y-5">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center shrink-0 mt-0.5">
                    <val.icon size={18} className="text-sage-light" />
                  </div>
                  <div>
                    <h3 className="font-serif text-ivory text-base mb-1">{val.title}</h3>
                    <p className="font-sans text-ivory/60 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
