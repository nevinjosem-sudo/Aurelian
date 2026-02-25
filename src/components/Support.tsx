import React from 'react';
import { motion } from 'motion/react';
import { Truck, RefreshCw, Ruler, ShieldCheck, CheckCircle } from 'lucide-react';

interface SupportProps {
  initialTab?: 'shipping' | 'returns' | 'size-guide';
}

export default function Support({ initialTab = 'shipping' }: SupportProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [returnSuccess, setReturnSuccess] = React.useState(false);

  const handleReturn = () => {
    setReturnSuccess(true);
    setTimeout(() => setReturnSuccess(false), 4000);
  };

  const tabs = [
    { id: 'shipping', label: 'Shipping', icon: <Truck size={18} /> },
    { id: 'returns', label: 'Returns', icon: <RefreshCw size={18} /> },
    { id: 'size-guide', label: 'Size Guide', icon: <Ruler size={18} /> }
  ];

  const content = {
    shipping: (
      <div className="space-y-8">
        <h2 className="serif text-4xl">Shipping Policy</h2>
        <p className="text-zinc-500 leading-relaxed">
          AURELIAN offers complimentary express shipping on all orders worldwide. We partner with premium couriers to ensure your luxury pieces arrive safely and promptly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-zinc-100 rounded-2xl">
            <h4 className="font-bold mb-2">Domestic (UK)</h4>
            <p className="text-sm text-zinc-500">Next business day delivery for orders placed before 2 PM GMT.</p>
          </div>
          <div className="p-6 border border-zinc-100 rounded-2xl">
            <h4 className="font-bold mb-2">International</h4>
            <p className="text-sm text-zinc-500">2-4 business days via DHL Express. All duties and taxes are included at checkout.</p>
          </div>
        </div>
        <div className="bg-zinc-50 p-8 rounded-3xl flex items-start gap-4">
          <ShieldCheck className="text-vibrant shrink-0" />
          <div>
            <h4 className="font-bold mb-1">Secure Packaging</h4>
            <p className="text-sm text-zinc-500">Every order is shipped in our signature climate-controlled, tamper-evident packaging to preserve the quality of the materials.</p>
          </div>
        </div>
      </div>
    ),
    returns: (
      <div className="space-y-8">
        <h2 className="serif text-4xl">Returns & Exchanges</h2>
        <p className="text-zinc-500 leading-relaxed">
          We want you to be completely satisfied with your AURELIAN purchase. If for any reason you are not, we offer complimentary returns within 14 days of delivery.
        </p>
        
        {returnSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 p-10 rounded-3xl text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="serif text-2xl mb-2">Return Request Initiated</h3>
            <p className="text-emerald-700 text-sm">Thank you. A prepaid shipping label and instructions have been sent to your email.</p>
          </motion.div>
        ) : (
          <>
            <div className="space-y-4">
              {[
                "Items must be in original condition with all tags attached.",
                "Footwear must be returned in the original box with no signs of wear on the soles.",
                "Bespoke and personalized items are final sale.",
                "Refunds are processed to the original payment method within 5 business days."
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center text-sm text-zinc-600">
                  <div className="w-1.5 h-1.5 bg-vibrant rounded-full" />
                  {item}
                </div>
              ))}
            </div>
            <button 
              onClick={handleReturn}
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-vibrant transition-all font-medium"
            >
              Start a Return
            </button>
          </>
        )}
      </div>
    ),
    'size-guide': (
      <div className="space-y-8">
        <h2 className="serif text-4xl">Size Guide</h2>
        <p className="text-zinc-500 leading-relaxed">
          Our garments are tailored to international standards. Please use the tables below to find your perfect fit. If you are between sizes, we recommend choosing the larger size for a more comfortable drape.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="py-4 text-xs uppercase tracking-widest text-zinc-400">Size</th>
                <th className="py-4 text-xs uppercase tracking-widest text-zinc-400">Chest (in)</th>
                <th className="py-4 text-xs uppercase tracking-widest text-zinc-400">Waist (in)</th>
                <th className="py-4 text-xs uppercase tracking-widest text-zinc-400">Hips (in)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { s: 'XS', c: '32-34', w: '26-28', h: '34-36' },
                { s: 'S', c: '35-37', w: '29-31', h: '37-39' },
                { s: 'M', c: '38-40', w: '32-34', h: '40-42' },
                { s: 'L', c: '41-43', w: '35-37', h: '43-45' },
                { s: 'XL', c: '44-46', w: '38-40', h: '46-48' }
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="py-4 font-bold">{row.s}</td>
                  <td className="py-4 text-zinc-500">{row.c}</td>
                  <td className="py-4 text-zinc-500">{row.w}</td>
                  <td className="py-4 text-zinc-500">{row.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-32 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all font-medium ${
                  activeTab === tab.id 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-zinc-400 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          {content[activeTab]}
        </motion.div>
      </div>
    </div>
  );
}
