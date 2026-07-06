'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-primary/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-xs font-medium tracking-wider uppercase transition-all duration-300 relative py-1 hover:text-accent",
                    isActive 
                      ? "text-accent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-accent" 
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="text-text-secondary hover:text-accent transition-colors duration-300 p-2 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-text-secondary hover:text-accent transition-colors duration-300 p-2 focus:outline-none">
              <User className="h-5 w-5" />
            </button>
            <Link href="/cart" className="text-text-secondary hover:text-accent transition-colors duration-300 p-2 relative focus:outline-none">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-bg-primary pb-12 shadow-xl animate-fade-in">
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
                    "block font-body text-sm font-medium uppercase tracking-wider transition-colors duration-300",
                    pathname === link.href ? "text-accent" : "text-text-primary hover:text-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
