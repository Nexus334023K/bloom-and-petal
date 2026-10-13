import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Studio Address',
    value: '14 Blossom Lane, Clifton\nBristol, BS8 2PQ',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+44 (0)117 926 4821',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@bloomandpetal.co.uk',
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: 'Mon–Fri: 9am – 6pm\nSaturday: 9am – 4pm',
  },
];

const inquiryTypes = ['General Enquiry', 'Wedding Consultation', 'Corporate Events', 'Custom Order', 'Feedback'];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address';
  if (!form.message.trim()) errors.message = 'Message is required';
  else if (form.message.trim().length < 20) errors.message = 'Please write at least 20 characters';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');
    // Simulate async submission
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', type: '', message: '' });
      setTouched({});
    }, 1500);
  };

  const fieldClass = (name) =>
    `w-full px-4 py-3 rounded-xl font-sans text-sm text-charcoal bg-white border transition-all duration-200 outline-none focus:ring-2 ${
      errors[name] && touched[name]
        ? 'border-red-300 focus:ring-red-100 focus:border-red-400'
        : 'border-ivory-dark focus:ring-sage/20 focus:border-sage'
    }`;

  return (
    <section id="contact" className="py-28 bg-ivory-dark" aria-labelledby="contact-heading">
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
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="font-serif text-4xl md:text-5xl text-charcoal mt-3 mb-4"
          >
            Let's Create Something Beautiful
          </h2>
          <p className="font-sans text-warm-gray max-w-lg mx-auto leading-relaxed">
            Whether you're planning a wedding, ordering a special bouquet, or simply have a
            question — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-sage/10 flex items-center justify-center shrink-0 mt-0.5">
                  <info.icon size={18} className="text-sage" />
                </div>
                <div>
                  <span className="font-sans text-xs tracking-widest uppercase text-warm-gray font-medium">
                    {info.label}
                  </span>
                  <p className="font-sans text-charcoal text-sm mt-1 whitespace-pre-line leading-relaxed">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Studio image */}
            <div className="rounded-2xl overflow-hidden mt-6 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1487530811015-780780169cb9?w=500&q=80"
                alt="Our floral studio interior with fresh flowers and natural light"
                className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-sm border border-ivory-dark p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-sage" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-3">Message Received!</h3>
                <p className="font-sans text-warm-gray text-sm leading-relaxed max-w-sm mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours during
                  business hours.
                </p>
                <p className="font-sans text-xs text-warm-gray/60 mb-6 italic">
                  Note: This is a demo form. No message was actually sent.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-sage text-ivory font-sans text-sm rounded-full hover:bg-sage-dark transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-3xl shadow-sm border border-ivory-dark p-8"
                aria-label="Contact inquiry form"
              >
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact-name" className="font-sans text-xs tracking-wide text-warm-gray uppercase mb-1.5 block">
                      Full Name <span className="text-blush-dark">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('name')}
                      placeholder="Eleanor Ashworth"
                      aria-required="true"
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                    />
                    {errors.name && touched.name && (
                      <p id="name-error" className="font-sans text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="font-sans text-xs tracking-wide text-warm-gray uppercase mb-1.5 block">
                      Email Address <span className="text-blush-dark">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('email')}
                      placeholder="hello@example.com"
                      aria-required="true"
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                    />
                    {errors.email && touched.email && (
                      <p id="email-error" className="font-sans text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="contact-phone" className="font-sans text-xs tracking-wide text-warm-gray uppercase mb-1.5 block">
                      Phone <span className="text-warm-gray/50">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={fieldClass('phone')}
                      placeholder="+44 1234 567890"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="font-sans text-xs tracking-wide text-warm-gray uppercase mb-1.5 block">
                      Enquiry Type
                    </label>
                    <select
                      id="contact-type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={`${fieldClass('type')} appearance-none cursor-pointer`}
                    >
                      <option value="">Select a type...</option>
                      {inquiryTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="font-sans text-xs tracking-wide text-warm-gray uppercase mb-1.5 block">
                    Message <span className="text-blush-dark">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldClass('message')} resize-none`}
                    placeholder="Tell us about your floral needs, special occasion, or any questions you have..."
                    aria-required="true"
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message && touched.message ? (
                      <p id="message-error" className="font-sans text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="font-sans text-xs text-warm-gray/50">{form.message.length}/500</span>
                  </div>
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-sage text-ivory font-sans text-sm tracking-widest uppercase font-medium rounded-full hover:bg-sage-dark disabled:opacity-60 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="font-sans text-xs text-center text-warm-gray mt-4 italic">
                  This is a demo form — no data is transmitted or stored.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
