import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, X, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../constants';

export default function Reviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="serif text-5xl mb-4">Client Stories</h2>
          <p className="text-zinc-500 max-w-md">Hear from our community about their experiences with AURELIAN's curated collections.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-black text-white rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <MessageSquare size={18} />
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REVIEWS.map((review, idx) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 border border-zinc-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={review.avatar} 
                alt={review.author} 
                className="w-12 h-12 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-medium">{review.author}</h4>
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-zinc-600 leading-relaxed italic">"{review.content}"</p>
            <div className="mt-6 pt-6 border-t border-zinc-50 text-xs text-zinc-400 uppercase tracking-widest">
              {new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                {submitted ? (
                  <div className="text-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h3 className="serif text-3xl mb-2">Thank You</h3>
                    <p className="text-zinc-500">Your review has been submitted for moderation.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="serif text-3xl mb-8">Share Your Experience</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Rating</label>
                        <div className="flex gap-2 text-zinc-300">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button key={num} type="button" className="hover:text-amber-500 transition-colors">
                              <Star size={24} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Your Story</label>
                        <textarea 
                          required
                          className="w-full p-4 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 min-h-[120px]"
                          placeholder="Tell us about your piece..."
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-4 bg-black text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium"
                      >
                        Submit Review
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
