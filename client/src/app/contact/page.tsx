'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi lại bạn sớm nhất.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-3">Chăm sóc khách hàng</span>
        <h1 className="font-heading text-4xl font-bold text-text-primary">Liên hệ với DBlink</h1>
        <div className="h-[2px] w-12 bg-accent mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Info list */}
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">Chúng tôi luôn lắng nghe bạn</h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
              Bạn có bất kỳ câu hỏi nào về sản phẩm, dịch vụ hay đơn hàng? Đừng ngần ngại liên hệ với DBlink, đội ngũ tư vấn hỗ trợ khách hàng của chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Cửa hàng flagship</h4>
                <p className="font-body text-xs text-text-secondary mt-1">123 Đường Bà Triệu, Phường Nguyễn Du, Quận Hai Bà Trưng, Hà Nội</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Hotline hỗ trợ</h4>
                <p className="font-body text-xs text-text-secondary mt-1">1900 8198 (8:00 - 22:00 hằng ngày)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Email hỗ trợ</h4>
                <p className="font-body text-xs text-text-secondary mt-1">cskh@dblink.vn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-border p-8 rounded-card shadow-sm">
          <div className="space-y-2">
            <label htmlFor="name" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">Họ và tên</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">Email liên hệ</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="font-body text-xs font-semibold uppercase tracking-wider text-text-primary block">Lời nhắn của bạn</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full rounded-button border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body resize-none"
              placeholder="Hãy gửi cho chúng tôi câu hỏi của bạn..."
            />
          </div>

          <Button type="submit" className="w-full text-xs py-3.5 flex justify-center">
            Gửi tin nhắn
          </Button>
        </form>
      </div>
    </div>
  );
}
