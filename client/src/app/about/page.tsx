'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE_NAME } from '@/lib/constants';
import { easing, duration } from '@/lib/motion-tokens';
import { Sparkles, Compass, Shield, Award } from 'lucide-react';

const timelineSteps = [
  {
    step: "Công đoạn 01",
    title: "Phác Thảo & Nghiên Cứu Kiểu Dáng",
    description: "Khởi đầu từ những nét vẽ tối giản tại studio thiết kế. DBlink tập trung nghiên cứu thói quen sử dụng của các cô gái Việt Nam để tối ưu hóa ngăn chứa đồ (iPad, son môi, sổ tay) mà vẫn giữ được phom dáng nhỏ gọn, thanh lịch đứng dáng.",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop"
  },
  {
    step: "Công đoạn 02",
    title: "Tuyển Chọn Nguyên Liệu Nghiêm Ngặt",
    description: "Chúng tôi loại bỏ các loại chất liệu rẻ tiền dễ bong tróc. Chỉ những tấm da tổng hợp cao cấp mềm mịn như da thật, có khả năng chống xước nhẹ hoặc vải canvas dệt kép 12oz mật độ cao mới được lựa chọn để chế tác.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop"
  },
  {
    step: "Công đoạn 03",
    title: "Chế Tác Thủ Công Tỉ Mỉ",
    description: "Mỗi chiếc balo là sản phẩm của bàn tay nghệ nhân may lành nghề. Từng đường chỉ đều đặn, cúc bấm mạ vàng sáng bóng và khóa kéo trượt êm ái đều phải vượt qua 3 vòng kiểm duyệt chất lượng gắt gao trước khi xuất xưởng.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop"
  },
  {
    step: "Công đoạn 04",
    title: "Đóng Gói Chỉn Chu & Thân Thiện",
    description: "Chúng tôi tin rằng trải nghiệm mở hộp là phần không thể thiếu của một thương hiệu cao cấp. Sản phẩm được bọc cẩn thận trong túi vải chống bụi, đặt trong hộp giấy Kraft cứng cáp tái chế và thiệp cảm ơn viết tay trân trọng gửi tới bạn.",
    image: "https://images.unsplash.com/photo-1575844621280-577745e65c1a?q=80&w=600&auto=format&fit=crop"
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center animate-pulse">
        <div className="h-8 bg-bg-secondary w-48 mx-auto rounded-button mb-4" />
        <div className="h-4 bg-bg-secondary w-96 mx-auto rounded-button" />
      </div>
    );
  }

  return (
    <div className="w-full pb-20 animate-fade-in">
      {/* Hero Header */}
      <section className="relative w-full py-24 bg-bg-secondary border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.base, ease: easing.reveal }}
            className="font-body text-[10px] font-bold text-accent tracking-[0.2em] uppercase block mb-3"
          >
            Câu chuyện thương hiệu
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: duration.base, ease: easing.reveal }}
            className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-6"
          >
            Chào mừng đến với {SITE_NAME}
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: duration.base, ease: easing.reveal }}
            className="h-[1px] w-16 bg-accent mx-auto mb-6 origin-center"
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: duration.base, ease: easing.reveal }}
            className="font-body text-sm sm:text-base text-text-secondary leading-relaxed"
          >
            Được thành lập vào năm 2026, DBlink mang trong mình sứ mệnh thiết kế những chiếc balo nữ mang phom dáng tối giản hiện đại, trẻ trung nhưng vẫn toát lên tinh thần cao cấp tinh tế hàng đầu.
          </motion.p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, delay: 0.1, ease: easing.reveal }}
            className="p-6 border border-border rounded-card bg-white shadow-sm flex flex-col items-center text-center space-y-4"
          >
            <Compass className="h-6 w-6 text-accent" />
            <h3 className="font-heading text-lg font-bold text-text-primary">Định Hướng Thẩm Mỹ</h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">Tôn sùng triết lý tối giản của thời trang đương đại, lược bỏ chi tiết rườm rà.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, delay: 0.2, ease: easing.reveal }}
            className="p-6 border border-border rounded-card bg-white shadow-sm flex flex-col items-center text-center space-y-4"
          >
            <Sparkles className="h-6 w-6 text-accent-alt" />
            <h3 className="font-heading text-lg font-bold text-text-primary">Sáng Tạo Trẻ Trung</h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">Luôn cập nhật bảng màu pastel thời thượng và phom dáng thời trang mới nhất.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, delay: 0.3, ease: easing.reveal }}
            className="p-6 border border-border rounded-card bg-white shadow-sm flex flex-col items-center text-center space-y-4"
          >
            <Shield className="h-6 w-6 text-accent" />
            <h3 className="font-heading text-lg font-bold text-text-primary">Chất Lượng Thật</h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">Cam kết chế tác từ nguồn da và phụ liệu cao cấp bền bỉ vượt thời gian.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: duration.base, delay: 0.4, ease: easing.reveal }}
            className="p-6 border border-border rounded-card bg-white shadow-sm flex flex-col items-center text-center space-y-4"
          >
            <Award className="h-6 w-6 text-accent-alt" />
            <h3 className="font-heading text-lg font-bold text-text-primary">Tâm Huyết Trọn Vẹn</h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">Chăm chút tỉ mỉ cho trải nghiệm mở hộp và chế độ bảo hành chu đáo hậu mãi.</p>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Timeline Section — CẢI TIẾN BƯỚC 3 */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-border">
        <div className="text-center mb-20">
          <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block mb-2">Quy trình chế tác</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Hành Trình Tạo Nên DBlink</h2>
          <div className="h-[1px] w-12 bg-accent mx-auto mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Vertical central line (Desktop) / Left line (Mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2 z-0" />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={step.step}
                  className={`flex flex-col md:flex-row relative z-10 w-full ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline central dot */}
                  <div className="absolute left-4 md:left-1/2 top-10 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg-primary bg-accent z-20 shadow-sm" />

                  {/* Left Column: Image with Curtain Reveal */}
                  <div className="w-full md:w-1/2 px-8 pl-12 md:pl-8 flex justify-center items-center">
                    <motion.div
                      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.1, ease: easing.reveal }}
                      className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-card bg-bg-secondary border border-[#EBE6DD]/30 shadow-sm"
                    >
                      <motion.div
                        initial={{ scale: 1.15 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: easing.reveal }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right Column: Text Content */}
                  <div className="w-full md:w-1/2 px-8 pl-12 md:pl-8 flex flex-col justify-center space-y-4 mt-6 md:mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: duration.base, ease: easing.reveal }}
                      className="max-w-md space-y-3"
                    >
                      <span className="font-body text-[10px] font-bold text-accent tracking-widest uppercase block">
                        {step.step}
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                        {step.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Campaign Quote */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center border-t border-border mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easing.reveal }}
          className="bg-text-primary text-bg-primary p-12 rounded-card shadow-sm space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-alt/10 via-transparent to-accent/15 pointer-events-none" />
          <h2 className="font-heading text-2xl sm:text-3xl italic font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            &ldquo;Vẻ đẹp thực sự của sự tối giản nằm ở chỗ, nó không cần cố gắng thu hút sự chú ý nhưng vẫn khiến mọi ánh nhìn phải dừng lại.&rdquo;
          </h2>
          <p className="font-body text-[10px] tracking-widest uppercase font-bold text-accent">
            — Triết lý thiết kế DBlink
          </p>
        </motion.div>
      </section>
    </div>
  );
}
