import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Filter, ChevronDown, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface CollectionProps {
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

export default function Collection({ onProductClick, onAddToCart }: CollectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(PRODUCTS.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'newest' - assuming original order is newest
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="serif text-6xl mb-4">The Collection</h1>
          <p className="text-zinc-500 max-w-md">Explore our full range of heritage-inspired luxury pieces, crafted for longevity and timeless style.</p>
        </div>
        <div className="flex gap-4 relative">
          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsSortOpen(false);
              }}
              className={`px-6 py-3 border border-zinc-200 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-zinc-50 transition-colors ${selectedCategory !== 'All' ? 'bg-vibrant text-white border-vibrant' : ''}`}
            >
              <Filter size={16} />
              {selectedCategory === 'All' ? 'Filter' : selectedCategory}
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-2xl shadow-xl z-20 overflow-hidden"
                >
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-sm hover:bg-zinc-50 transition-colors ${selectedCategory === cat ? 'text-vibrant font-bold' : 'text-zinc-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsFilterOpen(false);
              }}
              className="px-6 py-3 border border-zinc-200 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-zinc-50 transition-colors"
            >
              Sort By
              <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-2xl shadow-xl z-20 overflow-hidden"
                >
                  {[
                    { id: 'newest', label: 'Newest' },
                    { id: 'price-low', label: 'Price: Low to High' },
                    { id: 'price-high', label: 'Price: High to Low' },
                    { id: 'name', label: 'Name: A-Z' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id as SortOption);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-sm hover:bg-zinc-50 transition-colors ${sortBy === opt.id ? 'text-vibrant font-bold' : 'text-zinc-600'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredAndSortedProducts.map((product, idx) => (
          <motion.div 
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
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
              <h3 className="text-lg font-medium group-hover:text-vibrant transition-colors">{product.name}</h3>
              <p className="text-zinc-500">${product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-32">
          <p className="text-zinc-400">No products found in this category.</p>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="mt-4 text-vibrant font-bold border-b border-vibrant pb-1"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
