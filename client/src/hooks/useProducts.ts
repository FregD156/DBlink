import { Product } from '@/types';
import productsData from '@/data/mock-products.json';

export function useProducts() {
  const getProducts = (): Product[] => {
    return productsData as Product[];
  };

  const getProductBySlug = (slug: string): Product | undefined => {
    return (productsData as Product[]).find(p => p.slug === slug);
  };

  const getProductsByCategory = (categorySlug: string): Product[] => {
    if (categorySlug === 'all' || !categorySlug) return getProducts();
    return (productsData as Product[]).filter(p => p.category === categorySlug);
  };

  const getFeaturedProducts = (): Product[] => {
    return (productsData as Product[]).filter(p => p.isBestSeller);
  };

  const getNewProducts = (): Product[] => {
    return (productsData as Product[]).filter(p => p.isNew);
  };

  const getRelatedProducts = (currentProductId: string, category: string, limit = 4): Product[] => {
    return (productsData as Product[])
      .filter(p => p.id !== currentProductId && p.category === category)
      .slice(0, limit);
  };

  return {
    getProducts,
    getProductBySlug,
    getProductsByCategory,
    getFeaturedProducts,
    getNewProducts,
    getRelatedProducts
  };
}
