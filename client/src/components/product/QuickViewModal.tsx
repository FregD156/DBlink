'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, ArrowUpRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor && selectedColor.image && product) {
      const idx = product.images.indexOf(selectedColor.image);
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  }, [selectedColor, product]);

  if (!product) return null;

  const images = product.images || [];
  const colors = product.colors || [];
  const currentPrice = selectedColor?.price || product.price;
  const currentOriginalPrice = selectedColor?.originalPrice || product.originalPrice || Math.round((currentPrice * 1.25) / 10000) * 10000;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-bg-primary w-full max-w-4xl rounded-card border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center hover:bg-bg-secondary transition-colors duration-300 z-30 focus:outline-none"
        >
          <X className="h-4 w-4 text-text-primary" />
        </button>

        {/* Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/30">
            <Image
              src={images[activeImageIndex] || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"}
              alt={`${product.name} - View ${activeImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2.5">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border transition-all duration-300 focus:outline-none ${
                    activeImageIndex === idx ? 'border-accent' : 'border-border hover:border-text-secondary'
                  }`}
                >
                  <Image src={img} alt="Thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between max-h-[85vh] md:max-h-none overflow-y-auto">
          <div className="space-y-6">
            <span className="font-body text-[10px] font-bold text-accent tracking-[0.2em] uppercase block">
              Mã sản phẩm: {product.id}
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary leading-tight">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="font-body font-semibold text-xl text-accent">
                {formatPrice(currentPrice)}
              </span>
              {currentOriginalPrice > currentPrice && (
                <span className="font-body text-xs text-text-secondary line-through">
                  {formatPrice(currentOriginalPrice)}
                </span>
              )}
            </div>

            <p className="font-body text-xs text-text-secondary leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-border/60 my-4" />

            {/* Colors */}
            {colors.length > 0 && (
              <div className="space-y-2.5">
                <span className="font-body text-[10px] font-bold text-text-primary uppercase tracking-widest block">
                  Màu sắc: {selectedColor?.name}
                </span>
                <div className="flex gap-2.5">
                  {colors.map((color: any) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none ${
                        selectedColor?.hex === color.hex ? 'border-text-primary scale-110 shadow-sm' : 'border-border hover:border-text-secondary'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.hex === color.hex && (
                        <Check className={`h-3 w-3 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Details */}
            <div className="space-y-2 mt-4">
              <span className="font-body text-[10px] font-bold text-text-primary uppercase tracking-widest block">Thông số:</span>
              <ul className="space-y-1.5 text-[11px] font-body text-text-secondary leading-relaxed">
                <li><span className="font-semibold text-text-primary">Chất liệu:</span> {product.details?.material}</li>
                <li><span className="font-semibold text-text-primary">Kích thước:</span> {product.details?.dimensions}</li>
                <li><span className="font-semibold text-text-primary">Bảo quản:</span> {product.details?.care}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {product.buyLinks?.shopee && (
              <a
                href={product.buyLinks.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white rounded-button font-body text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#7D1137] shadow-sm hover:shadow"
              >
                Mua ngay tại Shopee <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <Link 
              href={`/products/${product.slug}`}
              className="block w-full text-center py-3 border border-border hover:border-text-primary rounded-button font-body text-[9px] font-semibold uppercase tracking-widest transition-all duration-300 text-text-secondary hover:text-text-primary"
              onClick={onClose}
            >
              Xem chi tiết đầy đủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
