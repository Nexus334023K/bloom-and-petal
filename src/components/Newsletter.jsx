import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const validate = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!validate(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <section className="py-20 bg-sage" aria-labelledby="newsletter-heading">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-full bg-ivory/20 flex items-center justify-center mx-auto mb-6">
            <Mail size={24} className="text-ivory" />
          </div>

          <h2
            id="newsletter-heading"
            className="font-serif text-3xl md:text-4xl text-ivory mb-3"
          >
            Stay in Bloom
          </h2>
          <p className="font-sans text-ivory/70 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Subscribe to our newsletter for seasonal inspiration, behind-the-scenes stories,
            and 10% off your first order.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-ivory/20 flex items-center justify-center">
                  <CheckCircle size={30} className="text-ivory" />
                </div>
                <h3 className="font-serif text-xl text-ivory">You're on the list!</h3>
                <p className="font-sans text-sm text-ivory/70">
                  Check your inbox for a welcome email with your 10% discount code.
                </p>
                <p className="font-sans text-xs text-ivory/50 italic">
                  This is a demo — no email was actually sent.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-label="Newsletter subscription form"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-full bg-ivory/20 border border-ivory/30 text-ivory placeholder:text-ivory/50 font-sans text-sm outline-none focus:border-ivory/60 focus:ring-2 focus:ring-ivory/20 transition-all"
                    aria-describedby={errorMsg ? 'newsletter-error' : undefined}
                    aria-invalid={!!errorMsg}
                  />
                  {errorMsg && (
                    <p id="newsletter-error" className="font-sans text-xs text-ivory/80 mt-1 ml-2 text-left">
                      {errorMsg}
                    </p>
                  )}
                </div>
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-6 py-3.5 bg-ivory text-sage font-sans text-sm font-semibold rounded-full hover:bg-ivory-dark disabled:opacity-60 transition-all duration-300 flex items-center gap-2 shrink-0 justify-center"
                >
                  {status === 'submitting' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-sage/30 border-t-sage rounded-full"
                    />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status !== 'success' && (
            <p className="font-sans text-xs text-ivory/50 mt-4">
              No spam, ever. Unsubscribe anytime. · This is a demonstration.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
