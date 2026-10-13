import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBouquets from './components/FeaturedBouquets';
import WeddingServices from './components/WeddingServices';
import SeasonalCollections from './components/SeasonalCollections';
import BrandStory from './components/BrandStory';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <main>
          <Hero />
          <FeaturedBouquets />
          <WeddingServices />
          <SeasonalCollections />
          <BrandStory />
          <Testimonials />
          <FAQ />
          <Contact />
          <Newsletter />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
