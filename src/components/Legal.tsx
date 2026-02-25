import React from 'react';
import { motion } from 'motion/react';

interface LegalProps {
  initialTab?: 'privacy' | 'terms';
}

export default function Legal({ initialTab = 'privacy' }: LegalProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  const content = {
    privacy: (
      <div className="space-y-8">
        <h1 className="serif text-5xl">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm uppercase tracking-widest">Last Updated: February 2026</p>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>At AURELIAN, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data.</p>
          
          <h3 className="text-black font-bold text-xl">1. Information Collection</h3>
          <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our concierge service. This may include your name, email, shipping address, and payment information.</p>
          
          <h3 className="text-black font-bold text-xl">2. Use of Information</h3>
          <p>Your information is used to process orders, provide customer support, and personalize your shopping experience. We may also use your data to send you exclusive updates and offers, which you can opt out of at any time.</p>
          
          <h3 className="text-black font-bold text-xl">3. Data Security</h3>
          <p>We implement industry-standard security measures, including 256-bit SSL encryption, to protect your data from unauthorized access or disclosure.</p>
        </div>
      </div>
    ),
    terms: (
      <div className="space-y-8">
        <h1 className="serif text-5xl">Terms of Service</h1>
        <p className="text-zinc-400 text-sm uppercase tracking-widest">Last Updated: February 2026</p>
        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
          <p>Welcome to AURELIAN. By accessing our website and purchasing our products, you agree to the following terms and conditions.</p>
          
          <h3 className="text-black font-bold text-xl">1. Product Authenticity</h3>
          <p>Every AURELIAN product is guaranteed to be authentic and crafted to the highest standards of quality. We reserve the right to limit quantities or refuse service at our discretion.</p>
          
          <h3 className="text-black font-bold text-xl">2. Pricing and Payment</h3>
          <p>All prices are listed in the local currency and include applicable taxes unless otherwise stated. Payment is required in full at the time of purchase.</p>
          
          <h3 className="text-black font-bold text-xl">3. Intellectual Property</h3>
          <p>All content on this website, including designs, images, and trademarks, is the property of AURELIAN and is protected by international copyright laws.</p>
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex gap-8 mb-16 border-b border-zinc-100">
        <button 
          onClick={() => setActiveTab('privacy')}
          className={`pb-4 text-sm uppercase tracking-widest font-bold transition-all relative ${activeTab === 'privacy' ? 'text-black' : 'text-zinc-300 hover:text-zinc-500'}`}
        >
          Privacy Policy
          {activeTab === 'privacy' && <motion.div layoutId="legal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-vibrant" />}
        </button>
        <button 
          onClick={() => setActiveTab('terms')}
          className={`pb-4 text-sm uppercase tracking-widest font-bold transition-all relative ${activeTab === 'terms' ? 'text-black' : 'text-zinc-300 hover:text-zinc-500'}`}
        >
          Terms of Service
          {activeTab === 'terms' && <motion.div layoutId="legal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-vibrant" />}
        </button>
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {content[activeTab]}
      </motion.div>
    </div>
  );
}
