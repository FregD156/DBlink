'use client';

import React from 'react';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-3">Câu chuyện thương hiệu</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-6">Chào mừng đến với {SITE_NAME}</h1>
        <div className="h-[2px] w-12 bg-accent mx-auto mb-6" />
        <p className="font-body text-sm sm:text-base text-text-secondary leading-relaxed">
          Được thành lập vào năm 2026, DBlink mang trong mình sứ mệnh tái định nghĩa dòng sản phẩm balo dành riêng cho phái nữ tại Việt Nam: Trẻ trung, năng động nhưng vẫn đảm bảo tinh thần tối giản cao cấp.
        </p>
      </div>

      {/* Split section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/40">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
            alt="DBlink Design Philosophy"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block">Triết lý thiết kế</span>
          <h2 className="font-heading text-3xl font-bold text-text-primary leading-tight">Sự giao thoa giữa Tiện ích & Thời trang</h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            Chúng tôi tin rằng mỗi chiếc balo nữ không chỉ đơn thuần để chứa vật dụng cá nhân, mà còn là một phần tuyên ngôn phong cách cá nhân của bạn.
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            Mỗi thiết kế của DBlink đều trải qua quy trình nghiên cứu kiểu dáng nghiêm ngặt, lựa chọn chất liệu da tổng hợp cao cấp mềm mịn chống xước tốt hay canvas sợi kép bền bỉ để đảm bảo tính ứng dụng tốt nhất trong cuộc sống hằng ngày của các cô nàng thành thị.
          </p>
        </div>
      </div>
    </div>
  );
}
