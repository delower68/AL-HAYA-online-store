export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  gender?: 'MEN' | 'WOMEN' | 'KIDS';
  image: string;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
  discount?: string;
  description: string;
  gallery?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}
