
import React from 'react';
import { motion as motionBase } from 'framer-motion';

// FIX: Cast motion to any to bypass TS error for advanced Framer props.
const motion = motionBase as any;

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-32 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-indigo-600 font-black text-[10px] tracking-[0.4em] uppercase mb-6 block">The Atelier History</span>
          <h1 className="text-7xl font-serif font-black text-slate-900 mb-10 leading-[0.9]">Mastering <br />Unexpected <br />Motion.</h1>
          <p className="text-xl text-slate-500 mb-8 leading-relaxed font-light italic">
            "We don't build transportation. We build the conduit for the soul's journey across terrain."
          </p>
          <div className="space-y-6 text-slate-600 leading-relaxed font-light text-lg">
            <p>
              Founded in 1998 by K. Kiruthika, our manufacturing philosophy emerged from a single high-performance workshop. Today, we stand as a global beacon for those who demand the zenith of automotive luxury.
            </p>
            <p>
              Every Kiruthika chassis is hand-finished over 400 meticulous hours, ensuring that "precision" is not just a specification, but a standard of living.
            </p>
          </div>
          
          <div className="flex space-x-12 mt-16 pt-12 border-t border-slate-100">
            <div>
              <div className="text-4xl font-serif font-black text-slate-900">25+</div>
              <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Years of Innovation</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-black text-slate-900">12k</div>
              <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Bespoke Projects</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-indigo-50 rounded-[4rem] -rotate-3 z-0"></div>
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl z-10">
            <img 
              src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200" 
              alt="The Original Workshop" 
              className="w-full h-[600px] object-cover hover:scale-110 transition-transform duration-[3s]"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-slate-900 rounded-[4rem] p-16 md:p-32 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-3xl relative z-10">
          <span className="text-indigo-400 font-black text-[10px] tracking-[0.4em] uppercase mb-8 block">Project 2030</span>
          <h3 className="text-6xl md:text-7xl font-serif font-black mb-12 leading-tight">Sustainability <br />is our starting line.</h3>
          <p className="text-xl text-slate-400 leading-relaxed mb-16 font-light">
            Kiruthika Car Manufacturing is redefining performance for a circular economy. By 2030, we will achieve complete net-zero production across our global footprint, utilizing lab-grown materials and repurposed carbon structures without compromising the visceral power our brand is built on.
          </p>
          <button className="group px-12 py-6 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white rounded-full font-bold transition-all flex items-center space-x-4">
            <span>Explore Our Sustainability Vision</span>
            <div className="w-8 h-px bg-current group-hover:w-12 transition-all"></div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
