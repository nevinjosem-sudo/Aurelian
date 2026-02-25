import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-12 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-100"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold mb-4">{product.category}</p>
            <h1 className="serif text-5xl mb-4">{product.name}</h1>
            <p className="text-2xl text-zinc-600">${product.price.toLocaleString()}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[60px] h-[60px] flex items-center justify-center rounded-xl border-2 transition-all font-medium ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-zinc-100 hover:border-zinc-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-zinc-500 leading-relaxed text-lg">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-100">
              <div className="flex items-center gap-3 text-zinc-400">
                <ShieldCheck size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Authentic</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Truck size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Express Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <RefreshCw size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Free Returns</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product, selectedSize)}
            className="w-full py-6 bg-black text-white rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 font-medium text-lg"
          >
            <ShoppingBag size={24} />
            Add to Bag
          </button>
        </motion.div>
      </div>
    </div>
  );
}
