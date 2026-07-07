# AGENTS.md — Website Shop Balo Nữ (Showcase & Thương hiệu)

Tài liệu này định hướng cho bất kỳ AI coding agent (Claude Code, Cursor, v.v.) hoặc lập trình viên nào tham gia xây dựng website. Mọi quyết định thiết kế/code phải bám sát tài liệu này.

---

## 1. TỔNG QUAN DỰ ÁN

- **Loại hình**: Website **showcase thương hiệu** (brand/lookbook site) — KHÔNG phải e-commerce đầy đủ.
- **Lý do**: Store đã có kênh bán hàng sẵn (Shopee và các kênh khác). Website mới có 2 nhiệm vụ duy nhất:
  1. **Trưng bày sản phẩm mới/thịnh hành** một cách đẹp, chuyên nghiệp, gây ấn tượng thị giác mạnh.
  2. **Truyền tải thông tin thương hiệu** (câu chuyện, giá trị, độ tin cậy) để khách tin tưởng trước khi qua kênh bán mua hàng.
- **KHÔNG cần**: giỏ hàng, checkout, thanh toán online, quản lý đơn hàng trên web. Nút hành động chính là **"Mua ngay tại [Kênh bán]"** dẫn khách ra Shopee/Facebook/Zalo/TikTok Shop hiện có.
- **Phân khúc giá**: 500.000đ – 1.500.000đ.
- **Định vị phong cách**: "Trẻ trung nhưng cao cấp" — tham khảo tinh thần Charles & Keith, Kate Spade, Longchamp.
- **Khách hàng mục tiêu**: Nữ 16–30 tuổi, quan tâm thời trang, chủ yếu duyệt web trên điện thoại.
- **Ưu tiên số 1 của dự án này**: **CHẤT LƯỢNG GIAO DIỆN** — website phải trông như sản phẩm của một studio thiết kế chuyên nghiệp, có điểm nhấn riêng, không giống template có sẵn.

---

## 2. NGUYÊN TẮC THIẾT KẾ ĐỂ "NỔI BẬT & CHUYÊN NGHIỆP"

Đây là phần quan trọng nhất tài liệu này — vì mục tiêu chính của web là gây ấn tượng thị giác, không phải tính năng.

### 2.1. Tránh 3 "khuôn mẫu AI" phổ biến
Rất nhiều web do AI dựng đều rơi vào 1 trong 3 khuôn mẫu sau — **cần chủ động tránh**:
1. Nền be/cream ấm + serif tương phản cao + accent màu cam đất (terracotta) — quá phổ biến, không còn là điểm nhấn.
2. Nền đen gần tuyệt đối + 1 màu neon/acid duy nhất.
3. Layout kiểu "báo giấy" — đường kẻ mảnh, bo góc = 0, cột dày đặc kiểu newspaper.
Cả 3 đều hợp lệ NẾU brief yêu cầu đúng hướng đó, nhưng ở đây brief đã có định hướng riêng ("trẻ trung nhưng cao cấp") — nên phối màu/type cần bám sát định hướng đó, không mặc định rơi vào 1 trong 3 khuôn trên.

### 2.2. Hero là luận điểm (thesis), không phải banner trang trí
Phần đầu trang chủ phải thể hiện NGAY điều đặc trưng nhất của thương hiệu — có thể là 1 câu slogan lớn kèm ảnh sản phẩm hero chất lượng cao, một đoạn chuyển động sản phẩm xoay 360°, hoặc ảnh lifestyle mạnh. Tránh công thức "số liệu lớn + label nhỏ + gradient" — chỉ dùng nếu thực sự phù hợp.

### 2.3. Typography phải có cá tính
- Chọn 1 font display (tiêu đề) có "chất riêng" — không chọn font "an toàn" mặc định. Có thể thử các hướng: serif hiện đại có nét vát cá tính, hoặc sans-serif đậm với letter-spacing đặc trưng.
- 1 font body dễ đọc, hỗ trợ đầy đủ tiếng Việt có dấu.
- Type scale rõ ràng, có ít nhất 1 khoảnh khắc typography "lớn, tự tin" (vd: tên bộ sưu tập chiếm nguyên màn hình).

### 2.4. Chuyển động có chủ đích
- Ưu tiên 1 "khoảnh khắc" chuyển động được dàn dựng kỹ (page-load sequence, scroll-reveal cho từng sản phẩm) hơn là rải rác nhiều hiệu ứng nhỏ.
- Hover sản phẩm: chuyển ảnh, zoom nhẹ, hoặc hiện nhanh nút "Mua ngay tại [Kênh]".
- Tuyệt đối tránh lạm dụng animation — càng nhiều hiệu ứng ngẫu nhiên càng khiến web trông "AI-generated".

### 2.5. Cấu trúc = thông tin
Nếu dùng số thứ tự, nhãn (label), đường phân chia — phải mang ý nghĩa thật (vd: số thứ tự bộ sưu tập theo mùa), không dùng "01/02/03" chỉ vì trông đẹp.

### 2.6. Một điểm nhấn (signature), phần còn lại tiết chế
Chọn **1 chi tiết độc đáo duy nhất** làm dấu ấn cho web (vd: cách trình bày gallery sản phẩm dạng cuộn ngang đặc biệt, hiệu ứng "thử phối đồ" tương tác, hoặc cách kể chuyện thương hiệu bằng timeline hình ảnh). Giữ mọi thứ xung quanh tiết chế, kỷ luật để điểm nhấn đó nổi bật.

### 2.7. Quy trình bắt buộc trước khi code giao diện
1. **Brainstorm** bảng token thiết kế: 4-6 màu (mã hex cụ thể), 2+ font (display/body), 1 layout concept (mô tả + wireframe ASCII), 1 signature element.
2. **Tự phản biện**: so bảng token với 3 khuôn mẫu ở mục 2.1 — nếu giống, sửa lại và ghi rõ đã đổi gì.
3. Chỉ sau khi plan được duyệt mới viết code, bám đúng plan.

---

## 3. BẢNG MÀU & FONT ĐỀ XUẤT (điểm khởi đầu — có thể tinh chỉnh ở bước brainstorm)

```
--color-bg-primary: #FAF8F5;      /* nền chính - trắng ngà ấm, KHÔNG lặp lại tông #F4F1EA quá phổ biến */
--color-bg-secondary: #EFE6DC;
--color-text-primary: #221C18;
--color-text-secondary: #6B625B;
--color-accent: #C24E3A;          /* đỏ gạch/rust — có sức nặng hơn cam đất thường thấy */
--color-accent-alt: #3F4B3B;      /* xanh rêu đậm — tương phản có chủ đích với accent chính */
--color-border: #E3DDD3;
```

```
--font-heading: 'Fraunces', 'Canela', serif;   /* serif có cá tính, tránh Playfair Display quá phổ biến */
--font-body: 'Be Vietnam Pro', sans-serif;      /* đầy đủ dấu tiếng Việt */
```

> Đây là điểm khởi đầu để brainstorm, KHÔNG phải bảng cuối cùng — khi dựng mockup thật, chạy lại quy trình mục 2.7 để tinh chỉnh cho khớp brief.

### Spacing & bo góc
- Spacing theo bội số 8px.
- Bo góc: 4px (input/button nhỏ) hoặc 0 (nếu chọn hướng biên tập/editorial) — quyết định ở bước brainstorm, giữ nhất quán toàn site.
- Container tối đa 1280px.

---

## 4. SITEMAP (đã rút gọn — bỏ cart/checkout)

```
/                       — Trang chủ: hero, sản phẩm mới/thịnh hành, câu chuyện thương hiệu (rút gọn), CTA "Khám phá bộ sưu tập"
/collections            — Trang trưng bày toàn bộ sản phẩm theo bộ sưu tập/danh mục
/collections/[slug]     — Chi tiết 1 bộ sưu tập/danh mục
/products/[slug]        — Trang chi tiết 1 sản phẩm: ảnh lớn, mô tả, chất liệu, nút "Mua ngay tại [Kênh bán]"
/about                  — Về chúng tôi: câu chuyện, giá trị thương hiệu, hình ảnh xưởng/quá trình (nếu có)
/lookbook (tuỳ chọn)    — Bộ ảnh phong cách/editorial, kể chuyện thương hiệu bằng hình ảnh
/contact                — Thông tin liên hệ + link tất cả kênh bán hàng (Shopee, Facebook, Zalo, TikTok Shop...)
```

### Nút "Mua ngay tại [Kênh]"
- Xuất hiện trên: card sản phẩm (hover), trang chi tiết sản phẩm (nổi bật, above the fold), trang liên hệ (danh sách đầy đủ các kênh).
- Mỗi sản phẩm nên lưu kèm 1 link kênh bán cụ thể (vd: link Shopee của đúng sản phẩm đó) — không chỉ link chung chung về trang shop.

---

## 5. TECH STACK ĐỀ XUẤT (đã đơn giản hoá — không cần backend đơn hàng)

- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS.
- **Database**: **Supabase (Postgres)** — CHỈ dùng để lưu dữ liệu sản phẩm/bộ sưu tập (đọc là chính), không cần bảng `orders`/`order_items` nữa.
  - Ảnh sản phẩm: Supabase Storage.
  - Không cần Supabase Auth (không có tài khoản khách hàng khi không bán trực tiếp trên web) — có thể bỏ qua hoàn toàn nếu chỉ dùng cho trang quản trị nội bộ (xem mục 5.1).
- **Backend riêng (`server/`)**: **không còn bắt buộc**. Vì chỉ đọc dữ liệu sản phẩm để hiển thị, Next.js có thể gọi Supabase trực tiếp (Server Components) mà không cần Express ở giữa. Chỉ giữ `server/` nếu sau này muốn thêm trang quản trị nội bộ để tự thêm/sửa sản phẩm.
- **Animation**: Framer Motion (scroll-reveal, page transition) hoặc GSAP nếu cần chuyển động phức tạp hơn cho signature element.
- **Hình ảnh**: `next/image`, WebP, ảnh chất lượng cao là ưu tiên hàng đầu (đây là web showcase — ảnh xấu là thất bại toàn bộ dự án).
- **Hosting**: Vercel (toàn bộ site, kể cả gọi Supabase trực tiếp từ Server Components).

### 5.1. Trang quản trị nội bộ (tuỳ chọn, làm sau)
Nếu muốn tự cập nhật sản phẩm mới mà không cần code lại, có thể làm 1 trang `/admin` đơn giản (bảo vệ bằng mật khẩu hoặc Supabase Auth chỉ cho 1 tài khoản admin) để thêm/sửa sản phẩm trực tiếp vào Supabase — nhưng đây là hạng mục KHÔNG ưu tiên trong giai đoạn đầu, có thể dùng thẳng Supabase Table Editor để nhập sản phẩm thủ công.

---

## 6. QUY TẮC CODE (CHO AGENT/DEV)

1. **Không hardcode màu/font** — luôn dùng CSS variables/Tailwind config, và chỉ chốt sau khi đã chạy quy trình brainstorm ở mục 2.7.
2. **Mobile-first**: viết CSS/Tailwind theo breakpoint mobile trước.
3. **Component tái sử dụng**: Button, Card, Badge phải dùng chung, style nhất quán.
4. **Đặt tên file/component**: PascalCase cho component, kebab-case cho route/slug.
5. **Accessibility**: mọi ảnh có `alt`, contrast đạt WCAG AA, có visible focus state cho keyboard navigation, tôn trọng `prefers-reduced-motion`.
6. **Performance**: Lighthouse ≥ 90 cho Performance & SEO dù trang có nhiều ảnh/animation — nén ảnh kỹ, lazy-load ngoài viewport đầu.
7. **SEO**: mỗi trang sản phẩm/bộ sưu tập có meta title/description riêng, Open Graph image đẹp (quan trọng vì hay được chia sẻ trên social).
8. **Ngôn ngữ giao diện**: tiếng Việt có dấu đầy đủ, kiểm tra font hiển thị đúng trên mọi trình duyệt.
9. **Không copy trực tiếp** hình ảnh/bố cục độc quyền của các thương hiệu tham chiếu — chỉ học nguyên tắc.
10. **Supabase**: bật Row Level Security, chỉ cho phép đọc (SELECT) công khai bảng sản phẩm; mọi thao tác ghi (nếu có trang admin sau này) phải qua service role key ở backend/Server Action, không lộ ra client.
11. **Trước khi code giao diện mới**: chạy quy trình brainstorm → tự phản biện ở mục 2.7, không code thẳng theo cảm tính.

---

## 7. GIỌNG VĂN NỘI DUNG

- Ngắn gọn, tự tin, gần gũi nhưng không mất chất "cao cấp".
- CTA chính xác việc sẽ xảy ra: "Mua ngay tại Shopee" (không mơ hồ kiểu "Khám phá thêm" khi thực chất là dẫn ra kênh bán).
- Copy cho phần "Về chúng tôi" nên kể câu chuyện thật, tránh sáo rỗng kiểu "đẳng cấp thượng lưu", "sang trọng bậc nhất".

---

## 8. CHECKLIST TRƯỚC KHI RA MẮT

- [ ] Bảng token thiết kế đã qua bước tự phản biện (không rơi vào 3 khuôn mẫu AI phổ biến)
- [ ] Toàn bộ ảnh sản phẩm chất lượng cao, đồng bộ tỷ lệ khung
- [ ] Test responsive 375px / 768px / 1280px / 1440px
- [ ] Mọi nút "Mua ngay tại [Kênh]" trỏ đúng link kênh bán tương ứng, mở tab mới
- [ ] Tốc độ tải trang chủ < 3s dù nhiều ảnh/animation
- [ ] `prefers-reduced-motion` được tôn trọng cho người dùng nhạy cảm với chuyển động
- [ ] Kiểm tra chính tả/dấu tiếng Việt toàn site
- [ ] Open Graph image đẹp cho từng trang sản phẩm (để chia sẻ social đẹp)

---

**Ghi chú**: Tài liệu này nên được cập nhật liên tục khi có quyết định thiết kế mới, để mọi agent/dev tham gia sau đều đồng bộ.