import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Twitter, Facebook } from 'lucide-react';
import { View } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
}

export default function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  const menuItems: { label: string, view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'New Arrivals', view: 'home' },
    { label: 'Collections', view: 'home' },
    { label: 'Client Reviews', view: 'reviews' },
    { label: 'Our Story', view: 'home' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
          />
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-white z-[90] p-12 flex flex-col"
          >
            <button onClick={onClose} className="self-end p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X size={24} />
            </button>

            <div className="mt-16 flex-1">
              <nav className="space-y-8">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      onNavigate(item.view);
                      onClose();
                    }}
                    className="block text-4xl serif hover:italic hover:translate-x-2 transition-all"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="pt-12 border-t border-zinc-100">
              <div className="flex gap-6 mb-8">
                <Instagram size={20} className="text-zinc-400 hover:text-black cursor-pointer transition-colors" />
                <Twitter size={20} className="text-zinc-400 hover:text-black cursor-pointer transition-colors" />
                <Facebook size={20} className="text-zinc-400 hover:text-black cursor-pointer transition-colors" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                © 2026 AURELIAN INTERNATIONAL
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
