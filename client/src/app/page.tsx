'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import { easing, duration, stagger } from '@/lib/motion-tokens';
import { formatPrice } from '@/lib/utils';

// Component phụ để băm nhỏ và tạo chuyển động chữ trễ (stagger) tinh tế
function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * stagger.tight,
            duration: duration.base,
            ease: easing.reveal
          }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

// Component Marquee chạy vô chậm và mượt mà
function InfiniteMarquee() {
  return (
    <div className="bg-text-primary text-bg-primary py-8 overflow-hidden select-none border-y border-border flex w-full relative">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap gap-16 font-heading text-4xl sm:text-6xl font-medium uppercase tracking-[0.2em] italic opacity-25 pr-16"
      >
        <span>Tối giản</span>
        <span>•</span>
        <span>Tự tin</span>
        <span>•</span>
        <span>Sang trọng</span>
        <span>•</span>
        <span>DBlink Style</span>
        <span>•</span>
        <span>Tối giản</span>
        <span>•</span>
        <span>Tự tin</span>
        <span>•</span>
        <span>Sang trọng</span>
        <span>•</span>
        <span>DBlink Style</span>
        <span>•</span>
        <span>Tối giản</span>
        <span>•</span>
        <span>Tự tin</span>
        <span>•</span>
        <span>Sang trọng</span>
        <span>•</span>
        <span>DBlink Style</span>
        <span>•</span>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  // 1. Dữ liệu Phối đồ ảo (Mix & Match Coordinator)
  const [selectedOutfit, setSelectedOutfit] = useState<'blazer' | 'dress' | 'denim'>('blazer');
  const [selectedBalo, setSelectedBalo] = useState<'balo-da' | 'balo-canvas' | 'balo-laptop' | 'balo-mini'>('balo-da');

  const outfits = {
    blazer: { name: "Blazer Công Sở", desc: "Set suit/blazer tone beige trang nhã, thanh lịch." },
    dress: { name: "Đầm Lụa Dạo Phố", desc: "Nhẹ nhàng, thướt tha cho các buổi trà chiều cuối tuần." },
    denim: { name: "Cá Tính Denim", desc: "Chất liệu bò phủi bụi, năng động và trẻ trung dạo phố." }
  };

  const balos = {
    'balo-da': { name: "Balo Da Mềm Minimalist", slug: "balo-da-mem-minimalist-dblink" },
    'balo-canvas': { name: "Balo Canvas Phối Da", slug: "balo-canvas-phoi-da-classic" },
    'balo-laptop': { name: "Balo Laptop Smart", slug: "balo-lap-top-nu-chong-nuoc-smart" },
    'balo-mini': { name: "Balo Mini Longchamp Vibes", slug: "balo-mini-nu-longchamp-vibes" }
  };

  const getMixMatchImage = () => {
    const key = `${selectedOutfit}-${selectedBalo}`;
    const imagesMap: Record<string, string> = {
      'blazer-balo-da': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
      'blazer-balo-laptop': 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
      'dress-balo-mini': 'https://images.unsplash.com/photo-1575844621280-577745e65c1a?q=80&w=800&auto=format&fit=crop',
      'denim-balo-canvas': 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=800&auto=format&fit=crop',
    };
    return imagesMap[key] || 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop';
  };

  const getStyleRating = () => {
    const key = `${selectedOutfit}-${selectedBalo}`;
    const ratingsMap: Record<string, { rating: string; tip: string }> = {
      'blazer-balo-da': {
        rating: "9.8/10 — Cực Kỳ Thanh Lịch",
        tip: "Sự kết hợp hoàn hảo tôn vinh vẻ đẹp tối giản của các cô nàng công sở. Chiếc balo da trơn mang lại sự chuyên nghiệp nhưng vô cùng thời thượng."
      },
      'blazer-balo-laptop': {
        rating: "9.5/10 — Workstyle Thời Thượng",
        tip: "Thiết kế balo ôm dáng kết hợp cùng blazer đứng phom mang lại sự an tâm tuyệt đối mà vẫn bảo vệ laptop của bạn mượt mà."
      },
      'dress-balo-mini': {
        rating: "9.7/10 — Nữ Tính & Bay Bổng",
        tip: "Quai đeo mảnh mai của balo mini giúp cân bằng lại sự mềm mại của đầm lụa. Điểm nhấn tuyệt vời cho các buổi hẹn hò chụp hình lookbook."
      },
      'denim-balo-canvas': {
        rating: "9.6/10 — Streetwear Năng Động",
        tip: "Vải canvas thô bụi bặm phối hợp cực ăn ý với chất denim phóng khoáng. Một set đồ lý tưởng cho các chuyến dã ngoại hay dạo phố dài ngày."
      }
    };
    return ratingsMap[key] || {
      rating: "9.0/10 — Phối Đồ Hài Hòa",
      tip: "Tông màu đồng điệu dễ dàng hòa quyện cùng trang phục, mang lại cảm giác thoải mái tự tin khi di chuyển."
    };
  };

  // 2. Dữ liệu Shop the Look (Hotspots)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const lookbookProducts = [
    {
      id: 1,
      name: "Balo Da Mềm Minimalist",
      price: 850000,
      slug: "balo-da-mem-minimalist-dblink",
      coords: { top: "35%", left: "45%" },
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Balo Mini Longchamp Vibes",
      price: 590000,
      slug: "balo-mini-nu-longchamp-vibes",
      coords: { top: "60%", left: "70%" },
      image: "https://images.unsplash.com/photo-1575844621280-577745e65c1a?q=80&w=200&auto=format&fit=crop"
    }
  ];



  return (
    <div className="flex flex-col w-full pb-16 overflow-hidden">
      {/* 1. Hero Section — Thesis Driven Slogan & High Quality Lifestyle */}
      <section className="relative w-full h-[90vh] bg-bg-secondary flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: easing.premium }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop"
            alt="DBlink Hero Campaign"
            fill
            priority
            className="object-cover object-center brightness-[0.85] grayscale-[5%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#221C18]/65 via-[#221C18]/25 to-transparent md:from-[#221C18]/80" />
        </motion.div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: duration.base, ease: easing.reveal }}
              className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-accent-alt bg-bg-primary/95 text-bg-primary px-3 py-1.5 inline-block mb-6 rounded-button shadow-sm"
            >
              Bộ sưu tập Thu Đông 2026
            </motion.span>
            
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              <SplitText text="Định hình" /> <br />
              <span className="text-accent"><SplitText text="cá tính riêng" /></span> <SplitText text="của bạn" />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: duration.base, ease: easing.reveal }}
              className="font-body text-sm sm:text-base text-bg-primary/80 mb-10 leading-relaxed max-w-lg"
            >
              DBlink mang tới dòng sản phẩm balo nữ tối giản sang trọng, tinh tế trong từng đường kim mũi chỉ. Khởi đầu hành trình mới đầy tự tin của chính bạn.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: duration.base, ease: easing.reveal }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/collections/all">
                <Button variant="primary" className="text-[10px] tracking-widest px-8">
                  Khám phá bộ sưu tập
                </Button>
              </Link>
              <a
                href="https://shopee.vn/d.blink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 border border-white text-white hover:bg-white hover:text-text-primary rounded-button font-body text-[10px] font-semibold uppercase tracking-widest transition-all duration-300"
              >
                Ghé Shopee Store <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slogan lớn chạy ngang màn hình (Infinite Marquee) */}
      <InfiniteMarquee />

      {/* 2. Brand Story Summary Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: duration.base, ease: easing.reveal }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block">Chúng tôi là ai</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              Sứ mệnh đồng hành cùng phong cách sống hiện đại
            </h2>
            <div className="h-[1px] w-12 bg-accent" />
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              DBlink không sản xuất balo đại trà. Chúng tôi chế tác ra những người bạn đồng hành. Định vị phân khúc thời trang cao cấp giá hợp lý, DBlink tôn vinh vẻ đẹp của sự giản đơn, tinh gọn nhưng đầy khí chất của người phụ nữ thế hệ mới.
            </p>
            <div>
              <Link href="/about">
                <Button variant="outline" className="text-[10px] px-6">Đọc câu chuyện thương hiệu</Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {/* Curtain Image Reveal (Khối ảnh trái) */}
            <motion.div 
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1.1, ease: easing.reveal }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-bg-secondary"
            >
              <motion.div 
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easing.reveal }}
                className="w-full h-full relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
                  alt="DBlink Detail Craft"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Curtain Image Reveal (Khối ảnh phải) */}
            <motion.div 
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1.1, delay: 0.2, ease: easing.reveal }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-bg-secondary mt-8"
            >
              <motion.div 
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easing.reveal }}
                className="w-full h-full relative"
              >
                <Image
                  src="https://images.unsplash.com/photo-1575844621280-577745e65c1a?q=80&w=600&auto=format&fit=crop"
                  alt="DBlink Lifestyle"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Phối Đồ Tương Tác (Mix & Match Coordinator) */}
      <section className="bg-[#FAF8F5] border-y border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Trải nghiệm tương tác</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary">Outfit Coordinator</h2>
            <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
            {/* Left Column: Select Options */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
              {/* Chọn Outfit */}
              <div className="space-y-4">
                <span className="font-body text-[10px] font-bold tracking-widest text-text-secondary uppercase block">Bước 1: Chọn trang phục nền</span>
                <div className="flex flex-col gap-2">
                  {Object.entries(outfits).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedOutfit(key as any)}
                      className={`w-full text-left px-5 py-4 border rounded-button font-body transition-all duration-300 focus:outline-none ${
                        selectedOutfit === key 
                          ? 'border-accent bg-accent/5 text-accent shadow-sm'
                          : 'border-border bg-white text-text-primary hover:border-text-secondary'
                      }`}
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider">{item.name}</h4>
                      <p className="text-[11px] text-text-secondary mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chọn Balo */}
              <div className="space-y-4">
                <span className="font-body text-[10px] font-bold tracking-widest text-text-secondary uppercase block">Bước 2: Phối với balo DBlink</span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(balos).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedBalo(key as any)}
                      className={`text-center px-3 py-4 border rounded-button font-body transition-all duration-300 focus:outline-none ${
                        selectedBalo === key
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-border bg-white text-text-primary hover:border-text-secondary'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider block leading-tight">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column: Live Style Render */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-card bg-bg-secondary border border-border shadow-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedOutfit}-${selectedBalo}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: duration.base, ease: easing.reveal }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={getMixMatchImage()}
                      alt="Outfit Coordination Model"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Floating Stylist Mark */}
                <div className="absolute top-4 right-4 bg-white/95 text-text-primary border border-border px-3 py-1.5 rounded-button shadow-sm flex items-center gap-1.5 z-10">
                  <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                  <span className="font-body text-[9px] font-bold tracking-wider uppercase">Live Preview</span>
                </div>
              </div>
            </div>

            {/* Right Column: Style Advice & CTA */}
            <div className="lg:col-span-3 flex flex-col justify-center bg-white p-8 border border-border rounded-card shadow-sm">
              <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Đánh giá phong cách</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedOutfit}-${selectedBalo}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading text-lg font-bold text-text-primary leading-tight">
                    {getStyleRating().rating}
                  </h3>
                  <p className="font-body text-xs text-text-secondary leading-relaxed">
                    {getStyleRating().tip}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="border-t border-border my-6" />
              
              <Link href={`/products/${balos[selectedBalo].slug}`} className="w-full">
                <Button variant="primary" className="w-full text-[9px] py-3.5 tracking-widest uppercase">
                  Chi tiết sản phẩm phối <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Artwork Showcase (LOGO THƯƠNG HIỆU TỐI GIẢN ĐỘC LẬP - KHÔNG CÓ Ô CLICK) */}
      <section className="w-full py-24 border-t border-border bg-[#FAF8F5] flex items-center justify-center">
        <div className="relative w-[340px] sm:w-[420px] h-[110px] sm:h-[140px] opacity-30 hover:opacity-50 transition-opacity duration-500 select-none">
          <Image
            src="/logo-full.png"
            alt="DBlink Logo Centerpiece"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* 5. Mua sắm theo ảnh thời trang (Shop The Look) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-border">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Thời trang dạo phố</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Shop The Look</h2>
          <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
        </div>

        <div className="relative aspect-[16/9] w-full min-h-[400px] md:min-h-[550px] overflow-hidden rounded-card bg-bg-secondary border border-border shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
            alt="DBlink Editorial Lookbook"
            fill
            className="object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Interactive Hotspots */}
          {lookbookProducts.map((p) => (
            <div
              key={p.id}
              className="absolute z-20"
              style={{ top: p.coords.top, left: p.coords.left }}
            >
              {/* Pulse Hotspot Trigger */}
              <button
                onClick={() => setActiveHotspot(activeHotspot === p.id ? null : p.id)}
                className="relative w-8 h-8 flex items-center justify-center bg-white text-text-primary rounded-full shadow-md focus:outline-none hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <Plus className={`h-4 w-4 transition-transform duration-300 ${activeHotspot === p.id ? 'rotate-45 text-accent' : ''}`} />
                <span className="absolute -inset-2 rounded-full border-2 border-white/40 animate-ping pointer-events-none" />
              </button>

              {/* Shopping Card Popup */}
              <AnimatePresence>
                {activeHotspot === p.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.25, ease: easing.hover }}
                    className="absolute top-10 -left-20 sm:left-10 bg-white p-4 rounded-card border border-border shadow-xl w-[220px] z-30"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-12 h-15 rounded overflow-hidden bg-bg-secondary flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-body text-[11px] font-bold text-text-primary truncate leading-tight">{p.name}</h4>
                        <span className="font-body text-[11.5px] text-accent font-semibold mt-1 block">{formatPrice(p.price)}</span>
                      </div>
                    </div>
                    <div className="border-t border-border/60 my-3" />
                    <div className="flex gap-2">
                      <Link href={`/products/${p.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full text-[8.5px] py-2 uppercase tracking-wider font-semibold">
                          Chi tiết
                        </Button>
                      </Link>
                      <a 
                        href="https://shopee.vn/d.blink" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center bg-accent text-white text-[8.5px] font-bold uppercase tracking-wider py-2 rounded-button transition-all duration-300 hover:bg-[#A83B29] text-center"
                      >
                        Shopee <ArrowUpRight className="ml-0.5 h-2.5 w-2.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Best Sellers Products — CẢI TIẾN BỐ CỤC 6 SẢN PHẨM SO LE PHÁ CÁCH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 border-t border-border mt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">Mùa này được yêu thích</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary">Sản phẩm thịnh hành</h2>
          </div>
          <Link href="/collections/all" className="font-body text-[10px] font-semibold uppercase tracking-widest border-b border-text-primary text-text-primary hover:text-accent hover:border-accent pb-1 transition-all duration-300">
            Xem tất cả sản phẩm
          </Link>
        </div>
        
        {/* Lưới 3 cột bất đối xứng so le cho đủ 6 sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start mt-8">
          {/* Cột 1: Sản phẩm 1 & Sản phẩm 4 */}
          <div className="w-full flex flex-col gap-16">
            {featuredProducts[0] && (
              <div className="space-y-4">
                <span className="font-body text-[9px] font-bold text-accent tracking-widest uppercase bg-accent/5 px-2.5 py-1.5 rounded-button inline-block shadow-sm">
                  Signature Piece
                </span>
                <ProductCard product={featuredProducts[0]} />
              </div>
            )}
            {featuredProducts[3] && (
              <div className="md:-ml-4 md:pr-4"> {/* Lệch nhẹ sang trái */}
                <ProductCard product={featuredProducts[3]} />
              </div>
            )}
          </div>

          {/* Cột 2: Sản phẩm 2 & Sản phẩm 5 (Thụt sâu toàn bộ cột xuống dưới tạo sự so le) */}
          <div className="w-full md:mt-24 flex flex-col gap-16">
            {featuredProducts[1] && (
              <ProductCard product={featuredProducts[1]} />
            )}
            {featuredProducts[4] && (
              <ProductCard product={featuredProducts[4]} />
            )}
          </div>

          {/* Cột 3: Sản phẩm 3 & Sản phẩm 6 (Xếp dọc so le) */}
          <div className="w-full flex flex-col gap-16">
            {featuredProducts[2] && (
              <ProductCard product={featuredProducts[2]} />
            )}
            {featuredProducts[5] && (
              <div className="md:pl-8"> {/* Thụt nhẹ sang phải 32px */}
                <ProductCard product={featuredProducts[5]} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Campaign Split Banner with Curtain Reveal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-bg-secondary rounded-card overflow-hidden border border-border shadow-sm">
          <motion.div 
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.1, ease: easing.reveal }}
            className="relative h-[320px] md:h-auto min-h-[350px] overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easing.reveal }}
              className="w-full h-full relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
                alt="DBlink Leather detail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: duration.base, ease: easing.reveal }}
            className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center"
          >
            <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Chất lượng hoàn mỹ</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 leading-tight">Chế tác từ sự tinh tế và bền bỉ</h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-8">
              Mỗi sản phẩm balo DBlink không đơn thuần là vật dụng chứa đồ, đó là người bạn đồng hành cùng bạn trên mọi nẻo đường. Chúng tôi tuyển chọn nghiêm ngặt nguồn chất liệu da cao cấp và quy trình gia công tỉ mỉ để tạo ra sản phẩm hoàn hảo nhất.
            </p>
            <div>
              <Link href="/about">
                <Button variant="outline" className="text-[10px] px-6">Xem câu chuyện chất liệu</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Store Information Values */}
      <section className="bg-bg-secondary border-y border-border py-12 mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.base, delay: 0.1, ease: easing.reveal }}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <Truck className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-body text-xs font-bold text-text-primary uppercase tracking-wider">Hỗ trợ giao hàng COD</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Được kiểm tra hàng thoải mái trước khi thanh toán</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.base, delay: 0.2, ease: easing.reveal }}
              className="flex flex-col md:flex-row items-center gap-4 border-y md:border-y-0 md:border-x border-border py-6 md:py-0 md:px-8"
            >
              <RefreshCw className="h-6 w-6 text-accent-alt flex-shrink-0" />
              <div>
                <h4 className="font-body text-xs font-bold text-text-primary uppercase tracking-wider">Tư vấn trực tiếp 24/7</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Hỗ trợ đo size, chọn màu qua Zalo & Messenger</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.base, delay: 0.3, ease: easing.reveal }}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-body text-xs font-bold text-text-primary uppercase tracking-wider">Bảo hành uy tín</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Cam kết hỗ trợ sửa chữa bảo hành trong 6 tháng</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
