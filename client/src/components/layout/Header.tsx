'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { easing, duration } from '@/lib/motion-tokens';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Các state quản lý Smart Sticky Header
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Chỉ kích hoạt trên các thiết bị không giảm chuyển động
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Nếu ở sát đỉnh trang (< 50px), luôn hiện và bỏ màu nền đè
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      setIsAtTop(false);

      // 2. Định hướng cuộn trang: Cuộn xuống ẩn, cuộn lên hiện
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Cuộn xuống -> Ẩn Toolbar
        } else {
          setIsVisible(true); // Cuộn lên -> Hiện Toolbar trượt xuống
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -80 }}
      transition={{ duration: duration.base, ease: easing.reveal }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isAtTop 
          ? "border-b border-transparent bg-transparent py-2" // Rộng rãi và trong suốt ở đỉnh trang
          : "border-b border-border/80 bg-bg-primary/95 backdrop-blur-md shadow-[0_1px_4px_rgba(29,11,17,0.02)] py-0" // Siêu gọn gàng khi cuộn xuống
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-text-primary hover:text-accent p-2 focus:outline-none"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Brand Logo & Editorial Divider */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-90 transition-opacity flex items-center">
              {/* Desktop Logo */}
              <div className="hidden sm:block relative w-[110px] h-[28px]">
                <Image
                  src="/logo-full.png"
                  alt={SITE_NAME}
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
              {/* Mobile Logo */}
              <div className="sm:hidden relative w-[28px] h-[28px]">
                <Image
                  src="/logo-icon.png"
                  alt={SITE_NAME}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Vạch kẻ dọc phân chia editorial giữa Logo và Nav */}
            <div className="hidden md:block w-[1px] h-5 bg-border/80 mx-8" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <nav className="flex space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-body text-[10px] font-medium tracking-[0.25em] uppercase transition-all duration-300 relative py-1 hover:text-accent",
                      isActive 
                        ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-accent" 
                        : "text-text-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Vạch kẻ dọc phân chia editorial giữa Nav và Action */}
          <div className="hidden md:block w-[1px] h-5 bg-border/80 mx-8" />

          {/* Right Action: Shopee Link */}
          <div className="flex items-center">
            <a
              href="https://shopee.vn/d.blink"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 border border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-button font-body text-[9px] font-medium tracking-widest uppercase transition-all duration-300"
            >
              Ghé Shopee <ArrowUpRight className="h-3 w-3" />
            </a>
            
            {/* Mobile Shop Link Icon */}
            <a
              href="https://shopee.vn/d.blink"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden text-text-primary hover:text-accent p-2"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-bg-primary pb-12 shadow-xl animate-fade-in border-r border-border">
            <div className="flex px-4 pb-2 pt-5 justify-between items-center border-b border-border">
              {/* Mobile Drawer Brand Logo */}
              <div className="relative w-[110px] h-[30px]">
                <Image
                  src="/logo-full.png"
                  alt={SITE_NAME}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                type="button"
                className="text-text-primary hover:text-accent p-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-6 px-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block font-body text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                    pathname === link.href ? "text-accent" : "text-text-primary hover:text-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-border pt-6">
                <a
                  href="https://shopee.vn/d.blink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-3 bg-accent text-white rounded-button font-body text-[10px] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#7D1137]"
                >
                  Mua tại Shopee <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
