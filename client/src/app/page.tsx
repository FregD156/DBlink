'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, ArrowUpRight, Plus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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

// Component Marquee chạy vô chậm và mượt mà dạng chữ nghiêng bay bướm uyển chuyển
function InfiniteMarquee() {
  return (
    <div className="bg-bg-primary py-3 overflow-hidden select-none border-y border-border/50 flex w-full relative">
      <motion.div 
        animate={{ x: [0, -900] }}
        transition={{
          ease: "linear",
          duration: 32,
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap gap-10 items-center font-heading text-sm sm:text-base italic text-text-secondary tracking-wider pr-10"
      >
        <span>Tối giản tinh tế</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Khí chất tự tin</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Sang trọng kiêu sa</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span className="text-accent font-semibold not-italic font-heading">D' Blink Style</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        
        <span>Tối giản tinh tế</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Khí chất tự tin</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Sang trọng kiêu sa</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span className="text-accent font-semibold not-italic font-heading">D' Blink Style</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>

        <span>Tối giản tinh tế</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Khí chất tự tin</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span>Sang trọng kiêu sa</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
        <span className="text-accent font-semibold not-italic font-heading">D' Blink Style</span>
        <span className="text-accent-alt text-[10px] animate-pulse">✦</span>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // 1. Dữ liệu Phối đồ ảo (Mix & Match Coordinator)
  const [selectedOutfit, setSelectedOutfit] = useState<'blazer' | 'dress' | 'denim'>('blazer');
  const [selectedBalo, setSelectedBalo] = useState<'balo-da' | 'balo-canvas' | 'balo-laptop' | 'balo-mini'>('balo-da');

  const outfits = {
    blazer: { name: "Blazer Công Sở", desc: "Set suit/blazer tone beige trang nhã, thanh lịch." },
    dress: { name: "Đầm Lụa Dạo Phố", desc: "Nhẹ nhàng, thướt tha cho các buổi trà chiều cuối tuần." },
    denim: { name: "Cá Tính Denim", desc: "Chất liệu bò phủi bụi, năng động và trẻ trung dạo phố." }
  };

  const balos = {
    'balo-da': { name: "Túi Xách Da TL01", slug: "dblink-tl01" },
    'balo-canvas': { name: "Balo Canvas BLN10", slug: "dblink-bln10" },
    'balo-laptop': { name: "Balo Laptop BLN26", slug: "dblink-bln26" },
    'balo-mini': { name: "Balo Mini BLN07", slug: "dblink-bln07" }
  };

  const getMixMatchImage = () => {
    const key = `${selectedOutfit}-${selectedBalo}`;
    const imagesMap: Record<string, string> = {
      'blazer-balo-da': '/images/icons/1.jpg',
      'blazer-balo-laptop': '/images/icons/2.jpg',
      'dress-balo-mini': '/images/icons/3.jpg',
      'denim-balo-canvas': '/images/icons/4.jpg',
    };
    return imagesMap[key] || '/images/icons/5.jpg';
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

  // 2. Dữ liệu Shop the Look (Polaroid Collage & Hotspots)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [hoveredPolaroid, setHoveredPolaroid] = useState<number | null>(null);
  const polaroids = [
    {
      id: 1,
      title: "I. Office Elegance",
      image: "/images/icons/6.jpg",
      layoutClass: "absolute left-[4%] top-[10%] w-[210px] sm:w-[270px] aspect-[3/4]",
      defaultRotate: -4,
      product: {
        id: 1,
        name: "Túi Xách Công Sở D' Blink TL01",
        price: 570000,
        slug: "dblink-tl01",
        coords: { top: "45%", left: "55%" },
        image: "/images/icons/6.jpg"
      }
    },
    {
      id: 2,
      title: "II. Smart Innovation",
      image: "/images/icons/7.jpg",
      layoutClass: "absolute left-[28%] top-[5%] w-[200px] sm:w-[260px] aspect-[3/4]",
      defaultRotate: 3,
      product: {
        id: 3,
        name: "Balo Laptop Chống Nước Smart BLN26",
        price: 790000,
        slug: "dblink-bln26",
        coords: { top: "48%", left: "50%" },
        image: "/images/icons/7.jpg"
      }
    },
    {
      id: 3,
      title: "III. Street Casual",
      image: "/images/icons/8.jpg",
      layoutClass: "absolute right-[28%] top-[12%] w-[200px] sm:w-[265px] aspect-[3/4]",
      defaultRotate: -2,
      product: {
        id: 4,
        name: "Balo Mini Longchamp Vibes BLN07",
        price: 690000,
        slug: "dblink-bln07",
        coords: { top: "52%", left: "48%" },
        image: "/images/icons/8.jpg"
      }
    },
    {
      id: 4,
      title: "IV. Weekend Wanderlust",
      image: "/images/icons/9.jpg",
      layoutClass: "absolute right-[4%] top-[6%] w-[210px] sm:w-[270px] aspect-[3/4]",
      defaultRotate: 5,
      product: {
        id: 2,
        name: "Balo Canvas Phối Da Classic BLN10",
        price: 680000,
        slug: "dblink-bln10",
        coords: { top: "45%", left: "42%" },
        image: "/images/icons/9.jpg"
      }
    }
  ];



  return (
    <div className="flex flex-col w-full pb-16 overflow-hidden">
      {/* 1. Hero Section — Minimalist Typographic Brand Showcase (Trình diễn thương hiệu chữ tối giản) */}
      <section className="relative w-full h-[90vh] bg-bg-primary flex flex-col items-center justify-center overflow-hidden">
        
        {/* Lớp chữ chìm khổng lồ phía sau (Z-index 0) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 0.85, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: easing.premium }}
            className="font-heading text-[18vw] font-black uppercase tracking-[0.12em] text-outline-thin text-center leading-none"
          >
            D' BLINK
          </motion.h1>
        </div>

        {/* Lớp chữ nổi (Hình ảnh logo thương hiệu đầy đủ) và thông tin đè phía trước (Z-index 10) */}
        <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1.5, ease: easing.reveal }}
            className="relative w-[280px] sm:w-[420px] md:w-[540px] lg:w-[620px] h-[80px] sm:h-[120px] md:h-[150px] lg:h-[175px] select-none mb-4"
          >
            <Image
              src="/logo-full.png"
              alt="D' Blink Brand Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.6, duration: duration.base }}
            className="mt-6 font-body text-xs sm:text-sm text-text-primary tracking-widest leading-relaxed max-w-md select-all font-medium uppercase"
          >
            Balo nữ tối giản sang trọng — Tinh tế trong từng đường kim mũi chỉ.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: duration.base, ease: easing.reveal }}
            className="flex flex-wrap gap-4 mt-10 justify-center"
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
              className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 border border-text-primary text-text-primary hover:bg-text-primary hover:text-white rounded-button font-body text-[10px] font-semibold uppercase tracking-widest transition-all duration-300"
            >
              Ghé Shopee Store <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Tag nhỏ góc trên bên phải làm điểm nhấn lookbook */}
        <div className="absolute top-8 right-8 z-30 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: duration.base }}
            className="flex flex-col items-end border-l border-border pl-4"
          >
            <span className="font-body text-[9px] font-bold tracking-widest text-text-secondary uppercase">Lookbook 2026</span>
            <span className="font-body text-[10px] font-medium tracking-[0.2em] text-accent uppercase mt-1">Thu Đông Edition</span>
          </motion.div>
        </div>
      </section>

      {/* Slogan lớn chạy ngang màn hình (Infinite Marquee) */}
      <InfiniteMarquee />

      {/* 2. Brand Story Summary Section — Overlapping Collage (Cắt ghép chồng lớp nghệ thuật) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
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
              D' Blink không sản xuất balo đại trà. Chúng tôi chế tác ra những người bạn đồng hành. Định vị phân khúc thời trang cao cấp giá hợp lý, D' Blink tôn vinh vẻ đẹp của sự giản đơn, tinh gọn nhưng đầy khí chất của người phụ nữ thế hệ mới.
            </p>
            <div>
              <Link href="/about">
                <Button variant="outline" className="text-[10px] px-6">Đọc câu chuyện thương hiệu</Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:col-span-7 relative w-full h-[450px] sm:h-[550px] lg:h-[600px] mt-8 lg:mt-0 flex items-center justify-center">
            {/* Ảnh nền lớn bên trái (Z-index 0) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: easing.reveal }}
              className="absolute left-2 bottom-2 w-[65%] h-[80%] overflow-hidden rounded-card border border-border/40 shadow-lg bg-bg-secondary"
            >
              <motion.div 
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: easing.premium }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/icons/10.jpg"
                  alt="D' Blink Lifestyle"
                  fill
                  sizes="(max-width: 768px) 60vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Ảnh nổi nhỏ đè chéo bên phải (Z-index 10) */}
            <motion.div 
              initial={{ opacity: 0, y: 40, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: easing.reveal }}
              className="absolute right-2 top-2 w-[55%] h-[55%] overflow-hidden rounded-card border border-border/60 shadow-2xl z-10 bg-bg-secondary"
            >
              <motion.div 
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: easing.premium }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/icons/11.jpg"
                  alt="D' Blink Detail Craft"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Chữ ký mỏng đè lên ảnh nền (Z-index 20) */}
            <motion.span 
              initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
              whileInView={{ opacity: 0.85, rotate: -3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-[10%] right-[32%] z-20 font-heading text-2xl sm:text-3xl italic text-accent select-none pointer-events-none drop-shadow-sm"
            >
              Craftsmanship
            </motion.span>
          </div>
        </div>
      </section>

      {/* 3. Phối Đồ Tương Tác (Mix & Match Coordinator) */}
      <section className="bg-bg-primary border-y border-border py-10">
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
      <section className="w-full py-6 border-t border-border bg-bg-primary flex items-center justify-center">
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

      {/* 5. Mua sắm theo ảnh thời trang (Shop The Look) — Editorial Polaroid Collage (Ảnh Polaroid chồng chéo tương tác) */}
      <section className="w-full py-10 border-t border-border bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Thời trang dạo phố</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Shop The Look</h2>
          <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
        </div>

        {/* Khung chứa Polaroid Collage lơ lửng — Giãn rộng ngang hết 2 bên màn hình (Căn chỉnh khoảng trống vừa vặn 4 tấm) */}
        <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[650px] bg-[#FAF8F5] border-y border-border/50 overflow-hidden">
          {polaroids.map((p) => {
            const isHovered = hoveredPolaroid === p.id;
            return (
              <motion.div
                key={p.id}
                className={p.layoutClass}
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{ 
                  rotate: isHovered ? 0 : p.defaultRotate,
                  scale: isHovered ? 1.05 : 1,
                  zIndex: isHovered ? 30 : (p.id === 2 ? 20 : 10),
                  boxShadow: isHovered 
                    ? "0 25px 50px -12px rgba(29, 11, 17, 0.12)" 
                    : "0 6px 16px -4px rgba(29, 11, 17, 0.04)"
                }}
                transition={{ duration: 0.45, ease: easing.reveal }}
                onMouseEnter={() => setHoveredPolaroid(p.id)}
                onMouseLeave={() => {
                  setHoveredPolaroid(null);
                  setActiveHotspot(null);
                }}
              >
                {/* Khung ảnh Polaroid truyền thống */}
                <div className="w-full h-full bg-white p-3 pb-8 sm:p-4 sm:pb-10 border border-border/60 rounded shadow-sm flex flex-col justify-between select-none">
                  <div className="relative flex-1 w-full overflow-hidden bg-bg-secondary rounded-sm">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover brightness-95"
                    />
                    <div className="absolute inset-0 bg-[#1D0B11]/5" />

                    {/* Interactive Hotspot */}
                    <div
                      className="absolute z-20"
                      style={{ top: p.product.coords.top, left: p.product.coords.left }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(activeHotspot === p.product.id ? null : p.product.id);
                        }}
                        className="relative w-7 h-7 flex items-center justify-center bg-white text-text-primary rounded-full shadow-md focus:outline-none hover:scale-110 active:scale-95 transition-transform duration-200"
                      >
                        <Plus className={`h-3.5 w-3.5 transition-transform duration-300 ${activeHotspot === p.product.id ? 'rotate-45 text-accent' : ''}`} />
                        <span className="absolute -inset-1.5 rounded-full border border-white/50 animate-ping pointer-events-none" />
                      </button>

                      {/* Shopping Card Popup */}
                      <AnimatePresence>
                        {activeHotspot === p.product.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.25, ease: easing.hover }}
                            className="absolute top-9 -left-20 sm:left-9 bg-white p-4 rounded-card border border-border shadow-xl w-[210px] z-30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex gap-3 text-left">
                              <div className="relative w-11 h-14 rounded overflow-hidden bg-bg-secondary flex-shrink-0">
                                <Image src={p.product.image} alt={p.product.name} fill className="object-cover" />
                              </div>
                              <div className="flex flex-col justify-center min-w-0">
                                <h4 className="font-heading text-[10.5px] font-medium text-text-primary truncate leading-tight">{p.product.name}</h4>
                                <span className="font-heading text-[11px] text-accent font-semibold mt-1 block">{formatPrice(p.product.price)}</span>
                              </div>
                            </div>
                            <div className="border-t border-border/60 my-2.5" />
                            <div className="flex gap-2">
                              <Link href={`/products/${p.product.slug}`} className="flex-1">
                                <Button variant="outline" className="w-full text-[8.5px] py-1.5 uppercase tracking-wider font-semibold">
                                  Chi tiết
                                </Button>
                              </Link>
                              <a 
                                href="https://shopee.vn/d.blink" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center bg-accent text-white text-[8.5px] font-bold uppercase tracking-wider py-1.5 rounded-button transition-all duration-300 hover:bg-[#7D1137] text-center"
                              >
                                Shopee <ArrowUpRight className="ml-0.5 h-2.5 w-2.5" />
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Chú thích viết tay */}
                  <span className="font-heading italic text-[11px] sm:text-xs text-text-secondary mt-2 sm:mt-3 text-center tracking-wide block">
                    {p.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. Best Sellers Products — CẢI TIẾN BỐ CỤC 6 SẢN PHẨM SO LE PHÁ CÁCH (Khôi phục container căn giữa như cũ) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-border bg-bg-primary">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-1">Mùa này được yêu thích</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary">Sản phẩm thịnh hành</h2>
          </div>
          <Link href="/collections/all" className="font-body text-[10px] font-semibold uppercase tracking-widest border-b border-text-primary text-text-primary hover:text-accent hover:border-accent pb-1 transition-all duration-300">
            Xem tất cả sản phẩm
          </Link>
        </div>
        
        {/* Bố cục cuộn ngang (Horizontal Scroll Slider) mượt mà cho toàn bộ sản phẩm thịnh hành */}
        <div className="relative mt-8 group">
          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleScroll('left');
            }}
            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-text-primary border border-border w-11 h-11 rounded-full shadow-md z-30 transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleScroll('right');
            }}
            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-text-primary border border-border w-11 h-11 rounded-full shadow-md z-30 transition-all duration-300 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: duration.base, delay: idx * 0.05, ease: easing.reveal }}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start"
              >
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Campaign Split Banner — Widescreen Full-Width (Rộng ngang tràn lề hoàn toàn) */}
      <section className="w-full border-t border-border bg-bg-secondary flex flex-col md:flex-row items-stretch min-h-[450px] sm:min-h-[500px] overflow-hidden">
        <motion.div 
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 1.1, ease: easing.reveal }}
          className="relative h-[320px] md:h-auto md:w-1/2 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easing.reveal }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/icons/12.jpg"
              alt="D' Blink Leather detail"
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
          className="md:w-1/2 p-8 sm:p-16 lg:p-20 flex flex-col justify-center bg-bg-secondary"
        >
          <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Chất lượng hoàn mỹ</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 leading-tight">Chế tác từ sự tinh tế và bền bỉ</h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-8">
            Mỗi sản phẩm balo D' Blink không đơn thuần là vật dụng chứa đồ, đó là người bạn đồng hành cùng bạn trên mọi nẻo đường. Chúng tôi tuyển chọn nghiêm ngặt nguồn chất liệu da cao cấp và quy trình gia công tỉ mỉ để tạo ra sản phẩm hoàn hảo nhất.
          </p>
          <div>
            <Link href="/about">
              <Button variant="outline" className="text-[10px] px-6">Xem câu chuyện chất liệu</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 8. Store Information Values */}
      <section className="bg-bg-secondary border-y border-border py-10">
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
