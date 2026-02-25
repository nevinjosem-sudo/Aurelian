import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivals({ onNavigate }: { onNavigate: (v: any) => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="w-24 h-24 bg-vibrant/10 text-vibrant rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles size={48} />
          </div>
          <span className="text-xs uppercase tracking-[0.5em] text-zinc-400 font-bold mb-4 block">Aurelian Future</span>
          <h1 className="serif text-6xl md:text-8xl mb-8">Coming Soon</h1>
          <p className="text-zinc-500 text-xl leading-relaxed max-w-xl mx-auto">
            Our Autumn / Winter 2026 collection is currently in final production. Sign up for exclusive early access and be the first to experience the next chapter of Aurelian elegance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="relative w-full max-w-sm">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-full focus:outline-none focus:border-vibrant transition-colors"
            />
          </div>
          <button className="px-10 py-4 bg-black text-white rounded-full hover:bg-vibrant transition-all flex items-center gap-3 font-medium">
            Notify Me
            <ArrowRight size={20} />
          </button>
        </motion.div>

        <button 
          onClick={() => onNavigate('collection')}
          className="mt-16 text-sm font-bold text-zinc-400 hover:text-black transition-colors uppercase tracking-widest border-b border-transparent hover:border-black pb-1"
        >
          Explore Current Collection
        </button>
      </div>
    </div>
  );
}
