/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Star, 
  Phone, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  ChevronRight,
  ArrowRight,
  Send,
  User,
  Quote,
  ShoppingBag,
  Truck,
  ExternalLink,
  Leaf,
  WheatOff,
  Camera,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const TOP_SELLERS = [
  {
    id: 1,
    name: "Masala Chai Latte",
    price: "₹180",
    description: "Our special blend of Assam tea, ginger, cardamom, and cinnamon. A local heart warmer.",
    image: "https://images.unsplash.com/photo-1544787210-2213d2402434?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Paneer Tikka Roll",
    price: "₹220",
    description: "Grilled cottage cheese with mint chutney and pickled onions in a soft roomali roti.",
    image: "https://images.unsplash.com/photo-1626777553732-48995aba3d7e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Cold Brew with Jaggery",
    price: "₹150",
    description: "12-hour steeped Arabica beans sweetened naturally with organic jaggery.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop"
  }
];

const DAILY_SPECIALS = [
  {
    id: 'special-1',
    name: "Filter Coffee & Maska Bun",
    price: "₹120",
    description: "Traditional South Indian filter coffee served with a warm, buttery maska bun.",
    image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 'special-2',
    name: "Veggie Cutlet Slider",
    price: "₹95",
    description: "Spiced vegetable patty with a dollop of spicy mayo in a mini pav.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop"
  }
];

const FULL_MENU = {
  "Coffee & Tea": [
    { name: "Filter Coffee", price: "₹80", dietary: ["vegan", "gf"] },
    { name: "Masala Chai", price: "₹60", dietary: ["gf"] },
    { name: "Cappuccino", price: "₹160", dietary: ["gf"] },
    { name: "Latte", price: "₹170", dietary: ["gf"] },
    { name: "Mocha", price: "₹190", dietary: ["gf"] },
    { name: "Cold Coffee", price: "₹150", dietary: ["gf"] },
    { name: "Iced Hibiscus Tea", price: "₹120", dietary: ["vegan", "gf"] },
    { name: "Green Tea", price: "₹90", dietary: ["vegan", "gf"] },
  ],
  "Indian Bites": [
    { name: "Paneer Wrap", price: "₹220", dietary: [] },
    { name: "Cheese Chilli Toast", price: "₹140", dietary: [] },
    { name: "Vada Pav (Set of 2)", price: "₹90", dietary: ["vegan"] },
    { name: "Maggi with a Twist", price: "₹110", dietary: [] },
    { name: "Samosa Platter", price: "₹80", dietary: ["vegan"] },
  ],
  "Pastries": [
    { name: "Chocolate Brownie", price: "₹120", dietary: ["gf"] },
    { name: "Banana Bread Slice", price: "₹85", dietary: ["vegan"] },
    { name: "Apple Pie", price: "₹150", dietary: [] },
    { name: "Cinnamon Roll", price: "₹130", dietary: [] },
  ]
};

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    caption: "Morning rush and fresh aromas."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
    caption: "Our signature pour-over station."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1559925393-8be0ec41b5ec?q=80&w=800&auto=format&fit=crop",
    caption: "Cozy corners and quiet conversations."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1544787210-2213d2402434?q=80&w=800&auto=format&fit=crop",
    caption: "The perfect Masala Chai."
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    caption: "Industrial vibes, local heart."
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    caption: "Freshly roasted South Indian beans."
  }
];

const INITIAL_REVIEWS: Review[] = [
  { id: '1', user: "Rohan S.", rating: 5, comment: "The Masala Chai here is better than home! Truly a cozy spot.", date: "2024-03-10" },
  { id: '2', user: "Ananya M.", rating: 4, comment: "Great vibes and really affordable for the quality they provide.", date: "2024-03-12" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Menu Filtering
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<'all' | 'vegan' | 'gf'>('all');
  
  // Body scroll lock and Escape key listener
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isMenuOpen]);
  
  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating: 5 });
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  useEffect(() => {
    const savedReviews = localStorage.getItem('cafe_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.user || !newReview.comment) return;

    setIsReviewSubmitting(true);
    
    // Simulate a small delay
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        user: newReview.user,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
      };

      const updatedReviews = [review, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('cafe_reviews', JSON.stringify(updatedReviews));
      setNewReview({ user: '', comment: '', rating: 5 });
      setIsReviewSubmitting(false);
    }, 600);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-cream selection:bg-accent-green/30">
      {/* Navigation */}
      <nav id="navbar" className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-coffee/10" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-accent-green" aria-hidden="true" />
              <span className="font-serif text-xl font-bold italic tracking-tight">The Neighborhood Cafe</span>
            </div>
            
            {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#specials" className="text-sm font-medium hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 rounded-md">Specials</a>
                <a href="#gallery" className="text-sm font-medium hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 rounded-md">Gallery</a>
                <a href="#location" className="text-sm font-medium hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 rounded-md">Location</a>
                <a href="#top-sellers" className="text-sm font-medium hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 rounded-md">Menu</a>
              <a href="#reviews" className="text-sm font-medium hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 rounded-md">Reviews</a>
              <a 
                href="tel:+919876543210" 
                aria-label="Call cafe at +91 98765 43210"
                className="bg-coffee text-cream px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-coffee/90 transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee focus-visible:ring-offset-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Mobile Nav Toggle */}
            <button 
              id="mobile-nav-toggle"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-2 text-coffee focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded-md"
              aria-expanded={isMobileNavOpen}
              aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            >
              {isMobileNavOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-b border-coffee/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#specials" onClick={() => setIsMobileNavOpen(false)} className="block text-lg font-medium">Daily Specials</a>
                <a href="#gallery" onClick={() => setIsMobileNavOpen(false)} className="block text-lg font-medium">Gallery</a>
                <a href="#location" onClick={() => setIsMobileNavOpen(false)} className="block text-lg font-medium">Location</a>
                <a href="#top-sellers" onClick={() => setIsMobileNavOpen(false)} className="block text-lg font-medium">Our Menu</a>
                <a href="#reviews" onClick={() => setIsMobileNavOpen(false)} className="block text-lg font-medium">Guest Reviews</a>
                <a 
                  href="tel:+919876543210" 
                  className="bg-coffee text-cream w-full py-3 rounded-xl text-center font-medium flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-[80vh] flex items-center overflow-hidden" aria-labelledby="hero-title">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop" 
              alt="Cozy interior of a neighborhood cafe in India with soft natural light" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 ring-1 ring-inset ring-black/10"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 id="hero-title" className="text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
                Fresh Coffee.<br/>Local Vibes.<br/>Daily Eats.
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-xl mb-10 font-medium">
                Your second home in the heart of the neighborhood. Authentic Indian flavors, premium beans, and a warm seat waiting for you.
              </p>
              <button 
                id="view-menu-btn"
                onClick={() => setIsMenuOpen(true)}
                className="bg-accent-green text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-accent-green/90 transition-all flex items-center gap-3 mx-auto md:mx-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-4"
                aria-haspopup="dialog"
              >
                View Menu & Prices
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Info Grid */}
        <section id="info" className="py-20 bg-cream" aria-label="Cafe Information">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hours */}
              <motion.div 
                id="hours"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl shadow-sm border border-coffee/5"
              >
                <div className="w-12 h-12 bg-accent-green/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-accent-green" aria-hidden="true" />
                </div>
                <h3 className="text-2xl mb-4 italic">Hours of Operation</h3>
                <ul className="space-y-2 secondary-text font-medium">
                  <li className="flex justify-between"><span>Mon - Fri</span> <span>7:30 AM - 10:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday</span> <span>8:00 AM - 11:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span>9:00 AM - 9:00 PM</span></li>
                </ul>
              </motion.div>

              {/* Location */}
              <motion.div 
                id="location"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 bg-white rounded-3xl shadow-sm border border-coffee/5"
              >
                <div className="w-12 h-12 bg-accent-green/10 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-accent-green" aria-hidden="true" />
                </div>
                <h3 className="text-2xl mb-4 italic">Find Us</h3>
                <address className="not-italic secondary-text font-medium mb-6">
                  Sector 45, Huda City Centre,<br/>Gurgaon, Haryana 122003
                </address>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-green font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded"
                >
                  Open in Google Maps
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </motion.div>

              {/* Quick Contact */}
              <motion.div 
                id="contact"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-accent-green/10 rounded-3xl border-2 border-dashed border-accent-green/30 relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-accent-green rounded-2xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl mb-2 italic">Cafe Rating</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-coffee">{averageRating}</span>
                  <div className="flex flex-col">
                    <div className="flex text-accent-green">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? 'fill-accent-green' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs secondary-text">{reviews.length} total reviews</span>
                  </div>
                </div>
                <p className="text-coffee font-medium text-sm mb-4">Local's favorite hidden gem in the city. High quality, zero pretense.</p>
                <a href="#reviews" className="inline-block bg-white text-accent-green px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent-green hover:text-white transition-all shadow-sm">Write a Review</a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Daily Specials Section */}
        <section id="specials" className="py-20 bg-white" aria-labelledby="specials-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="specials-title" className="text-4xl md:text-5xl mb-4 italic">Today's Specials</h2>
              <p className="secondary-text max-w-xl mx-auto text-lg underline decoration-accent-green/30 decoration-4">Limited time treats crafted fresh every morning.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DAILY_SPECIALS.map((special, idx) => (
                <motion.div 
                  key={special.id}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row bg-cream rounded-3xl overflow-hidden shadow-sm border border-coffee/5 hover:shadow-md transition-shadow"
                >
                  <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto">
                    <img src={special.image} alt={special.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 flex flex-col justify-center w-full sm:w-3/5">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-2xl text-coffee">{special.name}</h3>
                       <span className="bg-accent-green text-white px-3 py-1 rounded-full text-sm font-bold">{special.price}</span>
                    </div>
                    <p className="secondary-text mb-6 italic">{special.description}</p>
                    <button 
                      onClick={() => setIsMenuOpen(true)}
                      className="text-accent-green font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
                    >
                      Check Full Menu <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Sellers */}
        <section id="top-sellers" className="py-20 bg-coffee/5" aria-labelledby="top-sellers-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 id="top-sellers-title" className="text-4xl md:text-5xl mb-4">Community Favorites</h2>
              <p className="secondary-text max-w-xl mx-auto text-lg">Hand-picked by our regulars. Quality ingredients at prices that make sense.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {TOP_SELLERS.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="menu-card group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-coffee/0 group-hover:bg-coffee/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl italic">{item.name}</h4>
                      <span className="font-bold text-accent-green">{item.price}</span>
                    </div>
                    <p className="secondary-text text-sm italic">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-white" aria-labelledby="gallery-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-12 bg-accent-green/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Camera className="w-6 h-6 text-accent-green" />
              </div>
              <h2 id="gallery-title" className="text-4xl md:text-5xl mb-4 italic">Moments at The Neighborhood</h2>
              <p className="secondary-text max-w-xl mx-auto text-lg italic">A glimpse into our world, our food, and our community.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
                <motion.div 
                  key={img.id}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-3xl"
                >
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-coffee/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                    <p className="text-cream text-sm font-medium italic translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 bg-cream" aria-labelledby="reviews-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Review Form */}
              <div>
                <h2 id="reviews-title" className="text-4xl mb-6 italic">What Do You Think?</h2>
                <p className="secondary-text mb-8 text-lg">Your feedback helps us remain the community's heart. Share your experience with us.</p>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm">
                  <div className="space-y-2">
                    <label htmlFor="user-name" className="block text-sm font-bold text-coffee/60 uppercase tracking-wider">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee/30" />
                      <input 
                        id="user-name"
                        type="text" 
                        required
                        value={newReview.user}
                        onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-cream/50 rounded-xl border border-coffee/10 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Rahul Kumar"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-coffee/60 uppercase tracking-wider">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className={`p-1 transition-colors ${newReview.rating >= star ? 'text-accent-green' : 'text-coffee/20'}`}
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star className={`w-6 h-6 ${newReview.rating >= star ? 'fill-accent-green' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comment" className="block text-sm font-bold text-coffee/60 uppercase tracking-wider">Your Comment</label>
                    <textarea 
                      id="comment"
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full p-4 bg-cream/50 rounded-xl border border-coffee/10 focus:ring-2 focus:ring-accent-green focus:border-transparent outline-none transition-all h-32 resize-none"
                      placeholder="The coffee was excellent..."
                    />
                  </div>

                  <button 
                    disabled={isReviewSubmitting}
                    className="w-full bg-coffee text-cream py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-coffee/90 transition-all disabled:opacity-50 shadow-md"
                  >
                    {isReviewSubmitting ? (
                      <span className="w-6 h-6 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                    ) : (
                      <>
                        Post Review
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Review List */}
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {reviews.map((review) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 bg-white rounded-2xl shadow-sm border border-coffee/5 relative"
                    >
                      <Quote className="absolute right-6 top-6 w-10 h-10 text-accent-green/5" />
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-coffee">{review.user}</p>
                          <p className="text-xs secondary-text">{review.date}</p>
                        </div>
                        <div className="flex text-accent-green">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-accent-green' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <p className="secondary-text italic text-sm">"{review.comment}"</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {reviews.length === 0 && (
                  <div className="text-center py-10 secondary-text italic">No reviews yet. Be the first!</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Delivery & Takeaway Section */}
        <section id="delivery" className="py-20 bg-coffee text-cream" aria-labelledby="delivery-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-green/20 rounded-full text-accent-green font-bold text-sm">
                  <Truck className="w-4 h-4" />
                  We Deliver Across Gurgaon
                </div>
                <h2 id="delivery-title" className="text-4xl md:text-5xl italic">Cant Visit Us? We'll Come to You.</h2>
                <p className="text-cream/70 text-lg">
                  Enjoy your neighborhood favorites from the comfort of your couch. We've partnered with the best to ensure fresh delivery within 45 minutes.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <a 
                    href="https://www.swiggy.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 transition-all group lg:min-w-[280px]"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-6 h-6 text-orange-400" />
                      <span className="font-bold">Order via Swiggy</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a 
                    href="https://www.zomato.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 transition-all group lg:min-w-[280px]"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-6 h-6 text-red-500" />
                      <span className="font-bold">Order via Zomato</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm font-bold uppercase tracking-widest text-accent-green mb-4">Direct Takeaway</p>
                  <p className="text-cream/60 mb-2">Call us directly for zero-commission pickup orders:</p>
                  <a href="tel:+919876543210" className="text-2xl font-bold flex items-center gap-3 hover:text-accent-green transition-colors">
                    <Phone className="w-6 h-6" /> +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex-1 w-full bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl mb-6 italic">Delivery Radius</h3>
                <ul className="space-y-4">
                  {[
                    "DLF Phase 1-5 & Cyber City",
                    "Sushant Lok 1-3",
                    "Golf Course Road",
                    "Sector 40-56 (Gurgaon)",
                    "MG Road & IFFCO Chowk"
                  ].map(area => (
                    <li key={area} className="flex items-center gap-3 text-cream/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                      {area}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-accent-green/10 rounded-xl border border-accent-green/20 text-xs text-cream/70 italic">
                  *Delivery charges apply based on distance via platform app.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-coffee text-cream py-16" aria-labelledby="footer-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Coffee className="w-6 h-6 text-accent-green" aria-hidden="true" />
                <span id="footer-title" className="font-serif text-2xl font-bold italic">The Neighborhood Cafe</span>
              </div>
              <p className="text-cream/70 max-w-md italic mb-8">
                We believe good coffee should be accessible, and a quiet corner to think should be free. Visit us today in Gurgaon and join our little community.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-coffee transition-all" aria-label="Follow us on Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-coffee transition-all" aria-label="Follow us on Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent-green">Quick Links</h5>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#hero" className="hover:text-accent-green transition-colors">Home</a></li>
                <li><a href="#specials" className="hover:text-accent-green transition-colors">Specials</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); }} className="hover:text-accent-green transition-colors">Digital Menu</a></li>
                <li><a href="#reviews" className="hover:text-accent-green transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent-green">Contact</h5>
              <ul className="space-y-4 text-sm font-medium text-cream/70">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" />+91 98765 43210</li>
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1" /> Sector 45, Huda City Centre,<br/>Gurgaon, Haryana 122003</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-cream/10 text-center text-cream/40 text-xs">
            <p>© {new Date().getFullYear()} The Neighborhood Cafe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cream overflow-y-auto custom-scrollbar"
          >
            {/* Overlay Header - Sticky */}
            <div className="sticky top-0 z-10 bg-cream/90 backdrop-blur-md border-b border-coffee/10 px-4 py-4 sm:px-6">
              <div className="max-w-4xl mx-auto flex justify-between items-center">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                   <h2 id="menu-title" className="text-2xl sm:text-3xl italic">Our Menu</h2>
                   {/* Sub-nav for categories */}
                   <nav id="menu-categories" className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0" aria-label="Menu category jumps">
                     {Object.keys(FULL_MENU).map(category => (
                       <a 
                         key={category} 
                         href={`#cat-${category.replace(/\s+/g, '-').toLowerCase()}`}
                         className="text-xs sm:text-sm font-bold uppercase tracking-widest text-coffee/60 hover:text-accent-green whitespace-nowrap transition-colors"
                       >
                         {category}
                       </a>
                     ))}
                   </nav>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 sm:p-3 bg-coffee text-cream rounded-full hover:bg-coffee/90 transition-all focus:ring-4 focus:ring-coffee/20 shadow-lg active:scale-95"
                  aria-label="Close menu"
                  autoFocus
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              
              {/* Dietary Filters */}
              <div className="max-w-4xl mx-auto mt-6 flex flex-wrap items-center gap-3 border-t border-coffee/10 pt-4 px-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-coffee/40 mr-2">Filters:</span>
                <button 
                  onClick={() => setActiveDietaryFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeDietaryFilter === 'all' ? 'bg-coffee text-cream' : 'bg-coffee/5 text-coffee/60 hover:bg-coffee/10'}`}
                >
                  All Items
                </button>
                <button 
                  onClick={() => setActiveDietaryFilter('vegan')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${activeDietaryFilter === 'vegan' ? 'bg-accent-green text-white shadow-md' : 'bg-accent-green/10 text-accent-green hover:bg-accent-green/20'}`}
                >
                  <Leaf className="w-3 h-3" />
                  Vegan
                </button>
                <button 
                  onClick={() => setActiveDietaryFilter('gf')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${activeDietaryFilter === 'gf' ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-600/10 text-amber-600 hover:bg-amber-600/20'}`}
                >
                  <WheatOff className="w-3 h-3" />
                  Gluten Free
                </button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-12">
              {Object.entries(FULL_MENU).map(([category, items]) => {
                const filteredItems = activeDietaryFilter === 'all' 
                  ? items 
                  : items.filter(item => item.dietary?.includes(activeDietaryFilter));
                
                if (filteredItems.length === 0) return null;

                return (
                  <div 
                    key={category} 
                    id={`cat-${category.replace(/\s+/g, '-').toLowerCase()}`} 
                    className="mb-16 scroll-mt-32"
                  >
                    <h3 className="text-3xl text-accent-green mb-8 border-b border-accent-green/20 pb-4">{category}</h3>
                    <div className="space-y-6">
                      {filteredItems.map((item) => (
                        <div key={item.name} className="flex justify-between items-end gap-4 group">
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-medium text-lg text-coffee group-hover:text-accent-green transition-colors">{item.name}</span>
                              <div className="flex gap-1">
                                {item.dietary?.includes('vegan') && (
                                  <span title="Vegan" className="p-1 bg-accent-green/10 text-accent-green rounded-md"><Leaf className="w-3 h-3" /></span>
                                )}
                                {item.dietary?.includes('gf') && (
                                  <span title="Gluten Free" className="p-1 bg-amber-600/10 text-amber-600 rounded-md"><WheatOff className="w-3 h-3" /></span>
                                )}
                              </div>
                            </div>
                            <div className="h-[1px] bg-coffee/10 w-full" />
                          </div>
                          <span className="font-bold text-accent-green text-lg whitespace-nowrap">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="text-center pt-8 pb-20">
                <p className="secondary-text italic mb-8">All prices are inclusive of taxes. Freshness guaranteed.</p>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-coffee text-cream px-12 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95"
                >
                  Back to Website
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

