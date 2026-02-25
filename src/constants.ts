import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Silk Evening Gown',
    price: 1250,
    category: 'Evening Wear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Hand-stitched Italian silk with a subtle shimmer, perfect for gala events.',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '2',
    name: 'Cashmere Camel Overcoat',
    price: 890,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Pure Mongolian cashmere, tailored for a timeless silhouette.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '3',
    name: 'Obsidian Leather Chelsea Boots',
    price: 450,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Full-grain calfskin leather with a durable Goodyear welt.',
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: '4',
    name: 'Ivory Satin Slip Dress',
    price: 620,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Elegant minimalist design with adjustable straps and a cowl neckline.',
    sizes: ['XS', 'S', 'M']
  },
  {
    id: '5',
    name: 'Onyx Velvet Blazer',
    price: 750,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Rich Italian velvet with silk lapels, a masterpiece of evening tailoring.',
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '6',
    name: 'Pearl Silk Blouse',
    price: 340,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Lustrous silk crepe de chine with delicate mother-of-pearl buttons.',
    sizes: ['S', 'M', 'L']
  },
  {
    id: '7',
    name: 'Slate Wool Trousers',
    price: 420,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Fine Merino wool with a sharp permanent crease and tapered fit.',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: '8',
    name: 'Crimson Leather Handbag',
    price: 1100,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Hand-painted edges and gold-tone hardware on premium pebbled leather.',
    sizes: ['One Size']
  },
  {
    id: '9',
    name: 'Ethereal Tulle Skirt',
    price: 580,
    category: 'Skirts',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Layered French tulle with a silk lining, creating a dreamlike volume.',
    sizes: ['S', 'M']
  },
  {
    id: '10',
    name: 'Azure Linen Shirt',
    price: 280,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Breathable Irish linen, garment-dyed for a soft, lived-in feel.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '11',
    name: 'Gold Link Necklace',
    price: 850,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800&h=1200',
    description: '18k solid gold links, hand-polished to a mirror finish.',
    sizes: ['One Size']
  },
  {
    id: '12',
    name: 'Sandstone Suede Jacket',
    price: 980,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800&h=1200',
    description: 'Buttery soft Italian suede with a tailored fit and silk lining.',
    sizes: ['M', 'L', 'XL']
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Elena Rossi',
    rating: 5,
    content: 'The quality of the silk is unparalleled. I wore the Midnight Gown to the Opera and received countless compliments.',
    date: '2024-01-15',
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: '2',
    author: 'Julian Vane',
    rating: 5,
    content: 'Exceptional tailoring. The overcoat fits like a second skin. Truly a heritage piece.',
    date: '2024-02-02',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    id: '3',
    author: 'Sophia Chen',
    rating: 4,
    content: 'Beautiful packaging and fast delivery. The boots are stunning, though they took a few days to break in.',
    date: '2024-02-10',
    avatar: 'https://picsum.photos/seed/user3/100/100'
  }
];
