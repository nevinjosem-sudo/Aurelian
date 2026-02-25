import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h1 className="serif text-6xl mb-6">Contact Us</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Our client advisors are available to assist you with styling advice, product information, or any other inquiries you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-6">Direct Contact</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-vibrant group-hover:bg-vibrant group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">Phone</p>
                  <p className="font-medium">+44 (0) 20 7123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-vibrant group-hover:bg-vibrant group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">Email</p>
                  <p className="font-medium">concierge@aurelian.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-vibrant group-hover:bg-vibrant group-hover:text-white transition-all">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest">Live Chat</p>
                  <p className="font-medium">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-6">Flagship Store</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-vibrant shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium">12 Savile Row</p>
                <p className="text-zinc-500 text-sm">Mayfair, London W1S 3PQ</p>
                <p className="text-zinc-500 text-sm mt-2">Mon-Sat: 10:00 - 19:00</p>
                <p className="text-zinc-500 text-sm">Sun: 12:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-zinc-50 p-10 rounded-[2rem]">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="serif text-3xl mb-2">Message Sent</h3>
                <p className="text-zinc-500">A client advisor will respond to your inquiry within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm font-bold border-b border-black pb-1"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Full Name</label>
                    <input required className="w-full p-4 bg-white border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Email Address</label>
                    <input required type="email" className="w-full p-4 bg-white border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Subject</label>
                  <select className="w-full p-4 bg-white border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors appearance-none">
                    <option>Product Inquiry</option>
                    <option>Order Status</option>
                    <option>Bespoke Consultation</option>
                    <option>Returns & Exchanges</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-zinc-400">Message</label>
                  <textarea required className="w-full p-4 bg-white border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors min-h-[150px]" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full py-5 bg-black text-white rounded-xl hover:bg-vibrant transition-all font-medium text-lg">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
