import React from 'react';
import { ShoppingBag, Menu, Search, User as UserIcon } from 'lucide-react';
import { View, User } from '../types';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  user: User | null;
}

export default function Navbar({ currentView, onNavigate, cartCount, onOpenCart, onOpenMenu, onOpenSearch, onOpenAccount, user }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={onOpenMenu}
            className="p-2 -ml-2 hover:bg-zinc-100 rounded-full transition-colors lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${currentView === 'home' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
            >
              Collections
            </button>
            <button 
              onClick={() => onNavigate('reviews')}
              className={`text-xs uppercase tracking-[0.2em] font-semibold transition-colors ${currentView === 'reviews' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
            >
              Reviews
            </button>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <h1 className="serif text-3xl tracking-tighter font-bold text-vibrant">AURELIAN</h1>
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenSearch}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors hidden sm:block"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={onOpenAccount}
            className={`p-2 hover:bg-zinc-100 rounded-full transition-colors flex items-center gap-2 ${user ? 'text-vibrant' : ''}`}
          >
            <UserIcon size={20} />
            {user && <span className="text-xs font-bold hidden md:block">{user.name}</span>}
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-vibrant text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
