export interface Color {
  name: string;
  hex: string;
}

export interface ProductDetails {
  material: string;
  dimensions: string;
  care: string;
}

export interface BuyLinks {
  shopee?: string;
  facebook?: string;
  tiktok?: string;
  zalo?: string;
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
  buyLinks: BuyLinks;
}
