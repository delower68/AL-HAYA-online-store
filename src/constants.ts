import { Product, Category, Review } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'oversized-tees',
    name: 'Oversized Tees',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    count: 120
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    count: 45
  },
  {
    id: 'cargos',
    name: 'Cargos & Denim',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    count: 32
  },
  {
    id: 'jackets',
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    count: 18
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Acid Wash Oversized Tee',
    price: 25,
    originalPrice: 35,
    category: 'Oversized Tees',
    gender: 'MEN',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    isTrending: true,
    discount: '28% OFF',
    description: 'Heavyweight cotton acid wash tee for the perfect vintage street look.'
  },
  {
    id: '2',
    name: 'Graphic Matrix Hoodie',
    price: 45,
    category: 'Hoodies',
    gender: 'WOMEN',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    isNew: true,
    description: 'Cyberpunk inspired graphic print on premium fleece hoodie.'
  },
  {
    id: '3',
    name: 'Tactical Cargo Pants',
    price: 55,
    category: 'Cargos & Denim',
    gender: 'MEN',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    isTrending: true,
    description: 'Multi-pocket tactical cargos with adjustable straps and reinforced knees.'
  },
  {
    id: '4',
    name: 'Boxy Fit Heavyweight Tee',
    price: 22,
    category: 'Oversized Tees',
    gender: 'WOMEN',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    isNew: true,
    description: 'Drop shoulder boxy fit tee in solid minimal shades.'
  },
  {
    id: '5',
    name: 'Utility Bomber Jacket',
    price: 85,
    originalPrice: 110,
    category: 'Outerwear',
    gender: 'MEN',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    discount: '22% OFF',
    isTrending: true,
    description: 'Water-resistant utility bomber with hidden zippers and signature branding.'
  },
  {
    id: '6',
    name: 'Distressed Grey Denim',
    price: 60,
    category: 'Cargos & Denim',
    gender: 'MEN',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    isTrending: true,
    description: 'Premium distressed denim with a relaxed tapered fit.'
  },
  {
    id: '7',
    name: 'Junior Street Joggers',
    price: 30,
    category: 'Cargos & Denim',
    gender: 'KIDS',
    image: 'https://images.unsplash.com/photo-1519457431-75731c5b81d4?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    isNew: true,
    description: 'Miniature tactical joggers for the young street enthusiasts.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Xavier Reed',
    role: 'Verified Hype',
    content: 'The heavyweight blank on this tee is insane. Fits exactly how an oversized shirt should. The acid wash is top tier.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sofia Chen',
    role: 'Style Curator',
    content: 'Finally found cargos that actually have structure. The tactical details aren\'t just for show, they actually work.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6c5b0adcc0c?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Frequent Dropper',
    content: 'Matrix hoodie is a vibe. The print doesn\'t fade even after multiple washes. AL-HAYA is actually certified.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop'
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop',
];
