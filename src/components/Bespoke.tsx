import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Ruler, Sparkles, Calendar, X, CheckCircle } from 'lucide-react';

export default function Bespoke() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsBookingOpen(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-vibrant mb-6 block font-bold">The Ultimate Luxury</span>
          <h1 className="serif text-6xl md:text-8xl mb-8 leading-tight">Bespoke <br /> Tailoring</h1>
          <p className="text-zinc-500 text-lg leading-relaxed mb-10">
            Experience the pinnacle of sartorial excellence. Our bespoke service offers a completely personalized journey, from initial sketch to final fitting. Each garment is hand-crafted in our London atelier using techniques passed down through generations.
          </p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-10 py-5 bg-black text-white rounded-full hover:bg-vibrant transition-all flex items-center gap-3 font-medium"
          >
            <Calendar size={20} />
            Book a Consultation
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200&h=1500" 
            alt="Tailoring" 
            className="rounded-[2rem] shadow-2xl"
          />
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl border border-zinc-100 max-w-xs">
            <p className="text-sm italic text-zinc-600">"A bespoke suit is not just clothing; it's an extension of one's personality, crafted with precision and soul."</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Scissors />, title: "Hand-Cut", desc: "Every pattern is drafted from scratch based on your unique measurements." },
          { icon: <Sparkles />, title: "Finest Fabrics", desc: "Access to an exclusive library of rare wools, silks, and vicuña from the world's best mills." },
          { icon: <Ruler />, title: "Perfect Fit", desc: "Multiple fittings ensure the garment drapes perfectly and moves with your body." }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-zinc-50 rounded-3xl"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-vibrant">
              {item.icon}
            </div>
            <h3 className="serif text-2xl mb-4">{item.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                {isSuccess ? (
                  <div className="text-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h3 className="serif text-3xl mb-2">Consultation Booked</h3>
                    <p className="text-zinc-500">Thank you. A master tailor will contact you shortly to confirm your appointment.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="serif text-4xl mb-2">Book Consultation</h3>
                      <p className="text-zinc-500">Select your preferred time and location for a private fitting.</p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Date</label>
                          <input required type="date" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Time</label>
                          <select required className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors">
                            <option>10:00 AM</option>
                            <option>12:00 PM</option>
                            <option>02:00 PM</option>
                            <option>04:00 PM</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Location</label>
                        <select required className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors">
                          <option>London Flagship (Savile Row)</option>
                          <option>Paris Atelier</option>
                          <option>New York Showroom</option>
                          <option>Private Residence (London Only)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Full Name</label>
                        <input required type="text" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:border-black transition-colors" placeholder="John Doe" />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-5 bg-black text-white rounded-xl hover:bg-vibrant transition-all font-medium text-lg mt-6"
                      >
                        Confirm Booking
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
