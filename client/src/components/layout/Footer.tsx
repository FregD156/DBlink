'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_NAME, SITE_SLOGAN } from '@/lib/constants';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const handleSubmitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký nhận thông tin từ DBlink!');
  };

  return (
    <footer className="bg-bg-secondary border-t border-border mt-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-8 gap-12">
          {/* Brand Column */}
          <div className="space-y-6 xl:col-span-1">
            <Link href="/" className="font-heading text-2xl font-bold tracking-widest text-text-primary">
              {SITE_NAME}
            </Link>
            <p className="font-body text-sm text-text-secondary max-w-sm leading-relaxed">
              {SITE_SLOGAN}. Định vị dòng sản phẩm balo nữ tối giản sang trọng, thời thượng và đồng hành cùng bạn mỗi ngày.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nav & Policy Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:col-span-2">
            <div>
              <h3 className="font-body text-xs font-semibold text-text-primary tracking-wider uppercase">Mua sắm</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/collections/all" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Tất cả sản phẩm
                  </Link>
                </li>
                <li>
                  <Link href="/collections/balo-da" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Balo Da Cao Cấp
                  </Link>
                </li>
                <li>
                  <Link href="/collections/balo-canvas" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Balo Canvas Trẻ Trung
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-body text-xs font-semibold text-text-primary tracking-wider uppercase">Chính sách</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Vận chuyển & Giao nhận
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Chính sách Đổi trả (7 ngày)
                  </a>
                </li>
                <li>
                  <a href="#" className="font-body text-sm text-text-secondary hover:text-accent transition-colors duration-300">
                    Bảo hành sản phẩm
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="font-body text-xs font-semibold text-text-primary tracking-wider uppercase">Nhận thông tin ưu đãi</h3>
              <p className="mt-4 font-body text-sm text-text-secondary leading-relaxed">
                Đăng ký để nhận thông tin về bộ sưu tập mới nhất và ưu đãi đặc quyền từ DBlink.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={handleSubmitNewsletter}>
                <input
                  type="email"
                  required
                  className="w-full appearance-none rounded-button border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-body"
                  placeholder="Email của bạn..."
                />
                <Button type="submit" className="sm:px-4 py-2.5 text-xs font-semibold whitespace-nowrap">
                  Đăng ký
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-text-secondary text-center md:text-left">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Mọi quyền được bảo lưu. Thiết kế bởi FregD.
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-right">
            <span className="font-body text-xs text-text-secondary">Hotline: 1900 8198 (8:00 - 22:00)</span>
            <span className="font-body text-xs text-text-secondary">Email: cskh@dblink.vn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
