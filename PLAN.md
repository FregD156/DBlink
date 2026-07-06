# PLAN.md — Kế hoạch xây dựng website Shop Balo Nữ

## 1. Tổng quan dự án

| Hạng mục | Chi tiết |
|---|---|
| Sản phẩm | Balo nữ, phân khúc 500.000đ – 1.500.000đ |
| Phong cách | Trẻ trung nhưng cao cấp (tham khảo Charles & Keith, Kate Spade, Longchamp) |
| Nền tảng | Next.js (client) + Node/Express hoặc headless CMS (server) |
| Hosting | Vercel (frontend), Render/Railway (backend nếu có) |
| Thời gian dự kiến toàn bộ | 7–10 tuần (tuỳ quy mô đội ngũ) |
| Tài liệu liên quan | `AGENTS.md` (quy tắc thiết kế/code), `TODO.md` (checklist chi tiết) |

**Mục tiêu kinh doanh**: có website bán hàng chuyển đổi tốt, xây dựng nhận diện thương hiệu riêng, giảm phụ thuộc vào sàn TMĐT (Shopee/Lazada).

**Chỉ số thành công (KPI) sau ra mắt**:
- Tỷ lệ chuyển đổi (conversion rate) mục tiêu: 1.5–3% trong 3 tháng đầu.
- Thời gian tải trang chủ < 3 giây (4G trung bình VN).
- Tỷ lệ thoát trang (bounce rate) < 55%.
- Điểm Lighthouse Performance/SEO ≥ 90.

---

## 2. Timeline tổng thể

| Tuần | Giai đoạn | Trọng tâm |
|---|---|---|
| 1 | Phase 0 | Chuẩn bị nội dung, tài khoản, nhận diện |
| 2–3 | Phase 1 | Dựng khung kỹ thuật (client + server + kết nối) |
| 3–5 | Phase 2 | Giao diện các trang chính |
| 5–6 | Phase 3 | Giỏ hàng, thanh toán |
| 4–6 | Phase 4 | Nội dung, SEO (chạy song song 2–3) |
| 7 | Phase 5 | Kiểm thử toàn diện, ra mắt |
| 8+ | Phase 6 | Hậu ra mắt, tối ưu liên tục |

> Nếu chỉ có 1 người vừa code vừa làm nội dung, nhân thời gian mỗi giai đoạn lên khoảng 1.5–2 lần.

---

## 3. Chi tiết từng giai đoạn

### Phase 0 — Chuẩn bị (Tuần 1)
**Mục tiêu**: có đủ "nguyên liệu" trước khi code, tránh vừa code vừa chờ nội dung.

Công việc:
- [ ] Chốt logo, bảng màu chính thức, bộ font (đối chiếu `AGENTS.md` mục 2).
- [ ] Chụp/chỉnh ảnh sản phẩm đồng bộ: tỷ lệ 4:5, nền be nhạt (#F8F6F2), tối thiểu 3 ảnh/sản phẩm (studio, lifestyle, cận cảnh chất liệu).
- [ ] Viết mô tả cho toàn bộ sản phẩm ban đầu (tên, giá, chất liệu, kích thước, hướng dẫn bảo quản).
- [ ] Viết nội dung trang "Câu chuyện thương hiệu" (About).
- [ ] Viết chính sách đổi trả, vận chuyển, bảo hành.
- [ ] Đăng ký domain, tài khoản Vercel, tài khoản CMS (Sanity/Strapi) hoặc Shopify/Haravan nếu chọn hướng đơn giản.
- [ ] Đăng ký tài khoản cổng thanh toán (VNPay/MoMo) — quá trình duyệt hồ sơ doanh nghiệp có thể mất vài ngày, nên làm sớm.

**Deliverable**: bộ ảnh + nội dung đầy đủ, tài khoản hạ tầng sẵn sàng.
**Rủi ro thường gặp**: chờ duyệt hồ sơ cổng thanh toán lâu → nên nộp hồ sơ ngay đầu tuần 1.

---

### Phase 1 — Dựng khung kỹ thuật (Tuần 2–3)
**Mục tiêu**: có bộ khung chạy được (chưa cần đẹp), sẵn sàng để lắp giao diện.

Công việc:
- [ ] Khởi tạo `client/` bằng Next.js + TypeScript + Tailwind.
- [ ] Cấu hình `tailwind.config.ts` theo đúng bảng màu/font trong `AGENTS.md`.
- [ ] Tạo project Supabase, chạy `docs/schema.sql` để khởi tạo bảng `products`, `orders`, `order_items`, `profiles` + bật RLS.
- [ ] Tạo bucket `product-images` trong Supabase Storage, upload thử ảnh mẫu.
- [ ] Khởi tạo `server/` (Express + `@supabase/supabase-js` dùng service role key) **hoặc** bỏ qua và gọi Supabase thẳng từ Next.js nếu không cần logic backend phức tạp.
- [ ] Viết `client/src/lib/api.ts` (hoặc `lib/supabase.ts`) để gọi dữ liệu sản phẩm (tạm thời dùng `mock-products.json` nếu Supabase chưa có dữ liệu thật).
- [ ] Cấu hình `vercel.json`, deploy bản "Hello World" lên Vercel để test pipeline CI/CD sớm.
- [ ] Thiết lập biến môi trường (`.env.local`, `.env`) cho cả client/server.

**Deliverable**: trang trắng chạy được trên domain thật (chưa có giao diện đầy đủ), API trả về danh sách sản phẩm mẫu.
**Tiêu chí hoàn thành**: truy cập được domain, gọi API lấy được ít nhất 1 sản phẩm mẫu ra màn hình.

---

### Phase 2 — Xây dựng giao diện (Tuần 3–5)
**Mục tiêu**: dựng đầy đủ giao diện các trang theo design system.

Công việc:
- [ ] Component gốc dùng chung: `Button`, `Input`, `Badge`, `Card` (`components/ui`).
- [ ] Layout chung: `Header` (sticky, menu, search, cart icon), `Footer`, `MobileNav`.
- [ ] Trang chủ: Hero banner, danh mục nổi bật, sản phẩm bán chạy, đánh giá khách hàng, newsletter.
- [ ] Trang danh mục (`/collections/[slug]`): bộ lọc (giá/màu/size), sắp xếp, grid sản phẩm.
- [ ] Trang chi tiết sản phẩm (`/products/[slug]`): gallery ảnh, chọn màu/size, tabs mô tả/chất liệu/vận chuyển, sản phẩm liên quan.
- [ ] Test responsive ở 4 mốc: 375px (mobile), 768px (tablet), 1280px, 1440px (desktop).

**Deliverable**: toàn bộ trang hiển thị đúng nội dung thật (không còn placeholder), đúng màu/font/spacing theo AGENTS.md.
**Tiêu chí hoàn thành**: click được từ trang chủ → danh mục → chi tiết sản phẩm mượt mà trên cả mobile và desktop.

---

### Phase 3 — Giỏ hàng & Thanh toán (Tuần 5–6)
**Mục tiêu**: khách có thể mua hàng thật từ đầu đến cuối.

Công việc:
- [ ] Logic giỏ hàng (`useCart.ts`): thêm/xoá/sửa số lượng, lưu localStorage.
- [ ] Trang `/cart`: hiển thị danh sách sản phẩm, tổng tiền, mã giảm giá (nếu có).
- [ ] Trang `/checkout`: form thông tin giao hàng → chọn phương thức thanh toán (COD bắt buộc + VNPay/MoMo) → xác nhận đơn.
- [ ] `server/src/services/payment.service.js`: tích hợp API cổng thanh toán, xử lý webhook xác nhận giao dịch.
- [ ] `server/src/services/email.service.js`: gửi email/SMS xác nhận đơn hàng.

**Deliverable**: đặt được 1 đơn hàng thử nghiệm thành công từ giỏ hàng đến xác nhận.
**Tiêu chí hoàn thành**: đơn hàng test COD và đơn hàng test qua cổng thanh toán online đều lên đúng trạng thái trong hệ thống quản lý.

---

### Phase 4 — Nội dung & SEO (chạy song song Tuần 4–6)
**Mục tiêu**: website sẵn sàng được tìm thấy trên Google và tạo niềm tin thương hiệu.

Công việc:
- [ ] Trang `/about`: câu chuyện thương hiệu kèm ảnh.
- [ ] Trang `/journal`: 3–5 bài blog phong cách ban đầu (mix & match balo, tips phối đồ...).
- [ ] Meta title/description riêng cho từng trang sản phẩm.
- [ ] Structured data (schema.org Product: giá, tồn kho, đánh giá).
- [ ] `sitemap.xml`, `robots.txt`.
- [ ] Kiểm tra tốc độ tải ảnh (WebP, lazy-load).

**Deliverable**: site được Google index đúng, có ít nhất 5 bài viết SEO ban đầu.

---

### Phase 5 — Kiểm thử & Ra mắt (Tuần 7)
Công việc:
- [ ] Chạy lại toàn bộ checklist trong `AGENTS.md` mục 7.
- [ ] Test đơn hàng đầu-cuối trên môi trường production thật (không phải staging).
- [ ] Test trên thiết bị thật: iOS Safari, Android Chrome, không chỉ DevTools giả lập.
- [ ] Gắn Google Analytics 4 + Meta Pixel để đo hành vi và chuyển đổi.
- [ ] Trỏ domain chính thức, bật HTTPS, kiểm tra chứng chỉ SSL.
- [ ] Thông báo ra mắt trên kênh mạng xã hội hiện có của shop.

**Deliverable**: website chính thức hoạt động ổn định trên domain thật.

---

### Phase 6 — Hậu ra mắt (Tuần 8 trở đi, liên tục)
Công việc:
- [ ] Theo dõi Google Analytics: trang nào thoát nhiều, giỏ hàng bị bỏ ở bước nào.
- [ ] A/B test màu nút CTA, vị trí banner.
- [ ] Thêm tính năng review sản phẩm (tăng độ tin cậy).
- [ ] Thêm chương trình khách hàng thân thiết / mã giảm giá tự động.
- [ ] Cân nhắc live chat (Messenger/Zalo OA) hỗ trợ khách real-time.

---

## 4. Thứ tự ưu tiên nếu cần rút ngắn thời gian

Nếu ngân sách/thời gian hạn chế, làm theo đúng thứ tự sau — không bỏ nhóm 1, có thể lùi nhóm 2–3:

1. **Bắt buộc để bán được hàng**: Trang chủ + danh mục + chi tiết sản phẩm + giỏ hàng + checkout (Phase 1–3).
2. **Tăng độ tin cậy, nên có sớm**: About, chính sách đổi trả rõ ràng, ít nhất 3–5 review thật (Phase 4 rút gọn).
3. **Làm sau, ở bản v2**: Blog Journal đầy đủ, review có ảnh, chương trình loyalty, live chat (Phase 6).

---

## 5. Nguồn lực cần thiết

| Vai trò | Công việc chính | Bắt buộc? |
|---|---|---|
| Frontend dev | Xây `client/` theo design system | Có |
| Backend dev (hoặc dùng CMS có sẵn) | API sản phẩm/đơn hàng, tích hợp thanh toán | Có (hoặc thay bằng Shopify/Haravan) |
| Người chụp ảnh sản phẩm | Ảnh đồng bộ theo chuẩn Phase 0 | Có |
| Người viết nội dung | Mô tả sản phẩm, blog, câu chuyện thương hiệu | Có |
| Người vận hành/CSKH | Xử lý đơn hàng, hỗ trợ khách | Có (khi ra mắt) |

Nếu chỉ có 1 người: ưu tiên dùng Shopify/Haravan để giảm tải phần backend, tập trung nguồn lực vào ảnh sản phẩm + nội dung + giao diện.

---

## 6. Rủi ro cần lưu ý

| Rủi ro | Cách giảm thiểu |
|---|---|
| Duyệt hồ sơ cổng thanh toán chậm | Nộp hồ sơ VNPay/MoMo ngay từ Phase 0 |
| Ảnh sản phẩm không đồng bộ (do nhiều đợt chụp khác nhau) | Lập chuẩn ảnh cố định (mục 2.4 AGENTS.md) và áp dụng cho mọi đợt chụp sau này |
| Chậm nội dung khiến dev phải chờ | Viết nội dung sản phẩm song song ngay từ Phase 0, không để dồn đến Phase 2 |
| Website chậm do ảnh nặng | Bắt buộc dùng `next/image` + WebP ngay từ đầu, không tối ưu sau |
| Thiếu hỗ trợ COD | COD là bắt buộc với thị trường VN — không được bỏ qua dù ưu tiên thanh toán online |
| Cấu hình sai Row Level Security (RLS) trên Supabase | Luôn bật RLS ngay từ đầu, test bằng anon key xem có bị lộ/sửa được dữ liệu không nên sửa trước khi ra mắt |
| Lộ `SUPABASE_SERVICE_ROLE_KEY` ra frontend | Chỉ dùng service role key trong `server/.env`, không bao giờ đặt trong biến `NEXT_PUBLIC_*` |