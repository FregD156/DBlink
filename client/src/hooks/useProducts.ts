import { useState, useEffect } from 'react';
import { Product } from '@/types';
import productsData from '@/data/mock-products.json';
import { supabase } from '@/lib/supabase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);

  useEffect(() => {
    async function fetchFromSupabase() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const parsedData = data.map((item: any) => ({
            ...item,
            colors: typeof item.colors === 'string' ? JSON.parse(item.colors) : item.colors,
            images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images,
            details: typeof item.details === 'string' ? JSON.parse(item.details) : item.details,
            buyLinks: typeof item.buyLinks === 'string' ? JSON.parse(item.buyLinks) : item.buyLinks,
          }));
          setProducts(parsedData);
        }
      } catch (err) {
        console.warn('Lỗi khi fetch dữ liệu từ Supabase, sử dụng database tĩnh dự phòng:', err);
      }
    }

    fetchFromSupabase();
  }, []);

  const getProducts = (): Product[] => {
    return products;
  };

  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(p => p.slug === slug);
  };

  const getProductsByCategory = (categorySlug: string): Product[] => {
    if (categorySlug === 'all' || !categorySlug) return getProducts();
    return products.filter(p => p.category === categorySlug);
  };

  const getFeaturedProducts = (): Product[] => {
    return products.filter(p => p.isBestSeller);
  };

  const getNewProducts = (): Product[] => {
    return products.filter(p => p.isNew);
  };

  const getRelatedProducts = (currentProductId: string, category: string, limit = 4): Product[] => {
    return products
      .filter(p => p.id !== currentProductId && p.category === category)
      .slice(0, limit);
  };

  return {
    products,
    getProducts,
    getProductBySlug,
    getProductsByCategory,
    getFeaturedProducts,
    getNewProducts,
    getRelatedProducts
  };
}
