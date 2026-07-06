'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-bg-secondary rounded-full">
            <ShoppingBag className="h-12 w-12 text-text-secondary" />
          </div>
        </div>
        <h2 className="font-heading text-2xl font-bold text-text-primary">Giỏ hàng của bạn đang trống</h2>
        <p className="font-body text-sm text-text-secondary mt-2 max-w-sm mx-auto leading-relaxed">
          Có vẻ như bạn chưa chọn được sản phẩm balo ưng ý nào. Hãy quay lại khám phá các bộ sưu tập của chúng tôi.
        </p>
        <Link href="/collections/all">
          <Button variant="primary" className="mt-8 text-xs">
            Quay lại mua sắm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-8 border-b border-border pb-6">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cartItems.map((item) => (
            <div 
              key={`${item.product.id}-${item.selectedColor.hex}`}
              className="flex items-center gap-4 sm:gap-6 p-4 border border-border rounded-card bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5] w-20 sm:w-24 overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/40 flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h3 className="font-body text-sm sm:text-base font-semibold text-text-primary">
                    <Link href={`/products/${item.product.slug}`} className="hover:text-accent transition-colors">
                      {item.product.name}
                    </Link>
                  </h3>
                  <div className="font-body text-xs text-text-secondary mt-1 flex items-center gap-1.5">
                    <span>Màu sắc:</span>
                    <span className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                    <span>{item.selectedColor.name}</span>
                  </div>
                  <p className="font-body text-sm font-semibold text-accent mt-2 sm:hidden">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-border rounded-button h-10 bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)}
                      className="w-8 h-full flex items-center justify-center font-body text-sm text-text-primary hover:text-accent transition-colors focus:outline-none"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-body text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)}
                      className="w-8 h-full flex items-center justify-center font-body text-sm text-text-primary hover:text-accent transition-colors focus:outline-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <span className="hidden sm:block font-body text-sm font-semibold text-accent min-w-[100px] text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                    className="text-text-secondary hover:text-error transition-colors p-2 focus:outline-none"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link href="/collections/all" className="inline-flex items-center gap-2 font-body text-xs text-text-secondary hover:text-accent transition-colors uppercase tracking-wider font-semibold">
            <ArrowLeft className="h-4 w-4" /> Tiếp tục mua sắm
          </Link>
        </div>

        {/* Right: Cart Summary */}
        <div className="lg:col-span-4">
          <div className="border border-border rounded-card p-6 bg-white shadow-sm space-y-6">
            <h3 className="font-body text-xs font-semibold uppercase tracking-wider border-b border-border pb-4">Tóm tắt đơn hàng</h3>
            
            <div className="space-y-4 font-body text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Số lượng sản phẩm:</span>
                <span className="font-medium text-text-primary">{cartCount} sản phẩm</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-medium text-text-primary">
                  {cartTotal >= 500000 ? 'Miễn phí' : '30.000đ'}
                </span>
              </div>
              
              <div className="border-t border-border pt-4 flex justify-between text-sm text-text-primary font-semibold">
                <span>Tổng số tiền:</span>
                <span className="text-accent text-base">
                  {formatPrice(cartTotal + (cartTotal >= 500000 ? 0 : 30000))}
                </span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full text-xs py-3.5 flex justify-center items-center gap-2">
                Tiến hành thanh toán
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
