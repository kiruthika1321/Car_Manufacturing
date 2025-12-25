
import React from 'react';
import { Car } from '../types';
import { motion as motionBase } from 'framer-motion';
import { ArrowUpRight, Gauge, Zap } from 'lucide-react';

// FIX: Cast motion to any to bypass TS error for whileHover and other Framer props.
const motion = motionBase as any;

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
  onAddToCart: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails, onAddToCart }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-slate-900 shadow-xl uppercase border border-slate-100">
          {car.category}
        </div>
        {car.featured && (
          <div className="absolute top-6 left-6 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-xl uppercase">
            Signature Edition
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <button 
            onClick={() => onViewDetails(car)}
            className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold flex items-center justify-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <span>View Configuration</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="mb-1 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">{car.model}</div>
            <h3 className="text-3xl font-serif font-bold text-slate-900">{car.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting At</div>
            <div className="text-2xl font-serif font-black text-slate-900">
              ${(car.price / 1000).toFixed(0)}k
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-2 italic">
          "{car.description}"
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100 transition-colors group-hover:bg-indigo-50/50">
            <Gauge size={16} className="text-indigo-500 mr-3" />
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Velocity</div>
              <div className="text-xs font-black text-slate-900">{car.specs.topSpeed}</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-slate-50 rounded-2xl border border-slate-100 transition-colors group-hover:bg-indigo-50/50">
            <Zap size={16} className="text-indigo-500 mr-3" />
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Momentum</div>
              <div className="text-xs font-black text-slate-900">{car.specs.acceleration}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onAddToCart(car)}
            className="flex-grow bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 hover:shadow-indigo-600/30"
          >
            Reserve Slot
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
