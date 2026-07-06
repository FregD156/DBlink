'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.colors && product.colors.length > 0) {
      addToCart(product, product.colors[0], 1);
    }
  };

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group flex flex-col w-full focus:outline-none animate-fade-in"
    >
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] cursor-pointer border border-[#EBE6DD]/40"
        onMouseEnter={() => product.images[1] && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <Image
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-all duration-500 ease-out group-hover:scale-103"
          priority={product.isBestSeller}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && <Badge variant="new">Mới</Badge>}
          {product.isBestSeller && <Badge variant="bestseller">Bán chạy</Badge>}
          {product.originalPrice > product.price && (
            <Badge variant="discount">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 p-2.5 bg-white text-text-primary rounded-full shadow-md hover:bg-accent hover:text-white transition-all duration-300 transform translate-y-8 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 z-10 active:scale-90"
          title="Thêm nhanh vào giỏ"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-col">
        <h3 className="font-body text-[15px] font-normal text-text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-body font-semibold text-[15px] text-accent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-body text-xs text-text-secondary line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
