export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  financingNote?: string;
  financingMonths?: number;
  taegRate?: string;
  image: string;
  badge?: string;
  badgeColor?: 'red' | 'terracotta' | 'black' | 'blue';
  inStock: boolean;
  fastDelivery: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: { [key: string]: string };
  isPreOrder?: boolean;
  tradeInEligible?: boolean;
  maxTradeInValue?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  itemCount: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  warrantyProtection?: boolean;
  warrantyPrice?: number;
}

export interface Coupon {
  code: string;
  title: string;
  discountType: 'fixed' | 'percent' | 'cashback';
  value: number;
  minSpend: number;
  expiryDate: string;
  description: string;
  isApplied?: boolean;
}

export type ActiveScreen = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'worten-resolve' 
  | 'coupons' 
  | 'worten-life' 
  | 'museum';
