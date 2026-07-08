'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-primary/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-text-primary hover:text-accent p-2 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="font-heading text-2xl font-bold tracking-widest text-text-primary hover:opacity-90 transition-opacity">
              {SITE_NAME}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 relative py-1 hover:text-accent",
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

          {/* Right Action: Shopee Link */}
          <div className="flex items-center">
            <a
              href="https://shopee.vn/d.blink"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 border border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-button font-body text-[10px] font-semibold uppercase tracking-widest transition-all duration-300"
            >
              Ghé Shopee <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            
            {/* Mobile Shop Link Icon */}
            <a
              href="https://shopee.vn/d.blink"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden text-text-primary hover:text-accent p-2"
            >
              <ArrowUpRight className="h-5 w-5" />
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
              <span className="font-heading text-xl font-bold tracking-widest">{SITE_NAME}</span>
              <button
                type="button"
                className="text-text-primary hover:text-accent p-2 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-6 px-6 py-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-300",
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
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-3.5 bg-accent text-white rounded-button font-body text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-[#B36852]"
                >
                  Mua tại Shopee <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
