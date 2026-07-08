'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProducts } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';
import { ChevronRight, Check, ArrowUpRight, MessageSquare, PhoneCall } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { getProductBySlug, getRelatedProducts } = useProducts();

  const [mounted, setMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'desc' | 'material' | 'shipping'>('desc');

  // Kích hoạt mounted để tránh Hydration Mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const product = getProductBySlug(slug);

  // Đặt màu mặc định khi load xong
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center animate-pulse">
        <div className="h-8 bg-bg-secondary w-48 mx-auto rounded-button mb-4" />
        <div className="h-4 bg-bg-secondary w-96 mx-auto rounded-button" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Không tìm thấy sản phẩm</h2>
        <p className="font-body text-sm text-text-secondary mt-2">Sản phẩm này không tồn tại hoặc đã bị ngừng bán.</p>
        <button onClick={() => router.push('/collections/all')} className="mt-6 font-body text-xs text-accent underline uppercase tracking-wider font-semibold">
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const relatedProducts = product ? getRelatedProducts(product.id, product.category, 4) : [];
  const images = product.images || [];
  const colors = product.colors || [];
  const buyLinks = product.buyLinks || {};
  const details = product.details || { material: "", dimensions: "", care: "" };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="text-[10px] font-body text-text-secondary mb-8 uppercase tracking-widest flex items-center gap-1.5">
        <a href="/" className="hover:text-accent transition-colors">Trang chủ</a>
        <ChevronRight className="h-3 w-3" />
        <a href={`/collections/${product.category}`} className="hover:text-accent transition-colors">
          {product.category === 'balo-da' ? 'Balo Da' : product.category === 'balo-canvas' ? 'Balo Canvas' : product.category === 'balo-laptop' ? 'Balo Laptop' : 'Balo Mini'}
        </a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/30">
            <Image
              src={images[activeImageIndex] || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"}
              alt={`${product.name} - View ${activeImageIndex + 1}`}
              fill
              priority
              className="object-cover"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && <Badge variant="new">Mới</Badge>}
              {product.isBestSeller && <Badge variant="bestseller">Bán chạy</Badge>}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border transition-all duration-300 focus:outline-none ${
                  activeImageIndex === index ? 'border-accent' : 'border-border hover:border-text-secondary'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} Thumb ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <span className="font-body text-[10px] font-semibold text-accent uppercase tracking-widest block mb-2">
            Mã sản phẩm: DB-{product.slug?.slice(0, 8).toUpperCase()}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-body font-semibold text-2xl text-accent">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-body text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 font-body text-sm text-text-secondary leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-border my-8" />

          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="mb-8">
              <span className="font-body text-[10px] font-semibold text-text-primary uppercase tracking-widest block mb-3">
                Màu sắc: {selectedColor?.name}
              </span>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none ${
                      selectedColor?.hex === color.hex ? 'border-text-primary scale-110 shadow-sm' : 'border-border hover:border-text-secondary'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor?.hex === color.hex && (
                      <Check className={`h-4 w-4 ${color.hex === '#FAF8F5' || color.hex === '#EFE6DC' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Buy Now Buttons — Link to Channels */}
          <div className="space-y-4 mb-8">
            {buyLinks.shopee && (
              <a
                href={buyLinks.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-button font-body text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-[#A83B29] shadow-sm hover:shadow"
              >
                Mua ngay tại Shopee <ArrowUpRight className="h-4 w-4" />
              </a>
            )}

            <div className="grid grid-cols-2 gap-4">
              {buyLinks.facebook && (
                <a
                  href={buyLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-button font-body text-[10px] font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4" /> Messenger
                </a>
              )}
              {buyLinks.zalo && (
                <a
                  href={buyLinks.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-button font-body text-[10px] font-semibold uppercase tracking-widest transition-all duration-300"
                >
                  <PhoneCall className="h-4 w-4" /> Zalo Tư Vấn
                </a>
              )}
            </div>
          </div>

          {/* Tabs Details */}
          <div className="border border-border rounded-card overflow-hidden bg-white shadow-sm">
            <div className="flex border-b border-border bg-bg-secondary/30">
              <button
                onClick={() => setActiveTab('desc')}
                className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider font-body border-b-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'desc' ? 'border-accent text-accent bg-white' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Thông số
              </button>
              <button
                onClick={() => setActiveTab('material')}
                className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider font-body border-b-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'material' ? 'border-accent text-accent bg-white' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Chất liệu
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`flex-1 py-3 text-[10px] font-semibold uppercase tracking-wider font-body border-b-2 transition-all duration-300 focus:outline-none ${
                  activeTab === 'shipping' ? 'border-accent text-accent bg-white' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Vận chuyển
              </button>
            </div>
            
            <div className="p-6 font-body text-xs text-text-secondary leading-relaxed space-y-3">
              {activeTab === 'desc' && (
                <>
                  <p><strong className="text-text-primary">Kích thước:</strong> {details.dimensions}</p>
                  <p><strong className="text-text-primary">Bảo hành:</strong> Hỗ trợ bảo hành lỗi đường may, cúc bấm trong vòng 6 tháng kể từ khi mua hàng tại các kênh bán chính thức.</p>
                </>
              )}
              {activeTab === 'material' && (
                <>
                  <p><strong className="text-text-primary">Chất liệu:</strong> {details.material}</p>
                  <p><strong className="text-text-primary">Hướng dẫn bảo quản:</strong> {details.care}</p>
                </>
              )}
              {activeTab === 'shipping' && (
                <>
                  <p><strong className="text-text-primary">Đặt mua:</strong> Vui lòng click nút "Mua ngay tại Shopee" hoặc liên hệ Messenger/Zalo để được tư vấn kích thước và chốt đơn nhanh nhất.</p>
                  <p><strong className="text-text-primary">Hỗ trợ giao hàng:</strong> Giao hàng COD toàn quốc, được kiểm tra hàng trước khi thanh toán.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-20 border-t border-border mt-16">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-8 text-center sm:text-left">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
