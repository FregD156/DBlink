'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Watermark() {
  // Lắng nghe tiến trình cuộn trang từ 0 (đầu trang) đến 1 (cuối trang)
  const { scrollYProgress } = useScroll();
  
  // Trượt Parallax cực kỳ chậm: khi cuộn cả trang dài, logo chìm chỉ dịch chuyển nhẹ -60px
  // Điều này mang lại chiều sâu không gian (3D depth) tinh tế dưới nền giấy
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-[0.015] md:opacity-[0.02]">
      <motion.div 
        style={{ y }}
        className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px]"
      >
        <Image
          src="/logo-icon.png"
          alt="DBlink Logo Watermark"
          fill
          priority
          className="object-contain grayscale"
        />
      </motion.div>
    </div>
  );
}
