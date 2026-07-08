'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { easing, duration } from '@/lib/motion-tokens';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product?.images || [];
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice || 0;

  return (
    <Link 
      href={`/products/${product?.slug}`}
      className="group flex flex-col w-full focus:outline-none"
    >
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: duration.base, ease: easing.reveal }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] cursor-pointer border border-[#EBE6DD]/30"
        onMouseEnter={() => images[1] && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <motion.div
          className="w-full h-full relative"
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

      <div className="mt-3.5 flex flex-col animate-fade-in">
        <h3 className="font-body text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
          {product?.name}
        </h3>
        
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
      </div>
    </Link>
  );
}
