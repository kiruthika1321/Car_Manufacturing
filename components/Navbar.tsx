
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MessageSquare, Menu, X, ChevronRight } from 'lucide-react';

// FIX: Cast motion to any to bypass TS errors regarding missing Framer Motion props in this environment.
const motion = motionBase as any;

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  cartItemsCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartItemsCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: View.Home },
    { label: 'Fleet', view: View.Models },
    { label: 'Heritage', view: View.About },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-2xl border border-white/40 shadow-2xl transition-all duration-500 overflow-hidden ${scrolled ? 'px-6 py-3' : 'px-8 py-4'}`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => { setView(View.Home); setMobileMenuOpen(false); }}
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-indigo-600 rounded-lg rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="absolute inset-0 bg-indigo-500 rounded-lg flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-black tracking-tight text-slate-900 leading-none">
                  Kiruthika
                </span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-indigo-600 uppercase">
                  Manufacturing
                </span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <button 
                  key={link.label}
                  onClick={() => setView(link.view)}
                  className={`text-xs font-bold uppercase tracking-widest transition-all relative py-2 group ${
                    currentView === link.view ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
              <div className="h-4 w-px bg-slate-200"></div>
              <button 
                onClick={() => setView(View.Concierge)}
                className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  currentView === View.Concierge ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                <MessageSquare size={16} />
                <span>Concierge</span>
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setView(View.Cart)}
                className="relative p-2.5 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/20"
              >
                <ShoppingBag size={18} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2 text-slate-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[100px] z-40 bg-white/95 backdrop-blur-xl p-8"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <button 
                  key={link.label}
                  onClick={() => { setView(link.view); setMobileMenuOpen(false); }}
                  className="text-2xl font-serif font-bold text-slate-900 flex justify-between items-center"
                >
                  {link.label}
                  <ChevronRight className="text-indigo-600" />
                </button>
              ))}
              <button 
                onClick={() => { setView(View.Concierge); setMobileMenuOpen(false); }}
                className="text-2xl font-serif font-bold text-slate-900 flex justify-between items-center"
              >
                AI Concierge
                <MessageSquare className="text-indigo-600" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
