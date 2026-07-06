'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ChevronRight, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'COD'
  });

  const [isOrdered, setIsOrdered] = useState(false);

  if (cartItems.length === 0 && !isOrdered) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Giỏ hàng của bạn đang trống</h2>
        <p className="font-body text-sm text-text-secondary mt-2">Vui lòng chọn sản phẩm trước khi thanh toán.</p>
        <button onClick={() => router.push('/collections/all')} className="mt-6 font-body text-xs text-accent underline uppercase tracking-wider font-semibold">
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập đặt hàng thành công
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-success animate-bounce" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-text-primary">Đặt hàng thành công!</h2>
        <p className="font-body text-sm text-text-secondary mt-4 leading-relaxed">
          Cảm ơn bạn <strong className="text-text-primary">{formData.name}</strong> đã tin dùng sản phẩm của DBlink.
          Mã đơn hàng của bạn là <strong className="text-text-primary">#DB{Math.floor(100000 + Math.random() * 900000)}</strong>.
          Chúng tôi đã gửi email xác nhận và sẽ liên hệ giao hàng sớm nhất.
        </p>
        <div className="mt-8">
          <Button variant="primary" onClick={() => router.push('/')} className="text-xs">
            Về Trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="text-[10px] font-body text-text-secondary mb-8 uppercase tracking-widest flex items-center gap-1.5">
        <a href="/" className="hover:text-accent transition-colors">Trang chủ</a>
        <ChevronRight className="h-3 w-3" />
        <a href="/cart" className="hover:text-accent transition-colors">Giỏ hàng</a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-primary">Thanh toán</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          <div className="border-b border-border pb-4">
            <h2 className="font-heading text-2xl font-bold text-text-primary">Thông tin giao hàng</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">
                Họ và tên *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
                placeholder="Nguyễn Văn A"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">
                Số điện thoại *
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
                placeholder="09xxxxxxxx"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">
              Email nhận thông báo *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">
              Địa chỉ nhận hàng *
            </label>
            <textarea
              name="address"
              id="address"
              required
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body resize-none"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
            />
          </div>

          <div className="border-b border-border pt-4 pb-2">
            <h2 className="font-heading text-2xl font-bold text-text-primary">Phương thức thanh toán</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-border rounded-card bg-white cursor-pointer hover:border-accent transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === 'COD'}
                onChange={handleInputChange}
                className="accent-accent"
              />
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent animate-pulse" />
                <div className="text-left">
                  <span className="font-body text-sm font-semibold text-text-primary block">Thanh toán khi nhận hàng (COD)</span>
                  <span className="font-body text-xs text-text-secondary block">Nhận hàng rồi mới thanh toán tiền mặt</span>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-border rounded-card bg-white cursor-pointer hover:border-accent transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="VNPAY"
                checked={formData.paymentMethod === 'VNPAY'}
                onChange={handleInputChange}
                className="accent-accent"
              />
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <span className="font-body text-sm font-semibold text-text-primary block">Cổng thanh toán VNPay</span>
                  <span className="font-body text-xs text-text-secondary block">Hỗ trợ thẻ ATM nội địa & thẻ quốc tế Visa/Master</span>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 border border-border rounded-card bg-white cursor-pointer hover:border-accent transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="MOMO"
                checked={formData.paymentMethod === 'MOMO'}
                onChange={handleInputChange}
                className="accent-accent"
              />
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <span className="font-body text-sm font-semibold text-text-primary block">Ví điện tử MoMo</span>
                  <span className="font-body text-xs text-text-secondary block">Thanh toán nhanh qua ứng dụng MoMo trên điện thoại</span>
                </div>
              </div>
            </label>
          </div>

          <Button type="submit" className="w-full text-xs py-4 flex justify-center">
            Xác nhận đặt hàng
          </Button>
        </form>

        {/* Right Order Summary */}
        <div className="lg:col-span-5">
          <div className="border border-border rounded-card p-6 bg-white shadow-sm space-y-6 sticky top-24">
            <h3 className="font-body text-xs font-semibold uppercase tracking-wider border-b border-border pb-4">Đơn hàng của bạn</h3>

            <div className="divide-y divide-border max-h-[300px] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor.hex}`} className="flex items-center gap-4 py-3">
                  <div className="relative aspect-[4/5] w-12 overflow-hidden rounded bg-[#F8F6F2] border border-[#EBE6DD]/40 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-body text-xs font-semibold text-text-primary truncate">{item.product.name}</h4>
                    <p className="font-body text-[10px] text-text-secondary mt-0.5">Màu: {item.selectedColor.name} | SL: {item.quantity}</p>
                  </div>
                  <span className="font-body text-xs font-semibold text-text-primary flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3 font-body text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="font-medium text-text-primary">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển:</span>
                <span className="font-medium text-text-primary">{cartTotal >= 500000 ? 'Miễn phí' : '30.000đ'}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between text-sm text-text-primary font-bold">
                <span>Tổng số tiền:</span>
                <span className="text-accent text-base">{formatPrice(cartTotal + (cartTotal >= 500000 ? 0 : 30000))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
