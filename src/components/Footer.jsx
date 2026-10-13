import { Flower, Camera, Globe, Link2 } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Bouquets', href: '#shop' },
    { label: 'Wedding Florals', href: '#weddings' },
    { label: 'Seasonal Collections', href: '#seasonal' },
    { label: 'Gift Vouchers', href: '#contact' },
  ],
  Company: [
    { label: 'Our Story', href: '#story' },
    { label: 'Sustainability', href: '#story' },
    { label: 'Press & Awards', href: '#story' },
    { label: 'Careers', href: '#contact' },
  ],
  Support: [
    { label: 'FAQ', href: '#' },
    { label: 'Delivery Info', href: '#' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Care Guide', href: '#' },
  ],
};

const socialLinks = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Globe, label: 'Facebook', href: '#' },
  { icon: Link2, label: 'Pinterest', href: '#' },
];

export default function Footer() {
  const scrollTo = (href) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-ivory" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                <Flower size={16} className="text-ivory" />
              </div>
              <span className="font-serif text-lg font-semibold">Bloom &amp; Petal</span>
            </div>
            <p className="font-sans text-ivory/60 text-sm leading-relaxed max-w-[200px]">
              Artisan bouquets handcrafted with love, sourced sustainably, delivered with care.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-ivory/70 hover:bg-sage hover:text-ivory transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-sans text-xs tracking-widest uppercase text-ivory/50 font-semibold mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-ivory/40 text-center sm:text-left">
            © 2025 Bloom & Petal Ltd. All rights reserved. · Fictional business for demonstration only.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs text-ivory/40 hover:text-ivory/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs text-ivory/40 hover:text-ivory/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
