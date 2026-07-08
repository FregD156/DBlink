'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, ArrowUpRight } from 'lucide-react';
import { easing, duration, stagger } from '@/lib/motion-tokens';

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

// Component Marquee chạy vô tận cực kỳ sang trọng và mượt mà
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

  const collections = [
    {
      name: "Balo Da Cao Cấp",
      description: "Đột phá phong cách với chất liệu da tổng hợp mềm mịn và thiết kế tối giản hiện đại.",
      slug: "balo-da",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      gridClass: "lg:col-span-2 lg:row-span-2 h-[450px] lg:h-[620px]"
    },
    {
      name: "Balo Canvas Trẻ Trung",
      description: "Sự năng động phối hợp giữa canvas dệt mật độ cao và da thật bền bỉ.",
      slug: "balo-canvas",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop",
      gridClass: "lg:col-span-1 h-[298px]"
    },
    {
      name: "Balo Laptop Công Sở",
      description: "Thời thượng, ngăn chứa thông minh bảo vệ tối đa thiết bị của bạn.",
      slug: "balo-laptop",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
      gridClass: "lg:col-span-1 h-[298px]"
    },
    {
      name: "Balo Mini Dạo Phố",
      description: "Kích thước nhỏ gọn, quai đeo thanh mảnh và chất liệu nilon cao cấp siêu nhẹ.",
      slug: "balo-mini",
      image: "https://images.unsplash.com/photo-1575844621280-577745e65c1a?q=80&w=600&auto=format&fit=crop",
      gridClass: "lg:col-span-1 h-[298px]"
    },
    {
      name: "Balo Du Lịch Dã Ngoại",
      description: "Thể tích chứa lớn, đệm vai êm ái cho những chuyến đi dài ngày.",
      slug: "balo-du-lich",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
      gridClass: "lg:col-span-1 h-[298px]"
    },
    {
      name: "BST Giới Hạn",
      description: "Sản phẩm thời trang cao cấp chế tác độc quyền từ nguyên liệu cao cấp.",
      slug: "limited-edition",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
      gridClass: "lg:col-span-1 h-[298px]"
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

      {/* Slogan lớn tràn màn hình (Infinite Marquee) */}
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

      {/* 3. Featured Categories — Expanded Asymmetrical Grid (Signature Element with Curtain Reveals) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-border">
        <div className="text-center mb-16">
          <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Xem theo dòng sản phẩm</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">Bộ sưu tập nổi bật</h2>
          <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {collections.map((col, index) => (
            <motion.div 
              key={col.slug}
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1.0, delay: index * 0.1, ease: easing.reveal }}
              className={`group relative overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/30 shadow-sm ${col.gridClass}`}
            >
              <Link href={`/collections/${col.slug}`} className="w-full h-full block relative">
                <motion.div
                  initial={{ scale: 1.12 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: easing.reveal }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#221C18]/80 via-[#221C18]/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-heading text-2xl font-bold tracking-wide mb-2">{col.name}</h3>
                  <p className="font-body text-xs text-bg-primary/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {col.description}
                  </p>
                  <span className="font-body text-[10px] font-semibold uppercase tracking-widest border-b border-white/60 pb-1 group-hover:text-accent group-hover:border-accent transition-colors duration-300 inline-flex items-center gap-1">
                    Khám phá bộ sưu tập <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Products */}
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Campaign Split Banner with Curtain Reveal */}
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

      {/* 6. Store Information Values */}
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
