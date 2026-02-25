import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export default function AccountModal({ isOpen, onClose, onLogin }: AccountModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ username: '', password: '', name: '', email: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setMode('login');
      }, 2000);
    } else {
      onLogin({ username: formData.username, name: formData.name || formData.username });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-10">
              {showSuccess ? (
                <div className="text-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="serif text-3xl mb-2">Account Created</h3>
                  <p className="text-zinc-500">You can now log in with your credentials.</p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="serif text-4xl mb-2">{mode === 'login' ? 'Welcome Back' : 'Join Aurelian'}</h3>
                    <p className="text-zinc-500">
                      {mode === 'login' ? 'Enter your details to access your account' : 'Create an account for exclusive benefits'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input 
                          required
                          type="text"
                          placeholder="Full Name"
                          className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    )}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        required
                        type="text"
                        placeholder="Username or Email"
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        required
                        type="password"
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-black transition-colors"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-black text-white rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 font-medium text-lg mt-6"
                    >
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={20} />
                    </button>
                  </form>

                  <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
                    <p className="text-sm text-zinc-500">
                      {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                      <button 
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="ml-2 font-bold text-black hover:underline"
                      >
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
