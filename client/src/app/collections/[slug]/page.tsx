'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { CATEGORIES } from '@/lib/constants';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CollectionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const quickviewParam = searchParams.get('quickview');
  const { getProductsByCategory } = useProducts();

  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1500000);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);

  // Kích hoạt mount check để tránh lỗi Hydration Mismatch trong Next.js App Router
  useEffect(() => {
    setMounted(true);
  }, []);

  const category = useMemo(() => {
    if (!mounted) return CATEGORIES[0];
    return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  }, [slug, mounted]);

  const rawProducts = useMemo(() => {
    if (!mounted) return [];
    return getProductsByCategory(slug) || [];
  }, [slug, getProductsByCategory, mounted]);

  // Tự động mở Quick View Modal nếu có query parameter ?quickview=[slug-hoac-sku]
  useEffect(() => {
    if (quickviewParam && rawProducts.length > 0) {
      const targetProduct = rawProducts.find(
        (p) => p.slug === quickviewParam || p.id === quickviewParam
      );
      if (targetProduct) {
        setQuickViewProduct(targetProduct);
      }
    }
  }, [quickviewParam, rawProducts]);

  // Lấy danh sách màu sắc duy nhất có trong các sản phẩm để lọc
  const allColors = useMemo(() => {
    const colorsMap = new Map<string, string>();
    rawProducts.forEach((product) => {
      product.colors?.forEach((color) => {
        if (color.hex && color.name) {
          colorsMap.set(color.hex, color.name);
        }
      });
    });
    return Array.from(colorsMap.entries()).map(([hex, name]) => ({ hex, name }));
  }, [rawProducts]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // Lọc theo màu
    if (selectedColor) {
      result = result.filter((p) => p.colors && p.colors.some((c) => c.hex === selectedColor));
    }

    // Lọc theo giá tối đa
    result = result.filter((p) => p.price <= maxPrice);

    // Sắp xếp
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [rawProducts, selectedColor, maxPrice, sortBy]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center animate-pulse">
        <div className="h-8 bg-bg-secondary w-48 mx-auto rounded-button mb-4" />
        <div className="h-4 bg-bg-secondary w-96 mx-auto rounded-button" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="text-[10px] font-body text-text-secondary mb-4 uppercase tracking-widest">
        <a href="/" className="hover:text-accent transition-colors">Trang chủ</a>
        <span className="mx-2">/</span>
        <span className="text-text-primary">{category.name}</span>
      </div>

      {/* Header */}
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">{category.name}</h1>
        <p className="font-body text-sm text-text-secondary mt-2">Khám phá những thiết kế balo sang trọng phù hợp với phong cách trẻ trung hiện đại của bạn.</p>
      </div>

      {/* Sidebar Filter + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="space-y-8 lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <SlidersHorizontal className="h-4 w-4 text-text-primary" />
            <h3 className="font-body text-xs font-semibold uppercase tracking-wider">Bộ lọc</h3>
          </div>

          {/* Lọc theo giá */}
          <div className="space-y-3">
            <h4 className="font-body text-[11px] font-semibold uppercase tracking-widest text-text-primary">Mức giá tối đa</h4>
            <div className="flex justify-between text-xs text-text-secondary font-body">
              <span>500.000đ</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="1500000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-accent bg-bg-secondary h-1 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Lọc theo màu sắc */}
          {allColors.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-body text-[11px] font-semibold uppercase tracking-widest text-text-primary">Màu sắc</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor(null)}
                  className={`px-3 py-1.5 text-xs rounded-button border font-body transition-all duration-300 focus:outline-none ${
                    !selectedColor
                      ? 'border-text-primary bg-text-primary text-white'
                      : 'border-border bg-white text-text-secondary hover:border-text-primary hover:text-text-primary'
                  }`}
                >
                  Tất cả
                </button>
                {allColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-button border font-body transition-all duration-300 focus:outline-none ${
                      selectedColor === color.hex
                        ? 'border-text-primary bg-text-primary text-white'
                        : 'border-border bg-white text-text-secondary hover:border-text-primary'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid & Sort */}
        <div className="lg:col-span-3">
          {/* Sắp xếp & Số lượng sản phẩm */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 mb-6 gap-4">
            <span className="font-body text-xs text-text-secondary uppercase tracking-wider">
              {filteredProducts.length} sản phẩm
            </span>
            
            <div className="flex items-center gap-2">
              <span className="font-body text-xs text-text-secondary uppercase tracking-wider whitespace-nowrap">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="font-body text-xs border border-border bg-white rounded-button px-3 py-2.5 focus:border-accent focus:outline-none text-text-primary cursor-pointer uppercase tracking-wider"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-card bg-bg-secondary/40">
              <p className="font-body text-sm text-text-secondary">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
              <button 
                onClick={() => { setSelectedColor(null); setMaxPrice(1500000); }} 
                className="mt-4 font-body text-xs text-accent underline tracking-wider uppercase font-semibold focus:outline-none"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
