
import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// FIX: Cast motion to any to bypass TS errors for Framer Motion specific props.
const motion = motionBase as any;

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2400" 
            alt="Hero Car Background" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-6">
              EST. 1998 • THE PINNACLE OF PERFORMANCE
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif font-black mb-8 leading-[1.05] text-white"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">
              Legacy
            </span> 
            <br />In Motion.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-xl font-light"
          >
            Kiruthika Car Manufacturing crafts more than machines. We engineer visceral emotions, pushing boundaries to define the future of high-performance luxury.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={onExplore}
              className="group relative px-10 py-5 bg-indigo-600 text-white rounded-full font-bold overflow-hidden transition-all shadow-2xl shadow-indigo-600/20"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Explore the Fleet</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10"></div>
            </button>
            <button className="px-10 py-5 text-white font-bold hover:text-indigo-400 transition-colors border-b border-white/20 hover:border-indigo-400/50">
              Schedule Private Viewing
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => window.scrollBy(0, window.innerHeight)}
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Discover</span>
        <ChevronDown size={20} className="text-white animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;
