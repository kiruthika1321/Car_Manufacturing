
import React, { useState, useRef, useEffect } from 'react';
import { getCarAdvice } from '../services/geminiService';
import { CAR_MODELS } from '../constants';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, X } from 'lucide-react';

// FIX: Cast motion to any to bypass TS error for motion properties.
const motion = motionBase as any;

const Concierge: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Welcome to the Kiruthika Digital Atelier. I am your personal automotive concierge. How may I assist in defining your next motion legacy today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getCarAdvice(userMsg, CAR_MODELS);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Our high-priority link is experiencing turbulence. Please attempt to reconnect shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
          <div>
            <span className="text-indigo-600 font-black text-[10px] tracking-[0.3em] uppercase mb-2 block">Premium Assistance</span>
            <h1 className="text-5xl font-serif font-black text-slate-900 leading-tight">Digital <br />Concierge</h1>
          </div>
          <p className="text-slate-500 leading-relaxed font-light">
            Engage with our AI-driven consultant for bespoke recommendations tailored to your performance requirements and aesthetic preferences.
          </p>
          <div className="space-y-4">
            {['Performance Analysis', 'Lifestyle Matching', 'Bespoke Inquiries'].map((item) => (
              <div key={item} className="flex items-center space-x-3 text-sm font-bold text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-8">
          <div className="bg-[#111113] rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col h-[700px]">
            {/* Header */}
            <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Kiruthika Private Assistant</div>
                  <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    <span>Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-grow p-10 overflow-y-auto space-y-8 scroll-smooth custom-scrollbar">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                      <div className={`p-6 rounded-[2rem] text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-white text-slate-900 font-bold rounded-tr-none shadow-xl' 
                          : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'
                      }`}>
                        {msg.content.split('\n').map((line, i) => (
                          <p key={i} className="mb-3 last:mb-0">{line}</p>
                        ))}
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/20 px-4">
                        {msg.role === 'user' ? 'Client' : 'Concierge'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-[2rem] rounded-tl-none p-6 flex space-x-2 items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-2xl">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about our fleet..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 top-3 bottom-3 aspect-square bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white rounded-xl flex items-center justify-center transition-all shadow-xl shadow-indigo-600/20"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concierge;
