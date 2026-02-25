import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, View } from '../types';

export default function Home({ onAddToCart, onNavigate, onProductClick }: { onAddToCart: (p: Product) => void, onNavigate: (v: View) => void, onProductClick: (p: Product) => void }) {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920&h=1080&grayscale" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-vibrant mb-6 block font-bold">Spring / Summer 2026</span>
            <h1 className="serif text-7xl md:text-9xl leading-[0.9] mb-8">
              Aurelian <br />
              <span className="italic text-zinc-400">Elegance</span>
            </h1>
            <p className="text-zinc-600 text-lg mb-10 max-w-md leading-relaxed">
              Discover our latest collection of hand-crafted luxury pieces designed for the modern connoisseur.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('collection')}
                className="px-10 py-5 bg-black text-white rounded-full hover:bg-vibrant transition-all flex items-center gap-3 group"
              >
                Shop Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section id="collection" className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="serif text-5xl mb-4">The Curated Edit</h2>
            <p className="text-zinc-500">Hand-selected pieces for your seasonal wardrobe.</p>
          </div>
          <button 
            onClick={() => onNavigate('collection')}
            className="text-sm font-medium border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-zinc-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{product.category}</p>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-zinc-500">${product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="bg-zinc-900 text-white py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="serif text-6xl mb-8 leading-tight">Craftsmanship <br /> Without Compromise</h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
                Every AURELIAN piece is a testament to our commitment to quality. We partner with heritage mills in Italy and France to source the finest materials.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="serif text-2xl mb-2">100%</h4>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Sustainable Sourcing</p>
                </div>
                <div>
                  <h4 className="serif text-2xl mb-2">48h</h4>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">Global Delivery</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/craft/800/1000" 
                alt="Craft" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-white text-black p-8 rounded-2xl shadow-xl max-w-xs">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-sm mb-4">"The attention to detail in the stitching is something you rarely see in modern fashion."</p>
                <p className="text-xs font-bold uppercase tracking-widest">— Master Tailor, Savile Row</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
