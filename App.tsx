
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import Cart from './components/Cart';
import About from './components/About';
import Concierge from './components/Concierge';
import Checkout from './components/Checkout';
import { View, Car, CartItem } from './types';
import { CAR_MODELS } from './constants';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

// FIX: Cast motion to any to bypass TS error for motion properties in the main app.
const motion = motionBase as any;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Smooth scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const cartItemsCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const addToCart = (car: Car) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === car.id);
      if (existing) {
        return prev.map(item => item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...car, quantity: 1 }];
    });
    setCurrentView(View.Cart);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setCurrentView(View.ProductDetail);
  };

  const handleCheckoutSuccess = () => {
    setOrderConfirmed(true);
    setCart([]);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const renderViewContent = () => {
    if (orderConfirmed) {
      return (
        <motion.div {...pageTransition} className="max-w-3xl mx-auto py-32 px-6 text-center">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-6xl font-serif font-black text-slate-900 mb-6">Masterpiece Secured.</h1>
          <p className="text-slate-500 mb-12 text-xl leading-relaxed font-light italic">
            "We build legacies, you drive them."
          </p>
          <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 mb-12 text-left">
            <h4 className="font-black text-[10px] tracking-[0.2em] uppercase text-indigo-600 mb-4">What Happens Next</h4>
            <p className="text-slate-600 leading-relaxed mb-6">
              Your manufacturing slot is officially reserved. A Master Concierge from our Global Headquarters will reach out within 60 minutes via encrypted channel to begin your bespoke customization process.
            </p>
            <div className="flex items-center space-x-2 text-indigo-600 font-bold">
              <span>Order Ref: K-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>
          <button 
            onClick={() => { setOrderConfirmed(false); setCurrentView(View.Home); }}
            className="group px-12 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/20"
          >
            Return to Dashboard
          </button>
        </motion.div>
      );
    }

    switch (currentView) {
      case View.Home:
        return (
          <motion.div {...pageTransition}>
            <Hero onExplore={() => setCurrentView(View.Models)} />
            <section className="max-w-7xl mx-auto py-32 px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl">
                  <span className="text-indigo-600 font-black text-[10px] tracking-[0.3em] uppercase mb-4 block underline underline-offset-8 decoration-2">The Collection</span>
                  <h2 className="text-5xl md:text-6xl font-serif font-black text-slate-900">Curated Excellence</h2>
                </div>
                <button 
                  onClick={() => setCurrentView(View.Models)}
                  className="group flex items-center space-x-4 px-8 py-4 bg-white border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                >
                  <span>Explore the Full Range</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {CAR_MODELS.filter(c => c.featured).map((car, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={car.id}
                  >
                    <CarCard 
                      car={car} 
                      onViewDetails={handleViewDetails} 
                      onAddToCart={addToCart} 
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        );
      case View.Models:
        return (
          <motion.div {...pageTransition} className="max-w-7xl mx-auto py-32 px-6">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <span className="text-indigo-600 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Fleet Index</span>
              <h1 className="text-6xl font-serif font-black text-slate-900 mb-6">The Grand Showroom</h1>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Discover our meticulously engineered range of high-performance vehicles, each defining a new standard in their respective class.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {CAR_MODELS.map((car, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={car.id}
                >
                  <CarCard 
                    car={car} 
                    onViewDetails={handleViewDetails} 
                    onAddToCart={addToCart} 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case View.About:
        return <motion.div {...pageTransition}><About /></motion.div>;
      case View.Cart:
        return <motion.div {...pageTransition}><Cart items={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onCheckout={() => setCurrentView(View.Checkout)} onContinueShopping={() => setCurrentView(View.Models)} /></motion.div>;
      case View.Concierge:
        return <motion.div {...pageTransition}><Concierge /></motion.div>;
      case View.Checkout:
        return <motion.div {...pageTransition}><Checkout totalAmount={totalPrice} onSuccess={handleCheckoutSuccess} onCancel={() => setCurrentView(View.Cart)} /></motion.div>;
      case View.ProductDetail:
        return selectedCar ? (
          <motion.div {...pageTransition} className="max-w-7xl mx-auto py-32 px-6">
            <button 
              onClick={() => setCurrentView(View.Models)}
              className="mb-12 flex items-center space-x-3 text-slate-400 hover:text-indigo-600 transition-all font-black text-[10px] tracking-widest uppercase"
            >
              <ArrowLeft size={16} />
              <span>Return to Fleet Gallery</span>
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              <div className="lg:col-span-7 space-y-8">
                <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
                  <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {[selectedCar.image, "https://images.unsplash.com/photo-1542362567-b0520002cf71?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1562519324-7027366391a2?auto=format&fit=crop&q=80&w=400"].map((img, i) => (
                    <div key={i} className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-500 transition-all cursor-pointer">
                      <img src={img} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-5 flex flex-col">
                <div className="mb-2 text-indigo-600 font-black text-[10px] tracking-[0.4em] uppercase">{selectedCar.model}</div>
                <h1 className="text-7xl font-serif font-black text-slate-900 mb-6 leading-[0.95]">{selectedCar.name}</h1>
                <div className="text-4xl font-serif font-bold text-slate-900 mb-10 flex items-baseline">
                  <span className="text-sm text-slate-400 font-sans font-bold uppercase tracking-widest mr-4">From</span>
                  <span>${selectedCar.price.toLocaleString()}</span>
                </div>
                
                <div className="prose prose-slate mb-12">
                  <p className="text-xl text-slate-500 leading-relaxed font-light italic">
                    "{selectedCar.description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden mb-12 shadow-sm">
                  {[
                    { label: '0-60 MPH', value: selectedCar.specs.acceleration },
                    { label: 'Top Velocity', value: selectedCar.specs.topSpeed },
                    { label: 'Drivetrain', value: selectedCar.specs.driveType },
                    { label: 'Peak Power', value: selectedCar.specs.power }
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white p-6">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</div>
                      <div className="text-xl font-bold text-slate-900">{spec.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => addToCart(selectedCar)}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-bold text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/10 hover:shadow-indigo-600/30 transform hover:-translate-y-1"
                  >
                    Initiate Reservation
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Secures immediate manufacturing allocation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col bg-[#fafafa]">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        cartItemsCount={cartItemsCount} 
      />
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <div key={currentView + (orderConfirmed ? 'confirmed' : '')}>
            {renderViewContent()}
          </div>
        </AnimatePresence>
      </main>
      
      <footer className="bg-[#0f1115] text-white py-24 mt-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-black tracking-tight">Kiruthika</span>
                  <span className="text-[8px] tracking-[0.3em] font-bold text-indigo-400 uppercase">Manufacturing</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Engineering the extraordinary since 1998. Our pursuit of perfection is tireless, our vision is global, and our legacy is motion.
              </p>
            </div>
            {['Showroom', 'Atelier', 'Heritage'].map((col, idx) => (
              <div key={col}>
                <h4 className="font-black text-[10px] tracking-[0.4em] uppercase mb-8 text-white">{col}</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-medium">
                  <li><button className="hover:text-indigo-400 transition-colors">Our Story</button></li>
                  <li><button className="hover:text-indigo-400 transition-colors">Global Network</button></li>
                  <li><button className="hover:text-indigo-400 transition-colors">Customization</button></li>
                  <li><button className="hover:text-indigo-400 transition-colors">Career Opportunities</button></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <p>&copy; 2024 Kiruthika Manufacturing S.p.A.</p>
            <div className="flex space-x-10 mt-6 md:mt-0">
              <button className="hover:text-white transition-colors">Data Privacy</button>
              <button className="hover:text-white transition-colors">Compliance</button>
              <button className="hover:text-white transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
