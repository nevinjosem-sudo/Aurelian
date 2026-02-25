import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function Checkout({ total, onComplete }: { total: number, onComplete: () => void }) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="serif text-4xl mb-4">Order Confirmed</h2>
        <p className="text-zinc-500 mb-8">Your luxury pieces are being prepared for shipment. A confirmation email has been sent.</p>
        <div className="p-6 bg-zinc-50 rounded-2xl text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Order Number</span>
            <span className="font-mono">#LX-882910</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Estimated Delivery</span>
            <span>3-5 Business Days</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="serif text-4xl mb-8">Secure Checkout</h2>
          
          <div className="mb-10 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4 text-blue-700">
            <ShieldCheck size={24} />
            <p className="text-sm font-medium">Your transaction is protected by 256-bit SSL encryption.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
                <input required placeholder="Last Name" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
              </div>
              <input required placeholder="Address" className="w-full p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
              <div className="grid grid-cols-3 gap-4">
                <input required placeholder="City" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
                <input required placeholder="State" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
                <input required placeholder="ZIP" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">Payment Details</h3>
                <div className="flex gap-2">
                  <CreditCard size={16} className="text-zinc-300" />
                  <Lock size={16} className="text-zinc-300" />
                </div>
              </div>
              <div className="relative">
                <input required placeholder="Card Number" className="w-full p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black pl-12" />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="MM/YY" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
                <input required placeholder="CVC" className="p-4 border border-zinc-200 rounded-xl focus:outline-none focus:border-black" />
              </div>
            </div>

            <button 
              disabled={step === 'processing'}
              className="w-full py-5 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 font-medium text-lg disabled:opacity-50"
            >
              {step === 'processing' ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay ${total.toLocaleString()}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
            <h3 className="serif text-2xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between text-xl font-medium">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-zinc-100">
                <div className="w-12 h-12 bg-zinc-50 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Authenticity Guaranteed</h4>
                  <p className="text-xs text-zinc-400">Every piece is verified by our experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
