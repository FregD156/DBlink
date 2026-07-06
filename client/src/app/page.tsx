'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  const categories = [
    {
      name: "Balo Da Cao Cấp",
      slug: "balo-da",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Balo Canvas Trẻ Trung",
      slug: "balo-canvas",
      image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop"
    },
    {
      name: "Balo Laptop Công Sở",
      slug: "balo-laptop",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[80vh] bg-bg-secondary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop"
            alt="DBlink Hero Campaign"
            fill
            priority
            className="object-cover object-center brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent md:from-black/50" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-white animate-slide-up">
            <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/80 block mb-3">
              Bộ sưu tập mới nhất 2026
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Định hình cá tính, làm chủ hành trình
            </h1>
            <p className="font-body text-sm sm:text-base text-white/90 mb-8 leading-relaxed max-w-md">
              Balo thời trang nữ DBlink: Phong cách tối giản sang trọng của tương lai, hoàn thiện tinh xảo trong từng chi tiết.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/collections/all">
                <Button variant="primary" className="bg-accent border-accent text-white hover:bg-[#B36852] text-xs">
                  Khám phá ngay
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-text-primary text-xs">
                  Câu chuyện của chúng tôi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Values Bar */}
      <section className="bg-bg-secondary border-y border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Truck className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Miễn phí giao hàng</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Cho mọi đơn hàng từ 500k trên toàn quốc</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 border-y md:border-y-0 md:border-x border-border py-4 md:py-0 md:px-8">
              <RefreshCw className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Đổi trả 7 ngày</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Dễ dàng, bảo vệ tối đa lợi ích khách hàng</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="font-body text-sm font-semibold text-text-primary uppercase tracking-wider">Cam kết chất lượng</h4>
                <p className="font-body text-xs text-text-secondary mt-1">Bảo hành 12 tháng mọi lỗi từ nhà sản xuất</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Danh mục nổi bật</h2>
          <div className="h-[2px] w-12 bg-accent mx-auto mt-3" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/collections/${cat.slug}`}
              className="group relative h-[380px] w-full overflow-hidden rounded-card bg-[#F8F6F2] shadow-sm border border-[#EBE6DD]/40"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-heading text-xl font-medium tracking-wide mb-2">{cat.name}</h3>
                <span className="font-body text-[11px] uppercase tracking-wider border-b border-white/60 pb-1 group-hover:text-accent group-hover:border-accent transition-colors duration-300 inline-flex items-center gap-1">
                  Xem ngay <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Best Sellers Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-1">Mùa này được yêu thích</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary">Sản phẩm bán chạy</h2>
          </div>
          <Link href="/collections/all" className="font-body text-xs uppercase tracking-wider border-b border-text-primary text-text-primary hover:text-accent hover:border-accent pb-1 transition-all duration-300">
            Xem tất cả
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Campaign Split Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-bg-secondary rounded-card overflow-hidden border border-border shadow-sm">
          <div className="relative h-[320px] md:h-auto min-h-[350px]">
            <Image
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
              alt="DBlink Leather detail"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-2">Chất lượng hoàn mỹ</span>
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-4 leading-tight">Chế tác từ sự tinh tế và bền bỉ</h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-8">
              Mỗi sản phẩm balo DBlink không đơn thuần là vật dụng chứa đồ, đó là người bạn đồng hành cùng bạn trên mọi nẻo đường. Chúng tôi tuyển chọn nghiêm ngặt nguồn chất liệu da cao cấp và quy trình gia công tỉ mỉ để tạo ra sản phẩm hoàn hảo nhất.
            </p>
            <div>
              <Link href="/about">
                <Button variant="outline" className="text-xs">Xem câu chuyện chất liệu</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="text-center mb-12">
          <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-1">Khách hàng nói gì</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Được tin dùng bởi các cô nàng hiện đại</h2>
          <div className="h-[2px] w-12 bg-accent mx-auto mt-3" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-bg-primary border border-border rounded-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="font-body text-sm text-text-secondary leading-relaxed italic mb-6">
              "Mình tìm kiếm một mẫu balo có thể vừa mang laptop đi làm vừa đủ thời trang để đi hẹn hò buổi tối. Balo của DBlink đáp ứng hoàn hảo, chất da tổng hợp siêu bền mịn mà giá lại quá hời."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center font-body text-sm font-bold text-accent">TM</div>
              <div>
                <h5 className="font-body text-sm font-semibold text-text-primary">Thảo My</h5>
                <span className="font-body text-xs text-text-secondary">Nhân viên ngân hàng, Hà Nội</span>
              </div>
            </div>
          </div>
          <div className="bg-bg-primary border border-border rounded-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="font-body text-sm text-text-secondary leading-relaxed italic mb-6">
              "Mẫu balo canvas phối da của shop cực trẻ trung và năng động. Mình mang đi học và đi du lịch mà ai cũng khen. Quai đeo rất êm, đeo lâu không bị đau vai."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center font-body text-sm font-bold text-accent">HA</div>
              <div>
                <h5 className="font-body text-sm font-semibold text-text-primary">Hương Anh</h5>
                <span className="font-body text-xs text-text-secondary">Sinh viên Đại học Ngoại Thương</span>
              </div>
            </div>
          </div>
          <div className="bg-bg-primary border border-border rounded-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="font-body text-sm text-text-secondary leading-relaxed italic mb-6">
              "Hộp đóng gói sang xịn mịn dã man, dùng làm quà tặng là hết sảy. Balo mini quai thanh mảnh rất xinh, đường may chuẩn chỉ không một sợi chỉ thừa. Sẽ ủng hộ tiếp!"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center font-body text-sm font-bold text-accent">QH</div>
              <div>
                <h5 className="font-body text-sm font-semibold text-text-primary">Quỳnh Hoa</h5>
                <span className="font-body text-xs text-text-secondary">Freelancer Content Creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
