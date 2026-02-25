import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Collection from './components/Collection';
import ProductDetail from './components/ProductDetail';
import AccountModal from './components/AccountModal';
import SearchOverlay from './components/SearchOverlay';
import Bespoke from './components/Bespoke';
import Support from './components/Support';
import Contact from './components/Contact';
import Legal from './components/Legal';
import NewArrivals from './components/NewArrivals';
import { Product, CartItem, View, User } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginGreeting, setLoginGreeting] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProduct]);

  const addToCart = (product: Product, size?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setLoginGreeting(`Hello, ${newUser.name}`);
    setTimeout(() => setLoginGreeting(null), 3000);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onAddToCart={(p) => addToCart(p)} onNavigate={setCurrentView} onProductClick={openProductDetail} />;
      case 'collection':
        return <Collection onProductClick={openProductDetail} onAddToCart={(p) => addToCart(p)} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setCurrentView('collection')} 
            onAddToCart={addToCart} 
          />
        ) : <Home onAddToCart={(p) => addToCart(p)} onNavigate={setCurrentView} onProductClick={openProductDetail} />;
      case 'reviews':
        return <Reviews />;
      case 'bespoke':
        return <Bespoke />;
      case 'shipping':
        return <Support initialTab="shipping" />;
      case 'returns':
        return <Support initialTab="returns" />;
      case 'size-guide':
        return <Support initialTab="size-guide" />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Legal initialTab="privacy" />;
      case 'terms':
        return <Legal initialTab="terms" />;
      case 'new-arrivals':
        return <NewArrivals onNavigate={setCurrentView} />;
      case 'checkout':
        return (
          <Checkout 
            total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} 
            onComplete={() => {
              setCartItems([]);
              setCurrentView('home');
            }} 
          />
        );
      default:
        return <Home onAddToCart={(p) => addToCart(p)} onNavigate={setCurrentView} onProductClick={openProductDetail} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar 
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        user={user}
      />

      <SideMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setCurrentView}
      />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <AccountModal 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onLogin={handleLogin}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onProductClick={openProductDetail}
      />

      <AnimatePresence>
        {loginGreeting && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-black text-white px-8 py-4 rounded-full shadow-2xl font-medium"
          >
            {loginGreeting}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-zinc-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="serif text-3xl mb-6 text-vibrant">AURELIAN</h2>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Redefining modern luxury through heritage craftsmanship and timeless design. Join our newsletter for exclusive access to new collections.
              </p>
              <div className="mt-8 flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-lg flex-1 focus:outline-none focus:border-black transition-colors"
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-vibrant transition-colors">
                  Join
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li onClick={() => setCurrentView('collection')} className="hover:text-black cursor-pointer transition-colors">Collections</li>
                <li onClick={() => setCurrentView('new-arrivals')} className="hover:text-black cursor-pointer transition-colors">New Arrivals</li>
                <li onClick={() => setCurrentView('bespoke')} className="hover:text-black cursor-pointer transition-colors">Bespoke Service</li>
                <li onClick={() => setCurrentView('reviews')} className="hover:text-black cursor-pointer transition-colors">Reviews</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li onClick={() => setCurrentView('shipping')} className="hover:text-black cursor-pointer transition-colors">Shipping</li>
                <li onClick={() => setCurrentView('returns')} className="hover:text-black cursor-pointer transition-colors">Returns</li>
                <li onClick={() => setCurrentView('size-guide')} className="hover:text-black cursor-pointer transition-colors">Size Guide</li>
                <li onClick={() => setCurrentView('contact')} className="hover:text-black cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400 uppercase tracking-widest">© 2026 AURELIAN. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-zinc-400 uppercase tracking-widest">
              <span onClick={() => setCurrentView('privacy')} className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
              <span onClick={() => setCurrentView('terms')} className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
