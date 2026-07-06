'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { getProductBySlug, getRelatedProducts } = useProducts();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'material' | 'shipping'>('desc');

  // Đặt màu mặc định khi load xong
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

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

  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(product, selectedColor, quantity);
    alert(`Đã thêm ${quantity} x ${product.name} (${selectedColor.name}) vào giỏ hàng!`);
  };

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
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/40">
            <Image
              src={product.images[activeImageIndex]}
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
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border transition-all duration-300 ${
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
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <span className="font-body text-[11px] font-semibold text-text-primary uppercase tracking-widest block mb-3">
                Màu sắc: {selectedColor?.name}
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      selectedColor?.hex === color.hex ? 'border-text-primary scale-110 shadow-sm' : 'border-border hover:border-text-secondary'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor?.hex === color.hex && (
                      <Check className={`h-4 w-4 ${color.hex === '#FAF8F5' || color.hex === '#F1ECE4' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-border rounded-button h-13 w-fit bg-white">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-12 h-full flex items-center justify-center font-body font-medium text-text-primary hover:text-accent transition-colors focus:outline-none"
              >
                -
              </button>
              <span className="w-10 text-center font-body text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-12 h-full flex items-center justify-center font-body font-medium text-text-primary hover:text-accent transition-colors focus:outline-none"
              >
                +
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="flex-grow h-13 flex items-center justify-center gap-2 text-xs"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              Thêm vào giỏ hàng
            </Button>
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
                  <p><strong className="text-text-primary">Kích thước:</strong> {product.details.dimensions}</p>
                  <p><strong className="text-text-primary">Chế độ bảo hành:</strong> Bảo hành 12 tháng toàn bộ lỗi chỉ may, khóa kéo, lỗi bong tróc da từ nhà sản xuất.</p>
                </>
              )}
              {activeTab === 'material' && (
                <>
                  <p><strong className="text-text-primary">Chất liệu:</strong> {product.details.material}</p>
                  <p><strong className="text-text-primary">Hướng dẫn bảo quản:</strong> {product.details.care}</p>
                </>
              )}
              {activeTab === 'shipping' && (
                <>
                  <p><strong className="text-text-primary">Vận chuyển:</strong> Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500k. Giao hàng hỏa tốc nội thành Hà Nội/TP.HCM trong 2-4h (có phụ phí).</p>
                  <p><strong className="text-text-primary">Đổi trả:</strong> Đổi mới sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng với bất kỳ lý do gì. Sản phẩm đổi trả phải còn nguyên nhãn mác, chưa qua sử dụng.</p>
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
