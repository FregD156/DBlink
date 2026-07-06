# AGENTS.md — Website Shop Balo Nữ

Tài liệu này định hướng cho bất kỳ AI coding agent (Claude Code, Cursor, v.v.) hoặc lập trình viên nào tham gia xây dựng website. Mọi quyết định thiết kế/code phải bám sát tài liệu này.

---

## 1. TỔNG QUAN DỰ ÁN

- **Loại hình**: Website thương mại điện tử (e-commerce) bán balo nữ.
- **Phân khúc giá**: 500.000đ – 1.500.000đ (tầm trung-cao, không phải bình dân, không phải xa xỉ thực sự).
- **Định vị phong cách**: "Trẻ trung nhưng cao cấp" — tức là KHÔNG dùng ngôn ngữ thiết kế xa xỉ cổ điển kiểu Dior/Chanel (quá nghiêm trang, cứng), mà dùng tinh thần tối giản sang trọng của các brand như **Charles & Keith, Kate Spade, Longchamp, MLB, Marc Jacobs** — sạch sẽ, hiện đại, có cá tính nhưng vẫn đáng tin cậy về chất lượng.
- **Khách hàng mục tiêu**: Nữ 16–30 tuổi, học sinh/sinh viên/dân văn phòng trẻ, quan tâm thời trang, mua hàng chủ yếu qua điện thoại.
- **Mục tiêu kinh doanh**: Tăng tỷ lệ chuyển đổi (conversion rate), xây dựng nhận diện thương hiệu riêng biệt so với các shop bán balo trôi nổi trên Shopee/Lazada.

---

## 2. DESIGN SYSTEM (BẮT BUỘC TUÂN THỦ)

### 2.1. Bảng màu

```
--color-bg-primary: #FAF8F5;      /* nền chính - trắng ngà ấm */
--color-bg-secondary: #F1ECE4;    /* nền phụ, section xen kẽ */
--color-text-primary: #241F1C;    /* chữ chính - đen nâu */
--color-text-secondary: #6B625B;  /* chữ phụ, mô tả */
--color-accent: #C97B63;          /* màu nhấn - cam đất/terracotta, trẻ trung */
--color-accent-alt: #8B7355;      /* màu nhấn phụ - be nâu (nếu cần 2 tông sản phẩm) */
--color-success: #6B8F71;         /* thông báo thành công */
--color-error: #B54A4A;           /* lỗi/cảnh báo */
--color-white: #FFFFFF;
--color-border: #E3DDD3;
```

Quy tắc: mỗi màn hình chỉ dùng **1 màu accent chính** cho CTA. Không phối quá 3 màu ngoài đen/trắng/be trong cùng 1 khung nhìn.

### 2.2. Typography

```
--font-heading: 'Playfair Display', 'Cormorant Garamond', serif; /* tiêu đề, tên sản phẩm lớn */
--font-body: 'Inter', 'Be Vietnam Pro', sans-serif;              /* nội dung, nút, form */
```

- Font-body BẮT BUỘC hỗ trợ đầy đủ dấu tiếng Việt — kiểm tra kỹ (Be Vietnam Pro là lựa chọn an toàn nhất).
- Kích thước:
  - H1: 36–48px / weight 600
  - H2: 28–32px / weight 600
  - H3: 20–24px / weight 500
  - Body: 15–16px / weight 400
  - Caption/label: 12–13px / weight 500, letter-spacing 0.05em, uppercase (dùng cho tag "MỚI", "BÁN CHẠY")
- Line-height: 1.5 cho body, 1.2 cho heading.

### 2.3. Spacing & Layout

- Hệ thống spacing theo bội số của **8px**: 8, 16, 24, 32, 48, 64, 96px.
- Container tối đa: 1280px, padding ngang 24px (mobile: 16px).
- Border-radius đồng nhất: **8px** cho button/input, **12px** cho card/ảnh sản phẩm. Không trộn lẫn nhiều mức bo góc.
- Khoảng cách giữa các section trang chủ: tối thiểu 64px (desktop), 40px (mobile).

### 2.4. Ảnh sản phẩm

- Tỷ lệ khung ảnh đồng nhất toàn site: **4:5** (dọc, chuẩn thời trang) hoặc **1:1** — chọn 1 và giữ nguyên cho mọi sản phẩm.
- Nền ảnh sản phẩm: trắng hoặc be nhạt (#F8F6F2), không lẫn nền sặc sỡ.
- Mỗi sản phẩm tối thiểu: 1 ảnh nền trơn (studio) + 1 ảnh lifestyle (người mẫu đeo) + 1 ảnh cận cảnh chất liệu.
- Hover trên ảnh sản phẩm: chuyển sang ảnh thứ 2, transition 0.3s ease.

### 2.5. Component chuẩn (áp dụng đồng nhất toàn site)

- **Button chính**: nền `--color-accent`, chữ trắng, bo góc 8px, padding 14px 32px, hover tối màu 10%.
- **Button phụ (outline)**: viền 1px `--color-text-primary`, nền trong suốt, hover đổi nền đen chữ trắng.
- **Card sản phẩm**: ảnh (bo góc 12px) → tên sản phẩm (font-body, 15px) → giá (font-body bold, màu accent) → (tuỳ chọn) tag "MỚI"/"-20%" góc trên trái.
- **Animation**: chỉ dùng fade (opacity) và scale nhẹ (1.0 → 1.03–1.05), thời lượng 250–400ms, easing `ease-out`. Cấm hiệu ứng giật, xoay, nảy (bounce).

---

## 3. CẤU TRÚC TRANG & COMPONENT

```
/
├── Trang chủ (Home)
│   ├── Header (sticky, logo giữa/trái, menu, search, cart icon)
│   ├── Hero Banner (full-width, 1 CTA)
│   ├── Danh mục nổi bật (3-4 khối ảnh lớn)
│   ├── Sản phẩm bán chạy (grid 4 cột desktop / 2 cột mobile)
│   ├── Banner khuyến mãi/bộ sưu tập mới
│   ├── Đánh giá khách hàng (carousel)
│   ├── Newsletter signup
│   └── Footer (chính sách, social, liên hệ)
├── /collections/[slug] — Trang danh mục
│   ├── Bộ lọc (giá, màu, size, chất liệu) — sidebar desktop, drawer mobile
│   ├── Sắp xếp (mới nhất, bán chạy, giá tăng/giảm)
│   └── Grid sản phẩm + phân trang/infinite scroll
├── /products/[slug] — Chi tiết sản phẩm
│   ├── Gallery ảnh (trái)
│   ├── Tên, giá, mô tả ngắn, chọn màu/size, nút thêm giỏ hàng (phải)
│   ├── Tabs: Mô tả chi tiết / Chất liệu & bảo quản / Vận chuyển & đổi trả
│   └── Sản phẩm liên quan
├── /cart — Giỏ hàng
├── /checkout — Thanh toán (tối đa 3 bước, hỗ trợ COD)
├── /about — Câu chuyện thương hiệu
├── /journal — Blog phong cách (tăng SEO + kết nối cảm xúc thương hiệu)
└── /contact — Liên hệ/CSKH
```

---

## 4. TECH STACK ĐỀ XUẤT

- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS.
- **Database**: **Supabase** (Postgres) — bảng sản phẩm, đơn hàng, người dùng.
  - Ảnh sản phẩm lưu trong **Supabase Storage** (bucket riêng, vd: `product-images`).
  - Đăng nhập/tài khoản khách hàng (nếu có) dùng **Supabase Auth**.
  - Có thể dùng **Supabase Realtime** để cập nhật tồn kho tức thời nếu cần.
- **Thanh toán**: tích hợp cổng VNPay/MoMo + hỗ trợ COD (bắt buộc với thị trường VN).
- **State quản lý giỏ hàng**: Zustand hoặc React Context, lưu localStorage.
- **Hình ảnh**: dùng `next/image`, format WebP, lazy-load ngoài viewport đầu tiên.
- **Hosting**: Vercel (frontend) + Supabase Cloud (database/storage/auth — không cần tự host server riêng).
- **Kết nối client ↔ Supabase**: dùng thư viện `@supabase/supabase-js` gọi thẳng từ Next.js (Server Components/Route Handlers), có thể **bỏ hẳn thư mục `server/` riêng** nếu không cần logic backend phức tạp ngoài Supabase.
- **Alternative đơn giản hơn**: nếu không cần custom sâu, dùng Shopify/Haravan + theme tuỳ biến theo design system ở trên.

---

## 5. QUY TẮC CODE (CHO AGENT/DEV)

1. **Không hardcode màu/font** — luôn dùng CSS variables/Tailwind config đã định nghĩa ở mục 2.
2. **Mobile-first**: viết CSS/Tailwind theo breakpoint mobile trước (`sm:`, `md:`, `lg:` sau).
3. **Component tái sử dụng**: Button, Card, Badge, Input phải là component dùng chung — không viết lặp lại style trực tiếp trong từng trang.
4. **Đặt tên file/component**: PascalCase cho component (`ProductCard.tsx`), kebab-case cho route/slug.
5. **Accessibility**: mọi ảnh có `alt`, mọi input có `label`, contrast màu chữ/nền đạt tối thiểu WCAG AA.
6. **Performance**: Lighthouse score mục tiêu ≥ 90 cho Performance & SEO. Ảnh nén, tránh layout shift (khai báo width/height ảnh).
7. **SEO**: mỗi trang sản phẩm có meta title/description riêng, dùng structured data (schema.org Product) cho giá/tồn kho.
8. **Ngôn ngữ giao diện**: tiếng Việt có dấu đầy đủ, kiểm tra font hiển thị đúng trên mọi trình duyệt.
9. **Không copy trực tiếp** hình ảnh/bố cục độc quyền của các thương hiệu tham chiếu (Charles & Keith, Kate Spade...) — chỉ học nguyên tắc, không sao chép y nguyên để tránh vi phạm bản quyền.
10. **Supabase — bắt buộc bật Row Level Security (RLS)** trên mọi bảng ngay khi tạo, không tắt RLS "để test cho nhanh" rồi quên bật lại.
11. **`SUPABASE_SERVICE_ROLE_KEY` chỉ dùng ở backend** (`server/.env`), tuyệt đối không đưa vào biến `NEXT_PUBLIC_*` hay commit lên Git.
12. Thao tác ghi/sửa dữ liệu nhạy cảm (cập nhật đơn hàng, tồn kho) nên đi qua backend dùng service role key, không thao tác trực tiếp từ client bằng anon key trừ khi đã có policy RLS kiểm soát chặt chẽ.

---

## 6. GIỌNG VĂN NỘI DUNG (COPYWRITING TONE)

- Ngắn gọn, tự tin, gần gũi — không dùng ngôn ngữ quá hoa mỹ/cổ điển.
- Ví dụ CTA tốt: "Khám phá ngay", "Chọn dáng của bạn", "Thêm vào giỏ".
- Ví dụ slogan phù hợp phân khúc: "Phong cách trẻ, chất riêng bạn" — tránh các câu quá "xa xỉ" kiểu "Đẳng cấp thượng lưu".

---

## 7. CHECKLIST TRƯỚC KHI RA MẮT (LAUNCH CHECKLIST)

- [ ] Toàn bộ ảnh sản phẩm cùng tỷ lệ khung, cùng tông nền
- [ ] Test responsive trên màn hình 375px, 768px, 1280px, 1440px
- [ ] Tốc độ tải trang chủ < 3s (kiểm tra bằng PageSpeed Insights)
- [ ] Flow thanh toán hoạt động đầy đủ (COD + ít nhất 1 cổng online)
- [ ] Chính sách đổi trả/vận chuyển hiển thị rõ ràng
- [ ] Có Google Analytics/Meta Pixel để đo chuyển đổi
- [ ] Kiểm tra chính tả/dấu tiếng Việt toàn bộ nội dung

---

**Ghi chú**: Tài liệu này nên được cập nhật liên tục khi có quyết định thiết kế mới, để mọi agent/dev tham gia sau đều đồng bộ.