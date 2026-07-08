'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { easing, duration } from '@/lib/motion-tokens';

interface ProductCardProps {
  product: Product;
}

const getOutfitTip = (colorName: string): string => {
  switch (colorName) {
    case 'Đen Nâu': return 'Phối cùng blazer sáng màu hoặc sơ mi tối giản';
    case 'Đỏ Gạch': return 'Nổi bật khi đi cùng đầm trắng hoặc váy be cát';
    case 'Xanh Rêu': return 'Hợp với outfit linen trắng hoặc đồ jean cá tính';
    case 'Be Cát': return 'Hoàn hảo cho phong cách tone-sur-tone màu ấm';
    default: return 'Dễ dàng mix-match với mọi trang phục thường ngày';
  }
};

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const images = product?.images || [];
  const colors = product?.colors || [];
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice || 0;

  return (
    <div className="flex flex-col w-full group mb-4">
      <Link 
        href={`/products/${product?.slug}`}
        className="flex flex-col w-full focus:outline-none"
      >
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: duration.base, ease: easing.reveal }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] cursor-pointer border border-[#EBE6DD]/30"
        >
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: hoveredColor ? 1.05 : 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: duration.fast, ease: easing.hover }}
          >
            <Image
              src={images[currentImageIndex] || images[0] || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"}
              alt={product?.name || "Product Image"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
              priority={product?.isBestSeller}
            />
          </motion.div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product?.isNew && <Badge variant="new">Mới</Badge>}
            {product?.isBestSeller && <Badge variant="bestseller">Bán chạy</Badge>}
            {originalPrice > price && (
              <Badge variant="discount">
                -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Hover Detail Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-10">
            <motion.span 
              className="inline-flex items-center gap-1 px-4 py-2 bg-white text-text-primary text-[9px] font-semibold uppercase tracking-widest rounded-button shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: duration.fast, ease: easing.hover }}
            >
              Xem chi tiết <ArrowUpRight className="h-3 w-3" />
            </motion.span>
          </div>
        </motion.div>
      </Link>

      {/* Info & Color Dots */}
      <div className="mt-3.5 flex flex-col relative min-h-[90px]">
        <Link href={`/products/${product?.slug}`}>
          <h3 className="font-body text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {product?.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-body font-semibold text-sm text-accent">
            {formatPrice(price)}
          </span>
          {originalPrice > price && (
            <span className="font-body text-[11px] text-text-secondary line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Color Dots with hover triggers */}
        {colors.length > 0 && (
          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex gap-1.5">
              {colors.map((color, idx) => (
                <button
                  key={color.hex}
                  onMouseEnter={() => {
                    setHoveredColor(color.name);
                    if (images[idx]) setCurrentImageIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredColor(null);
                    setCurrentImageIndex(0);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    currentImageIndex === idx ? 'border-text-primary scale-110 shadow-sm' : 'border-border hover:border-text-secondary'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            
            {/* Visual indicator of active color name */}
            <span className="font-body text-[9px] text-text-secondary uppercase tracking-wider font-semibold opacity-60">
              {colors[currentImageIndex]?.name}
            </span>
          </div>
        )}

        {/* Dynamic Outfit Tip Overlay */}
        <AnimatePresence>
          {hoveredColor && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15, ease: easing.hover }}
              className="absolute -bottom-8 left-0 right-0 font-body text-[9px] text-accent-alt bg-bg-secondary/95 px-2.5 py-1.5 rounded border border-border/40 font-semibold tracking-wider uppercase z-20 line-clamp-1 shadow-sm"
            >
              ✨ {getOutfitTip(hoveredColor)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
