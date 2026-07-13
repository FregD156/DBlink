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
  onQuickView?: (product: Product) => void;
}

const getOutfitTip = (colorName: string): string => {
  switch (colorName) {
    case 'Đen Nâu': return 'Phối cùng blazer sáng màu hoặc sơ mi tối giản';
    case 'Đỏ Mận': return 'Nổi bật khi đi cùng đầm lụa trắng hoặc set váy champagne';
    case 'Xanh Than': return 'Phối cùng sơ mi trắng, quần tây sáng màu hoặc đồ denim thời thượng';
    case 'Be Cát': return 'Hoàn hảo cho phong cách tone-sur-tone màu ấm';
    default: return 'Dễ dàng mix-match với mọi trang phục thường ngày';
  }
};

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const images = product?.images || [];
  const colors = product?.colors || [];
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice || 0;

  // Tự động đổi sang ảnh thứ 2 (ảnh góc chụp khác/lifestyle) khi hover vào toàn bộ card sản phẩm
  const displayImageIndex = hoveredColor !== null 
    ? currentImageIndex 
    : (isCardHovered && images[1] ? 1 : 0);

  const CardContainer = (onQuickView ? 'div' : Link) as any;
  const containerProps = onQuickView 
    ? { onClick: () => onQuickView(product), className: "flex flex-col w-full focus:outline-none cursor-pointer" }
    : { href: `/products/${product?.slug}`, className: "flex flex-col w-full focus:outline-none" };

  const TitleContainer = (onQuickView ? 'div' : Link) as any;
  const titleProps = onQuickView
    ? { onClick: () => onQuickView(product), className: "flex-1 min-w-0 cursor-pointer" }
    : { href: `/products/${product?.slug}`, className: "flex-1 min-w-0" };

  return (
    <div 
      className="flex flex-col w-full group mb-4"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <CardContainer {...containerProps}>
        {/* Floating Fine-Art Frame (Khung tranh nghệ thuật lơ lửng) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: duration.base, ease: easing.reveal }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F2EAE4]/30 cursor-pointer border border-border/80 shadow-[0_4px_16px_rgba(29,11,17,0.01)] transition-shadow duration-500 hover:shadow-[0_12px_28px_rgba(29,11,17,0.03)]"
        >
          {/* Hiệu ứng ảnh tự động thu nhỏ nhẹ khi hover để lộ lót viền khung tranh */}
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isCardHovered ? 0.95 : 1.02 }}
            transition={{ duration: 0.6, ease: easing.reveal }}
          >
            <Image
              src={images[displayImageIndex] || images[0] || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"}
              alt={product?.name || "Product Image"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-all duration-700"
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
          <div className="absolute inset-0 bg-[#1D0B11]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-10">
            <motion.span 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-text-primary text-[8.5px] font-medium uppercase tracking-widest rounded-button shadow-sm border border-border/50"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: duration.fast, ease: easing.hover }}
            >
              Chi tiết <ArrowUpRight className="h-3 w-3" />
            </motion.span>
          </div>
        </motion.div>
      </CardContainer>

      {/* Info & Color Dots — Sắp xếp dạng nhãn triển lãm tranh nghệ thuật */}
      <div className="mt-3.5 flex flex-col relative min-h-[90px] px-1">
        <div className="flex justify-between items-baseline gap-2">
          <TitleContainer {...titleProps}>
            <h3 className="font-heading text-sm font-medium text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {product?.name}
            </h3>
          </TitleContainer>
          
          <div className="flex items-baseline gap-1.5 flex-shrink-0">
            <span className="font-body text-xs font-semibold text-accent">
              {formatPrice(price)}
            </span>
          </div>
        </div>
        
        {originalPrice > price && (
          <div className="mt-0.5 text-left">
            <span className="font-body text-[10px] text-text-secondary line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>
        )}

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
                  className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    displayImageIndex === idx ? 'border-text-primary scale-110 shadow-sm' : 'border-border hover:border-text-secondary'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            
            {/* Visual indicator of active color name */}
            <span className="font-body text-[9px] text-text-secondary uppercase tracking-wider font-semibold opacity-60">
              {colors[displayImageIndex]?.name}
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
              className="absolute -bottom-8 left-0 right-0 font-body text-[9px] text-accent-alt bg-bg-secondary/95 px-2.5 py-1.5 rounded border border-border/40 font-semibold tracking-wider uppercase z-20 line-clamp-1 shadow-sm text-center"
            >
              ✨ {getOutfitTip(hoveredColor)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
