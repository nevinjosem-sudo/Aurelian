import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-8 border-bottom border-zinc-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="serif text-2xl">Your Bag</h2>
                <span className="text-xs bg-zinc-100 px-2 py-1 rounded-full font-medium">{items.length}</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-zinc-400">Your bag is empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-sm font-medium border-b border-black pb-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{item.name}</h3>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-zinc-300 hover:text-vibrant transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">
                          {item.category} {item.selectedSize && `• Size ${item.selectedSize}`}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-sm text-zinc-500">Qty: {item.quantity}</div>
                        <div className="font-medium">${item.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-zinc-50 border-t border-zinc-100 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-400 text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-medium">${total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full py-5 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 font-medium"
                >
                  Checkout Securely
                  <ArrowRight size={20} />
                </button>
                <p className="text-[10px] text-center text-zinc-400 uppercase tracking-[0.2em]">
                  Complimentary Shipping & Returns
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
