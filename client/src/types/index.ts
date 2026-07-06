export interface Color {
  name: string;
  hex: string;
}

export interface ProductDetails {
  material: string;
  dimensions: string;
  care: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  rating: number;
  isNew: boolean;
  isBestSeller: boolean;
  colors: Color[];
  images: string[];
  details: ProductDetails;
}

export interface CartItem {
  product: Product;
  selectedColor: Color;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  paymentMethod: 'COD' | 'VNPAY' | 'MOMO';
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  createdAt: string;
}
