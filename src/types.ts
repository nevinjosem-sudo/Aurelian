export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  username: string;
  name: string;
}

export type View = 'home' | 'reviews' | 'cart' | 'checkout' | 'collection' | 'product-detail' | 'bespoke' | 'shipping' | 'returns' | 'size-guide' | 'contact' | 'privacy' | 'terms' | 'new-arrivals';
