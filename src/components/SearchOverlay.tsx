import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export default function SearchOverlay({ isOpen, onClose, onProductClick }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="serif text-3xl">Search</h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-16">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" size={32} />
              <input 
                autoFocus
                type="text"
                placeholder="Search for pieces, categories..."
                className="w-full pl-12 pr-4 py-6 text-4xl serif border-b-2 border-zinc-100 focus:outline-none focus:border-black transition-colors"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.map((product) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    onProductClick(product);
                    onClose();
                  }}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-zinc-400">${product.price.toLocaleString()}</p>
                </motion.div>
              ))}
              {query.length > 1 && results.length === 0 && (
                <p className="text-zinc-400 col-span-full text-center py-20">No results found for "{query}"</p>
              )}
              {query.length <= 1 && (
                <div className="col-span-full">
                  <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-6">Suggested Searches</h3>
                  <div className="flex flex-wrap gap-4">
                    {['Evening Wear', 'Outerwear', 'Silk', 'Leather'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-6 py-3 bg-zinc-50 rounded-full text-sm hover:bg-zinc-100 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
