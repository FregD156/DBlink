'use client';

import React from 'react';
import Image from 'next/image';

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      title: "Xu hướng balo tối giản chiếm lĩnh thời trang công sở 2026",
      date: "02 Tháng 7, 2026",
      excerpt: "Balo da mềm không chỉ tiện dụng mà còn trở thành điểm nhấn thanh lịch cho các nàng công sở hiện đại. Khám phá ngay cách mix đồ cực đỉnh cùng balo DBlink.",
      image: "/images/icons/BLN27.jpg"
    },
    {
      id: 2,
      title: "Cách bảo quản balo da luôn bền đẹp như mới mua tại store",
      date: "25 Tháng 6, 2026",
      excerpt: "Làm sạch balo da đúng cách không hề khó như bạn nghĩ. Những tips cực kỳ đơn giản giúp kéo dài tuổi thọ chiếc balo yêu quý của bạn thêm nhiều năm.",
      image: "/images/icons/BLN21.jpg"
    },
    {
      id: 3,
      title: "Balo Canvas phối da: Sự lựa chọn hoàn hảo cho các buổi dã ngoại hè",
      date: "18 Tháng 6, 2026",
      excerpt: "Năng động, cá tính nhưng không kém phần ngọt ngào. Balo vải canvas dệt cao cấp của DBlink sẽ đồng hành cùng bạn đi đến bất cứ đâu trong mùa hè này.",
      image: "/images/icons/BLN24.jpg"
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-body text-xs font-semibold text-accent tracking-widest uppercase block mb-3">Blog phong cách</span>
        <h1 className="font-heading text-4xl font-bold text-text-primary">Style Journal</h1>
        <div className="h-[2px] w-12 bg-accent mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article key={art.id} className="group flex flex-col cursor-pointer">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-[#F8F6F2] border border-[#EBE6DD]/40">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-body text-[10px] text-text-secondary uppercase tracking-wider">{art.date}</span>
              <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300 mt-2 line-clamp-2 leading-snug">
                {art.title}
              </h3>
              <p className="font-body text-xs text-text-secondary leading-relaxed mt-2 line-clamp-3">
                {art.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
